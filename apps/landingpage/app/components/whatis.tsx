import React from "react";

const WhatIs = () => {
return (
    <div className="md:flex md:flex-row  text-bold px-10 align-middle  col">
        <div className="font-poppins  md:w-1/2  md:py-48 pt-10 text-3xl md:text-6xl flex justify-center leading-10 text-center align-middle ">
            What is emma about?
        </div>

        <div className="py-12 md:w-1/2 rounded-md">
            {/* <div className="relative pb-[56.25%] w-[100%] h-[20px]">
                            <iframe
                                    src="https://www.loom.com/embed/403c94941dff45aca7924e13fb6bb1d2?sid=f9dccc62-983c-472f-8221-3aad3e713cda"
                                    frameBorder="0"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                    </div> */}

           
                <iframe
                    src="https://www.loom.com/embed/c1245930c5bc4c4fae3dc0f3c127155b?sid=adab023f-2420-48e1-83d9-4d970c141759"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: "20px" ,height:"100%",width:"100%"}}
                    className="  md:w-1/2"
                ></iframe>
          
        </div>
    </div>
);
};

export default WhatIs;
