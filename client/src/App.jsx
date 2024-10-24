import './App.css'
import { Routes, Route } from 'react-router-dom';
import Sign_In from './screens/Signin_Signup/Sign-In/Sign_In'
import Sign_up from './screens/Signin_Signup/Sign-up/Sign_up'
import Home_Page from './screens/Home_Page/Home_Page'
import Welcome from './screens/Welcome_Page/Welcome';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/sign-in" element={<Sign_In />} />
        <Route path="/sign-up" element={<Sign_up />} />
        <Route path="/home" element={<Home_Page />} />
      </Routes>
    </>
  )
}

export default App
