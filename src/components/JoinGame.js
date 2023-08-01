import React, { useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../util/firebase';

const JoinGame = ({ resetAllGameStates , gameid, setGameid, username, setUsername, setJoinLobby }) => {

    const handleJoinedGame = () => {
        if (username === "" || gameid === "") {
            alert("Fill out username/gameid");
        } else {
            resetAllGameStates();
            setJoinLobby(true);
        }
    };

  return(
    <>
        <div className='flex flex-col items-center justify-center h-screen'>
            JoinGame
            <input
                type="text"
                placeholder='Game ID'
                onChange={e => setGameid(e.target.value)}
            />
            <input
                type="text"
                placeholder='Username'
                onChange={e => setUsername(e.target.value)}
            />
            <div className='flex m-1'>
                <button
                    className='p-1 bg-gray-200 m-1'
                    onClick={() => resetAllGameStates()}
                >
                    Back
                </button>
                <button
                    className='p-1 bg-gray-200 m-1'
                    onClick={handleJoinedGame}
                >   
                    Join
                </button>
            </div>
        </div>
    </>
  );
};

export default JoinGame;
