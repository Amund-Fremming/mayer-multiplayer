import React from "react";

const JoinLobby = ({ gameid, username, setGameStarted, resetAllGameStates }) => {
    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>JoinLobby</h1>
                <h2>username: {username}</h2>
                <h2>gameid: {gameid}</h2>
                <h2>Waiting for Host ...</h2>
                <button
                    className='p-1 bg-gray-200 m-1'
                    onClick={() => resetAllGameStates()}
                >
                    Leave
                </button>      
            </div>
        </>
    );
};

export default JoinLobby;