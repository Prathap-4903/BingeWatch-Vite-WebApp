import LogoMonkey from "../../assets/icons/monkey-icon-b.png";
import LogoText from "../../assets/icons/BingeWatch Text Black.png";
import NavBar from "@/components/NavBar/NavBar";
import Profile from "./Profile";
import Headlines from "./Headlines";
import History from "./History";
import Buttons from "./Buttons";

const Home = () => {
    return (
        <>
          <div className="main-screen w-full h-screen bg-[#fff]">
            <div className="flex-layout flex flex-col h-screen w-full gap-2 p-2">
                <div className="row1 flex gap-2">
                    <div className="col1-logo border-solid border-2 border-red-500 rounded-xl flex h-[50px] w-[240px] items-center justify-center cursor-pointer ">
                        <img src={LogoMonkey} alt="Logo" width="40" height="40" className="mr-0"/>
                        <img src={LogoText} width="180" height="34.32" className="ml-0 mt-1"/>
                    </div>
                    <div className="col2-nav border-solid border-2 rounded-xl border-orange-500 flex items-center justify-end flex-auto ">
                        <NavBar />
                    </div>
                    <div className="col3-profile border-solid border-2 border-yellow-500 flex items-center justify-center rounded-xl h-[71.11px] w-[240px] ">
                        <Profile />
                    </div>
                </div>
                <div className="row2 flex flex-1 gap-2">
                    <div className="leftPart w-[240px] h-[308.44px] border-solid border-2 border-emerald-500 rounded-xl "></div>
                        <div className="headlines border-solid border-2 rounded-xl border-green-500 flex items-center justify-center flex-1 ">
                            <Headlines />
                        </div>
                        <div className="history border-solid border-2 rounded-xl border-blue-500 flex w-[240px] h-[308.44px] justify-center items-baseline ">
                            <History />
                        </div>
                    </div>
                <div className="row3 flex flex-1 gap-2">
                    <div className="leftPart w-[240px] border-solid border-2 border-slate-500 rounded-xl "></div>
                    <div className="Buttons border-solid border-2 rounded-xl border-purple-500 flex items-baseline justify-center flex-1 ">
                        <Buttons />
                    </div>
                    <div className="rightPart w-[240px] border-solid border-2 border-gray-500 rounded-xl "></div>
                </div>
            </div>
          </div>
        </>
    )
}

export default Home