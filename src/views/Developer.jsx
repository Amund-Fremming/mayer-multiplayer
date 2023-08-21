import React, { useEffect, useState } from 'react'

const Developer = () => {

  const [profile, setProfile] = useState("me-pixel.JPG");

  useEffect(() => {
    const timer = setInterval(() => {
      if(profile === "me-pixel.JPG") {
        setProfile("me-pixel-wink.JPG");
      } else {
        setProfile("me-pixel.JPG");
      }
    }, 1500);

    return () => clearInterval(timer);
  });

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <p className='font-bradford text-[18px]'>Amund Fremming</p>
      <p className='text-gray-400'>Engineer & CEO</p>
      <img 
        className='w-[40%]'
        src={require(`../img/${profile}`)}
      />
      
      <div className='flex justify-between mt-20 w-[100px]'>
        <p className='underline underline-offset-2 text-[18px]'><a href='https://twitter.com/amundfremming'>X</a></p>
        <p className='underline underline-offset-2 text-[18px]'><a href="mailto:amund.fremming@gmail.com">Mail</a></p>
      </div>

      <p className='flex relative bottom-[-240px] text-[16px]'> © 2023 FremmingLabs, Inc. </p>

    </div>
  )
}

export default Developer
