import React, { useState } from "react";
import "./Login_Styles.css";
import Eye from "../../../assets/icons/eye.png";
import EyeClosed from "../../../assets/icons/eye-closed.png";
import LogoMonkey from "../../../assets/icons/monkey-icon-b.png";
import LogoText from "../../../assets/icons/BingeWatch Text Black.png";
import GoogleLogo from "../../../assets/icons/logo-google.svg";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/UI_Elements/Input_Field";
import axios from "axios";

const Sign_In = () => {
  const navigate = useNavigate();

  function gotosignup() {
    navigate("/sign-up");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(Eye);

  const handleEye = () => {
    eye == Eye ? setEye(EyeClosed) : setEye(Eye);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // axios.baseUrl("http://localhost:5173")
    // axios.withCredentials = true
    try {
      const response = await axios
        .post("http://localhost:5000/auth/sign-in", { email, password })
        .then((response) => {
          navigate("/home");
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="logo-container flex cursor-pointer">
        <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mt-2 ml-2" />
        <img src={LogoText} width="180" height="34.32" className="mt-3" />
      </div>

      <form action="" onSubmit={handleSubmit} method="post">
        <div className="login-screen flex justify-center items-center h-screen">
          <div className="login-container bg-transparent border-r-[5px] border-b-[5px] pt-4 px-4 pb-4 border-black rounded-3xl border-[2.5px] space-y-2 mx-10 min-w-[340px] w-[500px]">
            <h1 className="font-geist-bold text-2xl">Login</h1>
            <p className="font-geist-medium font-[375] ">
              Grab Your Popcorn and Join The Party!
            </p>
            <div className="input-body flex flex-wrap space-y-3 justify-center items-center w-full">
              <div className="flex flex-wrap space-y-3 w-full">
                <div className="input-container space-y-3 w-full">
                  <Input IdName={"email"} InputLabel={"Enter Email : "} InputType={"email"} InputName={" Email"} changeEvent={(e)=> setEmail(e.target.value)}/>
                  <div className="w-full space-y-1">
                    <label htmlFor="password" className="font-geist-semi">
                      Enter Password :
                    </label>
                    <div className="relative w-full">
                      <input type="password" id="password" className="block w-full font-geist-medium px-2.5 pb-2.5 pt-4 text-[20px] text-black bg-transparent rounded-lg border-2 focus:border-r-4 focus:border-b-4 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" required onChange={(e)=> setPassword(e.target.value)}/>
                      <label htmlFor="password" className="absolute font-geist-semi text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                      <div className="absolute inset-y-0 right-5 flex items-center pl-3 cursor-pointer z-50">
                        <div className="flex items-end justify-end justify-items-end cursor-pointer">
                          <img onClick={handleEye} src={eye} alt="" className="h-[32px] w-[32px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button-container flex flex-col flex-wrap space-y-3 justify-center w-full">
                  <button onClick={gotosignup} className="font-geist-medium font-thin underline text-[14px] bg-transparent hover:scale-[1.025] ease-in-out">Don't have an account? Click Here to Sign Up!</button>
                  <button type="submit" className="font-geist-bold text-white bg-black border-2 border-black py-1 rounded-xl hover:bg-white hover:text-black hover:scale-100 hover:border-r-4 hover:border-b-4 transition-all ease-in-out duration-100">Sign In</button>
                  <button className="flex justify-center gap-2 font-geist-semi border-2 font-medium border-black py-1 rounded-xl bg-transparent hover:border-r-4 hover:border-b-4 transition-all ease-in-out duration-100">
                    <img src={GoogleLogo} alt="" className="h-5 w-5 mt-[1.7px] cursor-pointer" />
                    <span>Sign In With Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Sign_In;
