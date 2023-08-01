import React, { useState } from "react";

const HostLobby = ({ gameid, username, setGameStarted, resetAllGameStates }) => {

    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>HostLobby</h1>
                <h2>username: {username}</h2>
                <h2>gameid: {gameid}</h2>
                <div className='flex m-1'>
                    <button
                        className='p-1 bg-gray-200 m-1'
                        onClick={() => resetAllGameStates()}
                    >
                        Leave
                    </button>
                    <button
                        className="p-1 bg-gray-200 m-1"
                        onClick={() => setGameStarted(true)}
                    >
                        Start Game
                    </button>
                </div>
            </div>
        </>
    );
};

export default HostLobby;