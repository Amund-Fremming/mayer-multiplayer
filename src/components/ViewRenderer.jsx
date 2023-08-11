import React, { useState } from "react";
import Home from "./Home";
import JoinGame from "./JoinGame";
import HostGame from "./Hostgame";
import HostLobby from "./HostLobby";
import JoinLobby from "./JoinLobby";
import GameLobby from "./GameLobby";
import Game from "./Game";

/**
 * Renders the correct view, and controlls the game flow.
 */
const ViewRenderer = () => {

    const [view, setView] = useState("HOME");
    const [username, setUsername] = useState("");
    const [gameid, setGameId] = useState("");
    const [documentRef, setDocumentRef] = useState();

    const resetGameState = () => {
        setView("HOME");
        // When dissconect logic is made: Removes the data from localhost
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
                />
            );
        case "GAME":
            return(
                <Game 
                    gameid={gameid}
                    username={username}
                />
            );
        default:
            return(
                <h1>Something went wrong</h1>
            );
    };
};

export default ViewRenderer;