import React, { useEffect, useState } from "react";
import Home from "./Home";
import JoinGame from "./JoinGame";
import HostGame from "./Hostgame";
import HostLobby from "./HostLobby";
import JoinLobby from "./JoinLobby";
import GameLobby from "./GameLobby";
import Game from "./Game";
import { collection, doc, getDocs, where, query } from "firebase/firestore";
import { db } from "../util/firebase";

/**
 * Renders the correct view, and controlls the game flow.
 */
const ViewRenderer = () => {

    const initialView = sessionStorage.getItem("view") || "HOME";
    const initialUsername = sessionStorage.getItem("username") || "";
    const initialGameId = sessionStorage.getItem("gameid") || "";

    const [view, setView] = useState(initialView);
    const [username, setUsername] = useState(initialUsername);
    const [gameid, setGameId] = useState(initialGameId);
    const [documentRef, setDocumentRef] = useState();

    const resetGameState = () => {
        setView("HOME");
        sessionStorage.clear();
    };

    /**
     * Updates the documentRef when a player refreshes their page. 
     */
    useEffect(() => {
        const getDocumentRef = async () => {
            const collectionRef = collection(db, "games");
            const q = query(collectionRef, where("gameid", "==", gameid));
            try {
                const querySnapshot = await getDocs(q);
                if(!querySnapshot.empty) {
                    const documentRefLocal = doc(collectionRef, querySnapshot.docs[0].id);
                    setDocumentRef(documentRefLocal);
                }
            } catch(err) {
                console.log(err.message);
            }
        };

        getDocumentRef()
    }, []);

    const saveInSessionStorage = (gameidlocal, usernamelocal, documentReflocal) => {
        sessionStorage.setItem("gameid", gameidlocal);
        sessionStorage.setItem("username", usernamelocal);
        sessionStorage.setItem("documentRef", JSON.stringify(documentReflocal));
        sessionStorage.setItem("view", view);
    };

    switch(view) {
        case "HOME":
            return(
                <Home
                    setView={setView}
                /> 
            );
        case "JOIN_GAME":
            return(
                <JoinGame
                    resetGameState={resetGameState}
                    gameid={gameid}
                    setGameid={setGameId}
                    username={username}
                    setUsername={setUsername}
                    setView={setView}
                    setDocumentRef={setDocumentRef}
                />
            );
        case "HOST_GAME":
            return(
                <HostGame
                    resetGameState={resetGameState}
                    gameid={gameid}
                    setGameid={setGameId}
                    username={username}
                    setUsername={setUsername}
                    setView={setView}
                    setDocumentRef={setDocumentRef}
                />
            );
        case "JOIN_LOBBY":
            return(
                <JoinLobby
                    resetGameState={resetGameState}
                    gameid={gameid}
                    username={username}
                    setView={setView}
                    documentRef={documentRef}
                    saveInSessionStorage={saveInSessionStorage}
                />
            );
        case "HOST_LOBBY":
            return(
                <HostLobby
                    resetGameState={resetGameState}
                    gameid={gameid}
                    username={username}
                    setView={setView}
                    documentRef={documentRef}
                    saveInSessionStorage={saveInSessionStorage}
                />
            );
        case "GAME_LOBBY":
            return(
                <GameLobby
                    resetGameState={resetGameState}
                    gameid={gameid}
                    username={username}
                    setView={setView}
                    documentRef={documentRef}
                    saveInSessionStorage={saveInSessionStorage}
                />
            );
        case "GAME":
            return(
                <Game 
                    gameid={gameid}
                    username={username}
                    documentRef={documentRef}
                    saveInSessionStorage={saveInSessionStorage}
                    resetGameState={resetGameState}
                />
            );
        default:
            return(
                <h1>Something went wrong</h1>
            );
    };
};

export default ViewRenderer;