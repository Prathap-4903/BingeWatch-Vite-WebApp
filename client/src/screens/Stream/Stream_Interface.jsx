import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import socket from "@/components/functions/socket";
import { DotsThreeOutline, Heart } from '@phosphor-icons/react';
import { Mic, MicOff, Camera, CameraOff, Cast, BarChart2, Upload, User } from '@geist-ui/icons';
import { BellDot } from 'lucide-react';
import Friends_List from "@/components/Stream_Elements/Friends_List";
import Request_Alert from "@/components/UI_Elements/Request_Alert";
import Reaction_Tab from "@/components/Stream_Elements/Reaction_Tab";
import Chat_Box from "@/components/Stream_Elements/Chat_Box";
import Chat_Box_Mob from "@/components/Stream_Elements/Chat_Box_Mob";
import useUserStore from "@/store/UserStore";
import useHostStore from "@/store/HostStore";
import { toast } from '@/hooks/use-toast';

const Stream_Interface = () => { 
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [userPicture, setUserPicture] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [joinAlert, setJoinAlert] = useState(false);
  const [joinRequests, setJoinRequests] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const { username } = useUserStore();
  const { hostname, setHostname } = useHostStore();
  const { roomId } = useParams();
  const [isConnected, setIsConnected] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)
  const [isWebcamOn, setIsWebcamOn] = useState(false)
  const [isScreenShareOn, setIsScreenShareOn] = useState(false)
  const [remoteStreams, setRemoteStreams] = useState({})
  const [bellShow, setBellShow] = useState(false)
  const [bellClick, setBellClick] = useState(false)

  const localVideoRef = useRef(null)
  const deviceRef = useRef(null)
  const producerTransportRef = useRef(null)
  const consumerTransportRef = useRef(null)
  const producersRef = useRef({})
  const consumersRef = useRef({})
  const localStreamRef = useRef(null)
  const screenStreamRef = useRef(null)
  const remoteVideoRefs = useRef({})

  // UseEffects
  useEffect(() => {
    socket.emit('get-host-name', roomId);
    socket.on('host-name', (host) => setHostname(host));

    // Listen for updated users in the room
    socket.on("users-in-room", (users) => {
      console.log('Users in Room:', users);
      setUsersInRoom(users);
    });

    // Handle incoming join requests
    socket.on("join-request", ({ username, socketId }) => {
      console.log("Join request from", username);
      setJoinAlert(true);
      setJoinRequests((prev) => [...prev, { username, socketId }]);
      console.log("Join Requests -", joinRequests);
    });

    // Lists Pending Friend Requests
    socket.on("pending-friend-request", ({ senderId, senderUsername }) => {
      setFriendRequests((prev) => [...prev, { senderId, senderUsername }]);
      handleFriendProfile(senderUsername);
      console.log("Friend Requests -", friendRequests);
      setBellShow(true);
    });

    return () => {
      socket.off("host-name");
      socket.off("users-in-room");
      socket.off("join-request");
      socket.off("pending-friend-request");
    };
  }, [roomId, hostname, usersInRoom, friendRequests]);

  useEffect(() => {
    socket.on('friend-request-accepted', ({ username, userId }) => {
      toast({
        title: `${username} Accepted Your Friend Request!`,
        description: "You Are a Homie Now..",
      });
    });

    socket.on('friend-request-rejected', ({ username, userId }) => {
      toast({
        title: `${username} Rejected Your Friend Request!`,
        description: "You Are Not His Homie..",
      });
    });

    return () => {
      socket.off('friend-request-accepted');
      socket.off('friend-request-rejected');
    };
  }, [friendRequests]);

  useEffect(() => {
    // Load mediasoup client
    const loadDevice = async () => {
      try {
        const { Device } = await import("mediasoup-client")
        await StartMC(Device)
      } catch (error) {
        console.error("Error loading mediasoup-client:", error)
      }
    }

    loadDevice()

    // Listen for new producers
    socket.on("new-producer", handleNewProducer)

    // Handle page unload events
    const handleBeforeUnload = () => {
      cleanupResources()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      // Clean up
      socket.off("new-producer", handleNewProducer)
      window.removeEventListener("beforeunload", handleBeforeUnload)

      cleanupResources()
    }
  }, [roomId])

  useEffect(() => {
    // Attach streams to video elements
    Object.entries(remoteStreams).forEach(([producerId, { stream }]) => {
      const videoElement = remoteVideoRefs.current[producerId]
      if (videoElement && stream) {
        videoElement.srcObject = stream
      }
    })
  }, [remoteStreams])

  useEffect(() => {
    // Add explicit disconnect event handler to socket.io
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id)
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
  }, [])

  // Functions
  const handleApprove = (socketId, username) => {
    socket.emit("approve-join", { roomId, socketId, username });
    setJoinAlert(false);
    setJoinRequests((prev) => prev.filter((req) => req.socketId !== socketId)); // Remove request
  };

  const handleReject = (socketId) => {
    socket.emit("reject-join", { socketId });
    setJoinAlert(false);
    setJoinRequests((prev) => prev.filter((req) => req.socketId !== socketId)); // Remove request
  };

  const handleFriendProfile = async (username) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/username/${username}`, { withCredentials: true });
      if(response.data.status) {
        const userData = response.data.data;
        setUserPicture(userData.picture);
      }
    } catch(err) {
      console.error("Handle Friend Profile Error -", err);
    }
  }

  const AcceptFriendRequest = (requesterId, currentUserId) => {
    // Accept
    socket.emit('accept-friend-request', {
      senderId: requesterId,
      receiverId: currentUserId
    });
    setFriendRequests((prev) => prev.filter((request) => request.senderId !== requesterId));
    setBellShow(false);
  }

  const RejectFriendRequest = (requesterId, currentUserId) => {
    // Reject
    socket.emit('reject-friend-request', {
      senderId: requesterId,
      receiverId: currentUserId
    });
    setFriendRequests((prev) => prev.filter((request) => request.senderId !== requesterId));
    setBellShow(false);
  }

  const StartMC = async (Device) => {
    try {
      // Join the room and get router RTP capabilities
      socket.emit("start-mc", roomId, async ({ rtpCapabilities }) => {
        try {
          console.log("Received RTP capabilities:", rtpCapabilities)

          // Create device
          const device = new Device()
          await device.load({ routerRtpCapabilities: rtpCapabilities })
          deviceRef.current = device

          // Create send transport
          await createSendTransport()

          // Create receive transport
          await createReceiveTransport()

          setIsConnected(true)
        } catch (error) {
          console.error("Error setting up device:", error)
        }
      })
    } catch (error) {
      console.error("Error joining room:", error)
    }
  }

  const createSendTransport = () => {
    return new Promise((resolve, reject) => {
      socket.emit("createWebRtcTransport", { roomId, sender: true }, ({ params }) => {
        if (params.error) {
          console.error("Send transport error:", params.error)
          reject(params.error)
          return
        }

        try {
          const transport = deviceRef.current.createSendTransport(params)

          transport.on("connect", ({ dtlsParameters }, callback, errback) => {
            socket.emit("transport-connect", { roomId, dtlsParameters })
            callback()
          })

          transport.on("produce", ({ kind, rtpParameters, appData }, callback, errback) => {
            socket.emit("transport-produce", { roomId, kind, rtpParameters, type: appData.type }, ({ id, params }) => {
              if (params && params.error) {
                errback(params.error)
                return
              }
              callback({ id })
            })
          })

          transport.on("connectionstatechange", (state) => {
            console.log("Send transport connection state:", state)
            if (state === "failed" || state === "closed") {
              transport.close()
            }
          })

          producerTransportRef.current = transport
          resolve()
        } catch (error) {
          console.error("Error creating send transport:", error)
          reject(error)
        }
      })
    })
  }

  const createReceiveTransport = () => {
    return new Promise((resolve, reject) => {
      socket.emit("createWebRtcTransport", { roomId, sender: false }, ({ params }) => {
        if (params.error) {
          console.error("Receive transport error:", params.error)
          reject(params.error)
          return
        }

        try {
          const transport = deviceRef.current.createRecvTransport(params)

          transport.on("connect", ({ dtlsParameters }, callback, errback) => {
            socket.emit("transport-recv-connect", { roomId, dtlsParameters })
            callback()
          })

          transport.on("connectionstatechange", (state) => {
            console.log("Receive transport connection state:", state)
            if (state === "failed" || state === "closed") {
              transport.close()
            }
          })

          consumerTransportRef.current = transport

          // Consume existing producers in the room
          consumeAll()

          resolve()
        } catch (error) {
          console.error("Error creating receive transport:", error)
          reject(error)
        }
      })
    })
  }

  const handleNewProducer = async ({ producerId, producerPeerId, kind, type }) => {
    console.log(`New producer: ${type} from peer ${producerPeerId}`)
    await consumeAll()
  }

  const consumeAll = async () => {
    if (!deviceRef.current || !deviceRef.current.rtpCapabilities || !consumerTransportRef.current) {
      console.warn("Device or consumer transport not ready")
      return
    }

    const { rtpCapabilities } = deviceRef.current

    socket.emit("consume", { roomId, rtpCapabilities }, async ({ consumers, params }) => {
      if (params && params.error) {
        console.error("Consume error:", params.error)
        return
      }

      if (!consumers || consumers.length === 0) {
        console.log("No consumers available")
        return
      }

      try {
        // Process each consumer
        for (const consumerData of consumers) {
          const { id, producerId, kind, rtpParameters, type } = consumerData

          // Skip if we already have this consumer
          if (consumersRef.current[id]) continue

          // Create the consumer
          const consumer = await consumerTransportRef.current.consume({ id, producerId, kind, rtpParameters })

          consumersRef.current[id] = consumer

          // Create a new stream for this consumer if it doesn't exist
          if (!remoteStreams[producerId]) {
            const stream = new MediaStream()
            stream.addTrack(consumer.track)

            setRemoteStreams((prev) => ({
              ...prev,
              [producerId]: {
                stream,
                kind,
                type,
              },
            }))
          } else {
            // Add track to existing stream
            const stream = remoteStreams[producerId].stream
            stream.addTrack(consumer.track)
          }
        }

        // Resume all consumers
        socket.emit("consumer-resume", { roomId })
      } catch (error) {
        console.error("Error consuming:", error)
      }
    })
  }

  const toggleMic = async () => {
    try {
      if (isMicOn) {
        // Turn off microphone
        if (producersRef.current.mic) {
          producersRef.current.mic.close()
          delete producersRef.current.mic
        }

        if (localStreamRef.current) {
          const audioTracks = localStreamRef.current.getAudioTracks()
          audioTracks.forEach((track) => track.stop())
        }

        setIsMicOn(false)
      } else {
        // Turn on microphone
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        })

        if (!localStreamRef.current) {
          localStreamRef.current = stream
        } else {
          // Add audio track to existing stream
          const audioTrack = stream.getAudioTracks()[0]
          localStreamRef.current.addTrack(audioTrack)
        }

        const track = stream.getAudioTracks()[0]

        const producer = await producerTransportRef.current.produce({
          track,
          appData: { type: "mic" },
        })

        producersRef.current.mic = producer

        producer.on("transportclose", () => {
          console.log("Mic producer transport closed")
          setIsMicOn(false)
        })

        producer.on("trackended", () => {
          console.log("Mic track ended")
          toggleMic()
        })

        setIsMicOn(true)
      }
    } catch (error) {
      console.error("Error toggling microphone:", error)
    }
  }

  const toggleWebcam = async () => {
    try {
      if (isWebcamOn) {
        // Turn off webcam
        if (producersRef.current.webcam) {
          producersRef.current.webcam.close()
          delete producersRef.current.webcam
        }

        if (localStreamRef.current) {
          const videoTracks = localStreamRef.current.getVideoTracks()
          videoTracks.forEach((track) => track.stop())

          // Remove video tracks from the stream
          videoTracks.forEach((track) => {
            localStreamRef.current.removeTrack(track)
          })
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = null
        }

        setIsWebcamOn(false)
      } else {
        // Turn off screen share if it's on
        if (isScreenShareOn) {
          await toggleScreenShare()
        }

        // Turn on webcam
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 },
          },
        })

        if (!localStreamRef.current) {
          localStreamRef.current = stream
        } else {
          // Add video track to existing stream
          const videoTrack = stream.getVideoTracks()[0]
          localStreamRef.current.addTrack(videoTrack)
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }

        const track = stream.getVideoTracks()[0]

        const producer = await producerTransportRef.current.produce({
          track,
          appData: { type: "webcam" },
        })

        producersRef.current.webcam = producer

        producer.on("transportclose", () => {
          console.log("Webcam producer transport closed")
          setIsWebcamOn(false)
        })

        producer.on("trackended", () => {
          console.log("Webcam track ended")
          toggleWebcam()
        })

        setIsWebcamOn(true)
      }
    } catch (error) {
      console.error("Error toggling webcam:", error)
    }
  }

  const toggleScreenShare = async () => {
    try {
      if (isScreenShareOn) {
        // Turn off screen share
        if (producersRef.current.screen) {
          producersRef.current.screen.close()
          delete producersRef.current.screen
        }

        if (screenStreamRef.current) {
          screenStreamRef.current.getTracks().forEach((track) => track.stop())
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = isWebcamOn ? localStreamRef.current : null
        }

        setIsScreenShareOn(false)
      } else {
        // Turn off webcam if it's on (for video display, not the actual track)
        if (isWebcamOn) {
          // We don't actually stop the webcam here, just switch the display
        }

        // Turn on screen share
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            cursor: "always",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 60 },
          },
          audio: true,
        })

        screenStreamRef.current = stream

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }

        const track = stream.getVideoTracks()[0]

        // Handle user ending screen share via browser UI
        track.addEventListener("ended", () => {
          toggleScreenShare()
        })

        const producer = await producerTransportRef.current.produce({
          track,
          appData: { type: "screen" },
        })

        producersRef.current.screen = producer

        producer.on("transportclose", () => {
          console.log("Screen producer transport closed")
          setIsScreenShareOn(false)
        })

        producer.on("trackended", () => {
          console.log("Screen track ended")
          toggleScreenShare()
        })

        setIsScreenShareOn(true)
      }
    } catch (error) {
      console.error("Error toggling screen share:", error)
    }
  }

  const cleanupResources = () => {
    console.log("Cleaning up resources...")

    // Stop all local streams
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        track.stop()
        console.log("Stopped local track:", track.kind)
      })
      localStreamRef.current = null
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => {
        track.stop()
        console.log("Stopped screen track:", track.kind)
      })
      screenStreamRef.current = null
    }

    // Close all producers
    Object.entries(producersRef.current).forEach(([key, producer]) => {
      if (producer) {
        producer.close()
        console.log(`Closed producer: ${key}`)
      }
    })
    producersRef.current = {}

    // Close all consumers
    Object.entries(consumersRef.current).forEach(([key, consumer]) => {
      if (consumer) {
        consumer.close()
        console.log(`Closed consumer: ${key}`)
      }
    })
    consumersRef.current = {}

    // Close transports
    if (producerTransportRef.current) {
      producerTransportRef.current.close()
      producerTransportRef.current = null
      console.log("Closed producer transport")
    }

    if (consumerTransportRef.current) {
      consumerTransportRef.current.close()
      consumerTransportRef.current = null
      console.log("Closed consumer transport")
    }

    // Clear video elements
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }

    // Reset state
    setIsMicOn(false)
    setIsWebcamOn(false)
    setIsScreenShareOn(false)
    setRemoteStreams({})

    // Notify server explicitly (though socket.io will also handle disconnects)
    if (roomId) {
      socket.emit("explicit-disconnect", { roomId })
    }
  }

  return (
    <>
    <div className="stream_screen_mob md:hidden w-full h-screen bg-[#1a1a1a] flex flex-col justify-center items-center ">
      <div className="room_info_mob absolute left-4 top-[12px] p-1 ">
        <h1 className='text-neutral-400 font-geist-bold text-[12px]  '>👑 {hostname}</h1>
      </div>
      <div className="stream_video_mob w-[320px] max-w-[650px] h-[172px] mb-2 bg-[#1a1a1a] border-solid border border-[#666] rounded-[10px]  "></div>
      <div className="friends_box w-full flex flex-wrap justify-center items-center ">
        {usersInRoom.map((user, index) => (
          <Friends_List key={index} Username={user} />
        ))}
        <div className='friends_container flex flex-col justify-center items-center w-[70px] h-[75px] my-2 mx-4 lg:my-0 rounded-lg p-1 cursor-pointer'>
          <div className='w-[40px] h-[40px] flex justify-center items-center text-white bg-[#292929] border border-[#666] rounded-full'>
            <User size={18} />
          </div>
          <p className='text-white text-[10px] text-center font-geist-medium mt-1'>Invite</p>
        </div>
      </div>
      
      <Chat_Box_Mob />

      <div className="controls_container w-full absolute bottom-0 ">
        <div className="controls_tab w-full h-[72px] bg-neutral-950 flex justify-center items-center gap-5 ">
          <div className="reactions w-[50px] h-[50px] text-white bg-[#292929] hover:bg-[#1f1f1f] rounded-full border border-solid border-[#666] flex justify-center items-center cursor-pointer ">
            <Heart size={20} />
          </div>
          <div className="camera_btn w-[50px] h-[50px] text-white bg-[#292929] hover:bg-[#1f1f1f] rounded-full border border-solid border-[#666] flex justify-center items-center cursor-pointer ">
            <Camera size={20} />
          </div>
          <div className="mic_btn w-[50px] h-[50px] text-white bg-[#292929] hover:bg-[#1f1f1f] rounded-full border border-solid border-[#666] flex justify-center items-center cursor-pointer ">
            <Mic size={18} />
          </div>
          <div className="cast_btn w-[50px] h-[50px] text-white bg-[#292929] hover:bg-[#1f1f1f] rounded-full border border-solid border-[#666] flex justify-center items-center cursor-pointer ">
            <Cast size={20} />
          </div>
          <div className="features w-[50px] h-[50px] text-white bg-[#292929] hover:bg-[#1f1f1f] rounded-full border border-solid border-[#666] flex justify-center items-center cursor-pointer ">
            <DotsThreeOutline size={24} />
          </div>
        </div>
      </div>
    </div>

    {/* Laptop Screen */}
    <div className='stream_screen hidden w-full h-screen bg-[#1a1a1a] lg:flex justify-center items-center gap-[10px] p-[6px] '>
      <div className='left_part w-[800px] h-[654px] flex flex-col flex-1 justify-center items-center bg-[#1f1f1f] border-solid border-[1px] border-[#666] rounded-[40px] m-[5px] gap-[8px] '>
        <div className='stream_video w-[870px] h-[480px] m-[7px] bg-[#1a1a1a] border-solid border border-[#666] rounded-[34px] '>
          <div className='video_stream_container flex gap-3'>
            <div className='local_stream_container'>
              <video style={{ width: "270px", height: "152px", borderRadius: "34px 0 0 0" }} ref={localVideoRef} autoPlay playsInline muted />
            </div>

            {Object.entries(remoteStreams).map(([producerId, { type }]) => (
            <div key={producerId}>
              <div>
                <video
                  style={{ width: "270px", height: "152px" }}
                  ref={(el) => (remoteVideoRefs.current[producerId] = el)}
                  autoPlay
                  playsInline
                />
              </div>
            </div>
            ))}
          </div>
        </div>
        <div className='bottom-part flex w-[870px] h-[204px] gap-[10px] border-solid border-[1px] border-[#666] rounded-[34px] mb-[7.5px] '>
          <div className='bottom-left flex flex-col gap-[15px] w-[652.39px] h-[204px] justify-start items-center pl-[12px]  '>
            <div className='controls flex w-[489.04] h-[80px] mt-[25px] gap-[125.18px] '>
              <div onClick={toggleWebcam} disabled={!isConnected} className='camera w-[65px] h-[65px] bg-[#292929] hover:bg-[#1f1f1f] rounded-full border-solid border-[1px] border-[#666] flex justify-center items-center text-white cursor-pointer '>
                {isWebcamOn ? <CameraOff size={24} /> : <Camera size={24} />}
              </div>
              <div onClick={toggleMic} disabled={!isConnected} className='mic w-[65px] h-[65px] bg-[#292929] hover:bg-[#1f1f1f] rounded-full border-solid border-[1px] border-[#666] flex justify-center items-center text-white cursor-pointer '>
                {isMicOn ? <MicOff size={24} /> : <Mic size={24} />}
              </div>
              <div onClick={toggleScreenShare} disabled={!isConnected} className='share-screen w-[65px] h-[65px] bg-[#292929] hover:bg-[#1f1f1f] rounded-full border-solid border-[1px] border-[#666] flex justify-center items-center text-white cursor-pointer '>
                <Cast />
              </div>
            </div>
            <Reaction_Tab />
          </div>
          <div className='bottom-right w-[243.17px] h-[204px] flex flex-col gap-[16px] justify-center items-end pr-[12px] rounded-[25px] '>
            <div className='poll w-[159.12px] h-[80px] bg-[#292929] hover:bg-[#1f1f1f] rounded-[20px] border-solid border-[1px] border-[#666] flex justify-center items-center text-white cursor-pointer '>
              <BarChart2 size={28} />
            </div> 
            <div className='file w-[159.12px] h-[80px] bg-[#292929] hover:bg-[#1f1f1f] rounded-[20px] border-solid border-[1px] border-[#666] flex justify-center items-center text-white cursor-pointer '>
              <Upload size={28} />
            </div> 
          </div>
        </div>
      </div>
      <div className='right_part w-[438px] h-[654px] flex flex-col items-center gap-[12px] bg-[#1f1f1f] border-solid border-[1px] border-[#666] rounded-[40px] m-[5px] '>
        <div className='room_info w-full h-[55px] mt-3 rounded-3xl flex justify-center items-center'>
          <h1 className='text-neutral-400 '>👑 {hostname}</h1>
          {bellShow && (
            <BellDot size={17} className="absolute right-12 top-[30px] text-neutral-100 cursor-pointer" onClick={() => setBellClick(!bellClick)} />
          )}
          {bellClick && (
            <div>
              {friendRequests.map((request, index) => (
                <div key={index} className='absolute right-12 top-[50px] bg-neutral-600 text-neutral-100 px-4 py-2 rounded shadow-lg mt-2'>
                  <div className='flex justify-between items-center gap-4'>
                    <img src={userPicture} alt="XO" className="size-8 rounded-full" />
                    <p className='text-[14px] font-geist-semi mr-8'>{request.senderUsername}</p>
                    <button onClick={() => AcceptFriendRequest(request.senderId, currentUser.id)} className='hover:bg-neutral-500 p-1 rounded-[10px]'>✔️</button>
                    <button onClick={() => RejectFriendRequest(request.senderId, currentUser.id)} className='hover:bg-neutral-500 p-1 rounded-[10px]'>❌</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='friends_box flex flex-wrap justify-center items-center w-[403px] h-[580px] gap-4'>
          {usersInRoom.map((user, index) => (
            <Friends_List key={index} Username={user} currentUser={currentUser} />
          ))}
          <div className='friends_container flex flex-col justify-center items-center w-[70px] h-[75px] mx-4 rounded-lg p-1 cursor-pointer'>
            <div className='w-[45px] h-[50px] flex justify-center items-center text-white bg-[#292929] border border-[#666] rounded-full'>
              <User size={24} />
            </div>
            <p className='text-white text-[12px] text-center font-geist-medium mt-1'>Invite</p>
          </div>
        </div>
        <Chat_Box />
      </div>
      {joinAlert && (
        <Request_Alert joinRequests={joinRequests} handleApprove={handleApprove} handleReject={handleReject} />
      )}
    </div>
    </>
  )
}

export default Stream_Interface;

/* "Prathap_4903", "Parker_116", "Qwen_116", "Luffy_Meat_056", "Sanji_69" */