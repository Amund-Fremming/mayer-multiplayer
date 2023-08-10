import React, { useState } from "react";
import Home from "./Home";
import JoinGame from "./JoinGame";
import HostGame from "./Hostgame";
import HostLobby from "./HostLobby";
import JoinLobby from "./JoinLobby";
import GameLobby from "./GameLobby";
import Game from "./Game";

const App = () => {

    /**
     * Game state for what components should render.
     */
    const [view, setView] = useState("HOME");
    const [username, setUsername] = useState("");
    const [gameid, setGameId] = useState("");

    const resetGameState = () => setView("HOME");

    if(view === "HOME") {
        return(
            <Home
                setView={setView}
            />  
        );
    } else if (view === "JOIN_GAME") {
        return(
            <JoinGame
                resetGameState={resetGameState}
                gameid={gameid}
                setGameid={setGameId}
                username={username}
                setUsername={setUsername}
                setView={setView}
            />
        )
    } else if(view === "HOST_GAME") {
        return(
            <HostGame
                resetGameState={resetGameState}
                gameid={gameid}
                setGameid={setGameId}
                username={username}
                setUsername={setUsername}
                setView={setView}
            />
        )
    } else if (view === "HOST_LOBBY") {
        return(
            <HostLobby
                resetGameState={resetGameState}
                gameid={gameid}
                username={username}
                setView={setView}
            />
        )
    } else if(view === "JOIN_LOBBY") {
        return(
            <JoinLobby
                resetGameState={resetGameState}
                gameid={gameid}
                username={username}
                setView={setView}
            />
        )
    } else if(view === "GAME_LOBBY") {
        return(
            <GameLobby
                resetGameState={resetGameState}
                gameid={gameid}
                username={username}
                setView={setView}
            />
        );
    } else if(view === "GAME") {
        return(
            <Game 
                gameid={gameid}
                username={username}
            />
        ); 
    }
};

export default App;