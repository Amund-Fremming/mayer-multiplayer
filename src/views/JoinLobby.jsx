import React, { useEffect } from "react";
import { runTransaction, onSnapshot } from 'firebase/firestore';
import { db } from "../config/firebase";
import { handleLeaveGame } from "../util/databaseFunctions";
import Typewriter from "typewriter-effect";
import { styles } from "../styles/styles";

/**
 * Component for players to join a game lobby. Listens for game state changes in the database and reacts accordingly.
 */
const JoinLobby = ({ gameid, username, setView, resetGameState, documentRef, saveInSessionStorage }) => {

    /**
     * Subscribes to database updates for the specified game, and changes view accordingly.
     */
    useEffect(() => {
        if(!documentRef) return;

        saveInSessionStorage(gameid, username, documentRef);

        const unsubscribe = onSnapshot(documentRef, snapshot => {
            if (!snapshot.data()) {
                console.log("Game deleted");
                alert("Game deleted");
                resetGameState();
                return;
            }
    
            if (snapshot.data().state === "WAITING") {
                setView("GAME_LOBBY");
            }
        });

        return () => unsubscribe();
    }, [documentRef, setView]);

    /**
     * Removes the player from the game's player list and navigates to the landing page.
     */

    return(
        <div
            className="relative min-h-screen bg-cover bg-center flex flex-col justify-start pt-12 items-center h-screen w-full bg-gray-500" 
            style={{ backgroundImage: `url('${require("../img/lake.png")}')` }}
        >
            {/* Header */}
            <div className="flex flex-col justify-center items-center mb-16 w-full">
                <h1 className="text-3xl pr-7 font-oswald">MEYER</h1>
                <h1 className="text-3xl pl-7 font-oswald">ONLINE</h1>
            </div>

            {/* Info section */}
            <div className="text-2xl font-oswald text-gray-400 w-full flex flex-col justify-end items-center h-screen mb-4">
                <div className="flex w-full justify-center">
                    <p>Waiting for host &nbsp;</p>
                    <Typewriter 
                        options = {{
                            strings: [". . ."],
                            autoStart: true,
                            loop: true,
                            cursor: "",
                            pauseFor: 0,
                        }}
                    />
                </div>
                <button
                    className={`m-2 w-[120px] h-[45px] bg-[#A999FE] mt-4 rounded-xl text-2xl text-[${styles.textcolor}] font-oswald`}
                    onClick={() => handleLeaveGame(username, documentRef, resetGameState)}
                >
                    Leave
                </button>

            </div>

        </div>

        /*<>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>JoinLobby</h1>
                <h2>username: {username}</h2>
                <h2>gameid: {gameid}</h2>
                <h2>Waiting for Host ...</h2>
                <button
                    className='p-1 bg-gray-200 m-1'
                    onClick={() => handleLeaveGame(username, documentRef, resetGameState)}
                >
                    Leave
                </button>      
            </div>
        </>*/
    );
};

export default JoinLobby;