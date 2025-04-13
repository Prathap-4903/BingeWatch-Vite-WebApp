import { Routes, Route } from 'react-router-dom';
import Welcome from './screens/Welcome_Page/Welcome';
import Sign_In from './screens/Signin_Signup/Sign-In/Sign_In';
import Sign_up from './screens/Signin_Signup/Sign-Up/Sign_up';
import Home_Page from './screens/Home_Page/Home_Page';
import Host from './screens/Host_Page/Host';
import Join from './screens/Join_Page/Join';
import Stream_Interface from './screens/Stream/Stream_Interface';
import User_Profile from './screens/Home_Page/User_Profile';
import Contact_Page from './screens/Home_Page/Contact_Page';
import AboutUs_Page from './screens/Home_Page/AboutUs_Page';
import { Toaster } from "./components/ui/toaster";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/sign-in" element={<Sign_In />} />
        <Route path="/sign-up" element={<Sign_up />} />
        <Route path="/home" element={<Home_Page />} />
        <Route path="/host" element={<Host />} />
        <Route path="/join" element={<Join />} />
        <Route path="/stream/:roomId" element={<Stream_Interface />} />
        <Route path="/profile/:username" element={<User_Profile />} />
        <Route path="/contact" element={<Contact_Page />} />
        <Route path="/about-us" element={<AboutUs_Page />} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App;
