import React from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../util/firebase';
import { v4 } from 'uuid';

const HostGame = ({ resetAllGameStates, gameid, setGameid, username, setUsername, setHostLobby }) => {

    const gamesRef = collection(db, "games");

    const createGame = async () => {
        // Creates a new game in the database
        // With all properties needed

        await addDoc(gamesRef, {
            gameid: gameid,
            currentPlayer: "",
            players: [
                {
                    username: username,
                    ready: false,
                },
                {
                    username: "bruker2",
                    ready: false,
                }
            ],
            roundnumber: 0,
            state: "Created",
        }); 
    };

    const handleHostedGame = () => {
        // Her må det sjekkes at game ID ikke er i bruk eller finnes allerede
        if(gameid === "" || username === "") {
            alert("Fill out username/gameid");
        } else {
            resetAllGameStates();
            setHostLobby(true);
            createGame();
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
