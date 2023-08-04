import React from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../util/firebase';
import { v4 } from 'uuid';

const HostGame = ({ resetAllGameStates, gameid, setGameid, username, setUsername, setHostLobby }) => {

    const createGame = () => {
        // Creates a new game in the database
        // With all properties needed
    };

    const handleHostedGame = () => {
        // Her må det sjekkes at game ID ikke er i bruk eller finnes allerede
        if(gameid === "" || username === "") {
            alert("Fill out username/gameid");
        } else {
            resetAllGameStates();
            setHostLobby(true);
        }
    };

    return(
        <>
            <div className='flex flex-col items-center justify-center h-screen'>
                Hostgame
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
                        onClick={handleHostedGame}
                    >   
                        Host
                    </button>
                </div>
            </div>
        </>
    );
};

export default HostGame;
