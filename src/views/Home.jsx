import React from "react";
import Tutorial from "./Tutorial";

/**
 * Initial screen allowing users to either host or join a game.
 */
const Home = ({ setView }) => {

    if(!true) {
        return(
            <>
                <div className="flex flex-col justify-center items-center h-screen">
                    <h1>Velkommen til Mayer</h1>
                    <div className="mt-3">
                        <button
                            className="p-1 bg-gray-200 m-1"
                            onClick={() => setView("JOIN_GAME")}
                        >
                            Join
                        </button>
                        <button
                            className="p-1 bg-gray-200 m-1"
                            onClick={() => setView("HOST_GAME")}
                        >
                            Host
                        </button>
                    </div>
                </div>
            </>
        );
    } else {

        // MANGLER
        // fikse skrivt og srtrl riktig
        // Få input boksene høyrere

        return(
            // This needs a bg image
            <div className="flex flex-col justify-center items-center h-screen w-full bg-pink-800">

                {/* Header */}
                <div className="flex flex-col justify-center items-center mb-16 w-full">
                    <h1 className="text-2xl pr-7">MEYER</h1>
                    <h1 className="text-2xl pl-7">ONLINE</h1>
                </div>

                {/* Selection */}
                <div className="flex justify-evenly w-full text-white">
                    <p className="text-gray-300 text-xl mx-8">Host</p>
                    <p className="text-gray-300 text-xl mx-8">Join</p>
                </div>
                
                {/* Box */}
                <div className="mt-10 w-[350px] h-[280px] bg-white  rounded-md flex flex-col justify-center items-center z-1">

                    {/* Half circle */}
                    <div className="w-20 h-20 rounded-t-full relative right-20 top-[-20px] bg-white" />

                    <div className="flex justify-start px-2  items-end w-[80%] h-[20%] border-b-4 border-gray-300">
                        <p className="text-2xl text-gray-300">XX</p>
                        <input 
                            className="mx-3 text-xl placeholder-gray-300 outline-none text-gray-300"
                            placeholder="Game ID"
                        />
                    </div>
                    <div className="mt-6 flex justify-start px-2 items-end w-[80%] h-[20%] border-b-4 border-gray-300">
                        <p className="text-2xl text-gray-300">XX</p>
                        <input
                            className="mx-3 text-xl placeholder-gray-300 outline-none text-gray-300"
                            placeholder="Username"
                        />
                    </div>
                    <button
                        className="w-[60%] mt-6 h-[25%] bg-red-300 rounded-xl text-white text-xl mb-8"
                    >
                        Host
                    </button>
                </div>

                {/* Other views */}
                <div className="text-gray-300 flex mt-6">
                    <p
                        className="px-6"
                        onClick={() => setView("TUTORIAL")}
                    >
                        Howto
                    </p>
                    <p
                        className="px-6"
                        onClick={() => setView("DEVELOPER")}
                    >
                        Developer
                    </p>
                </div>

            </div>
        );
    }
};

export default Home;