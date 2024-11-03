import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Host = () => {

  const [code, setCode] = useState('');

  const generateCode = async() => {
    try{
      const code = await axios.get("http://localhost:5000/host")
      setCode(code.data);
    } catch(err){
      console.log("Error Generating Code : ", err);
    }
  }

  useEffect(() => {
    generateCode();
  }, [])

  return (
    <>
      <div>
        {code}  
      </div>
    </>
  )
}

export default Host