import React from "react";

const HostLobby = ({ gameid, username, setGameStarted, resetAllGameStates }) => {
    
    /*const allPlayersReady = () => {
        // onSnapshot to the game that is created
        // Checks if all players are ready
        // If all players ready, set gameStarted to true
    };*/

    const handleLeaveGame = () => {
        resetAllGameStates();
        // Deletes the game that was created
        // The joined players need to get the update so they can also leave their game that does not exist anymore
    };

    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>HostLobby</h1>
                <h2>username: {username}</h2>
                <h2>gameid: {gameid}</h2>
                <div className='flex m-1'>
                    <button
                        className='p-1 bg-gray-200 m-1'
                        onClick={handleLeaveGame}
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