import React, { useState } from "react";

const Home = ({ joinGame, setJoinGame, hostGame, setHostGame }) => {

    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>Velkommen til Mayer</h1>
                <div className="mt-3">
                    <button
                        className="p-1 bg-gray-200 m-1"
                        onClick={() => setJoinGame(true)}
                    >
                        Join
                    </button>
                    <button
                        className="p-1 bg-gray-200 m-1"
                        onClick={() => setHostGame(true)}
                    >
                        Host
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;