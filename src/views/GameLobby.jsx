import React, { useEffect, useState } from "react";
import { onSnapshot, runTransaction, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { handleLeaveGame } from "../util/databaseFunctions";
import { styles } from "../styles/styles";

/**
 * GameLobby: Renders when the host starts the game with a "Waiting" state.
 * Allows users to ready up, displaying all player names, changing colors when ready.
 */
const GameLobby = ({ resetGameState, gameid, username, setView, documentRef, saveInSessionStorage }) => {

    const [players, setPlayers] = useState([]);
    const [isReady, setIsReady] = useState(false);

    /**
     * Subscribes a listener to DB for updates for players list.
     */
    useEffect(() => {
        if(!documentRef) return; 

        saveInSessionStorage(gameid, username, documentRef);

        const unsubscribe = onSnapshot(documentRef, snapshot => {
            if (!snapshot.data()) {
                console.error("Document does not exist!");
                return;
            }

            setPlayers(snapshot.data().players);
            setIsReady(snapshot.data().players.some(player => player.username === username && player.ready === true));
        });

        return () => unsubscribe();
    }, [documentRef]);

    useEffect(() => {
        const handleAllPlayersReady = async () => {
            const areAllPlayersReady = players => players.every(player => player.ready === true); 
            
            if(players.length !== 0 && areAllPlayersReady(players)) {
                // denne metoden blir sendt flere ganger enn nødvendig
                try {
                    await updateDoc(documentRef, { state: "IN_PROGRESS" });
                } catch (err) {
                    console.log("Error: " + err.message);
                }

                setView("GAME");
            }
        };

        handleAllPlayersReady();
    });

    /**
     * Checks if all players are ready and updates game state.
     */
    const handleReadyUp = async () => {
        if(isReady) return;
        try {    
            const updatePlayerStatus = async (transaction) => {
                const docSnapshot = await transaction.get(documentRef);
                if (!docSnapshot.exists) {
                    throw new Error("Document does not exist!");
                }

                const players = docSnapshot.data().players;
                const updatedPlayers = players.map(player => {
                    if (player.username === username) {
                        return {...player, ready: true}
                    }
                    return player;
                });

                transaction.update(documentRef, { players: updatedPlayers });
            };
                
            setIsReady(true);
            console.log(`Player: ${username} is ready`);
            await runTransaction(db, updatePlayerStatus);
        } catch(err) {
            console.log("Error: " + err.message);
        }
    };  

    if(true) {
        return(
            <div
            className="relative min-h-screen bg-cover bg-center flex flex-col justify-start items-center h-screen w-full bg-gray-500" 
            style={{ backgroundImage: `url('${require("../img/lake.png")}')` }}
        >

            {/* Header */}
            <div className="flex flex-col justify-center items-center w-full pt-20">
                <h1 className="text-3xl pr-7 font-serif">MEYER</h1>
                <h1 className="text-3xl pl-7 font-serif">ONLINE</h1>
                <p className="text-xl font-serif text-[#01ADCB] mt-4">{gameid}</p>
            </div>

            {/* Players */}
            <div className="absolute top-52 w-[70%] flex flex-wrap justify-center items-center">
                {players.map(player => (<p className={`mx-2 px-2 my-2 ${player.ready ? "text-green-400" : "text-red-400"} bg-gray-200 bg-opacity-20 p-1 text-center rounded-md font-roboto text-xl`} key={player.username}>{player.username}</p>))}
            </div>

            {/* buttons */}
            <div className="flex w-full items-center justify-center absolute bottom-12">
                <button
                    className={`m-2 w-[120px] h-[45px] bg-[#A999FE] rounded-xl text-xl text-[${styles.textcolor}] font-oswald`}
                    onClick={handleLeaveGame}
                >
                    Leave
                </button>
                <button
                    className={`m-2 w-[120px] h-[45px] ${isReady ? "bg-green-400" : "bg-[#A999FE]"} rounded-xl text-xl text-[${styles.textcolor}] font-oswald`}
                    onClick={handleReadyUp}
                >
                    Ready
                </button>
            </div>
        </div>
        );
    }
    else {
    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>GameLobby</h1>
                <h2>Gameid: {gameid}</h2>
                <h2>Players</h2>
                <div className="w-[20%] flex flex-wrap">
                    {
                        players.map(player => (
                            <p key={player.username} className={player.ready ? "text-green-500 m-1" : "text-red-500 m-1"}>{player.username}</p>
                        ))
                    }
                </div>
                <div className="flex">
                    <button
                        className='p-1 bg-gray-200 m-1'
                        onClick={() => handleLeaveGame(username, documentRef, resetGameState)}
                    >
                        Leave
                    </button>  
                    <button
                        className={isReady ? `bg-green-500 p-1 m-1 ` : `bg-gray-200 p-1 m-1 `}
                        onClick={handleReadyUp}
                    >
                        Ready
                    </button>
                </div>
            </div>
        </>
    )}  
};

export default GameLobby;