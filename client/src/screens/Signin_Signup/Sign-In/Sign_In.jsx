import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login_Styles.css";
import LogoMonkey from "@/assets/icons/monkey-icon-b.png";
import LogoText from "@/assets/icons/BingeWatch Text Black.png";
import LogImage from "@/assets/illustration/SignIn_Illustration.jpg";
import Input from "@/components/UI_Elements/Input_Field";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import GoogleLogo from "@/assets/icons/logo-google.svg";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const Sign_In = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [visible, setVisible] = useState(false);

  function moveSignup() {
    navigate('/sign-up');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // axios.baseUrl("http://localhost:5173")
    //axios.withCredentials = true;
    try {
      const response = await axios.post("http://localhost:5000/auth/sign-in", { email, password }, { withCredentials: true });
      if(response.data.status){
        //console.log(response.data.status);
        navigate("/home");
        toast({
          title: "Sign_In Done!",
          description: "Enjoy! Watching Movies With Homies!"
        })
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        // title: "Uh oh! Something went wrong.",
        title: `Uh oh! ${err.response.data.message}`,
        description: "There was a problem with your login.",
      })
    }
  };

  return (
    <>
      <div className="logo_container flex cursor-pointer m-2">
        <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mt-1 ml-2" />
        <img src={LogoText} width="180" height="34.32" className="mt-2" />
      </div>

      <form action="" onSubmit={handleSubmit} method="post">
        <div className="login_screen flex justify-center items-center h-screen w-full bg-white">
          <Card className="border-none shadow-none mb-28 md:mb-20 md:border-solid md:shadow-lg md:w-[980px] md:h-[520px] md:flex justify-center items-center  ">
          <div className="login_container bg-white border-r-[5px] border-b-[5px] pt-4 px-4 pb-4 border-black rounded-3xl border-[2.5px] space-y-2 mx-10 min-w-[310px] max-w-[470px] md:min-w-[340px] md:w-[500px]">
            <h1 className="font-geist-bold text-2xl">Sign In</h1>
            <p className="font-geist-medium font-[375] ">
              Grab Your Popcorn and Join The Party!
            </p>
            <div className="input_body flex flex-wrap space-y-3 justify-center items-center w-full">
              <div className="flex flex-wrap space-y-3 w-full">
                <div className="input_container space-y-3 w-full">
                  <Input IdName={"email"} InputLabel={"Enter Email : "} InputType={"email"} InputName={" Email"} changeEvent={(e)=> setEmail(e.target.value)} />
                  <div className="w-full space-y-1">
                    <label htmlFor="password" className="font-geist-semi">
                      Enter Password :
                    </label>
                    <div className="relative w-full">
                      <input type={visible ? "text" : "password" } id="password" className="block w-full font-geist-medium px-2.5 pb-2.5 pt-4 text-[17px] md:text-[20px] text-black bg-transparent rounded-lg border-2 focus:border-r-4 focus:border-b-4 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" required onChange={(e)=> setPassword(e.target.value)}/>
                      <label htmlFor="password" className="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                      <div className="absolute inset-y-0 right-5 flex items-center pl-3 cursor-pointer z-50">
                        <div onClick={() => setVisible(!visible)} className="flex items-end justify-end justify-items-end cursor-pointer">
                          {visible ? <Eye size={27}/> : <EyeClosed size={27}/>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button_container flex flex-col flex-wrap space-y-3 justify-center w-full">
                  <button onClick={moveSignup} className="font-geist-medium font-thin underline text-[12px] md:text-[14px] bg-transparent hover:scale-[1.025] ease-in-out">Don't have an account? Click Here to Sign Up!</button>
                  <button type="submit" className="font-geist-bold text-white bg-black border-2 border-black py-1 rounded-xl hover:bg-white hover:text-black hover:scale-100 hover:border-r-4 hover:border-b-4 transition-all ease-in-out duration-100">Sign In</button>
                  <button className="flex justify-center gap-2 font-geist-semi border-2 font-medium border-black py-1 rounded-xl bg-transparent hover:border-r-4 hover:border-b-4 transition-all ease-in-out duration-100">
                    <img src={GoogleLogo} alt="" className="h-5 w-5 mt-[1.7px] cursor-pointer" />
                    <span>Sign In With Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img src={LogImage} alt="" className="hidden md:block w-[500px] h-[375px] rounded-xl " />
          </Card>
        </div>
      </form>
    </>
  );
};

export default Sign_In;
