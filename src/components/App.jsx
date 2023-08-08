import React, { useState } from "react";
import Home from "./Home";
import JoinGame from "./JoinGame";
import HostGame from "./Hostgame";
import HostLobby from "./HostLobby";
import JoinLobby from "./JoinLobby";
import GameLobby from "./GameLobby";
import Game from "./Game";

const App = () => {

    const [joinGame, setJoinGame] = useState(false);
    const [hostGame, setHostGame] = useState(false);
    const [hostLobby, setHostLobby] = useState(false);
    const [joinLobby, setJoinLobby] = useState(false);
    const [gameLobby, setGameLobby] = useState(false);
    const [username, setUsername] = useState("");
    const [gameid, setGameId] = useState("");

    const resetAllGameStates = () => {
        setJoinGame(false);
        setHostGame(false);
        setHostLobby(false);
        setJoinLobby(false);
        setGameLobby(false);
    };

    if(!joinGame && !hostGame && !hostLobby && !joinLobby && !gameLobby) {
        return(
            <Home
                joinGame={joinGame}
                hostGame={hostGame}
                setJoinGame={setJoinGame}
                setHostGame={setHostGame}
            />  
        );
    } else if (joinGame) {
        return(
            <JoinGame
                resetAllGameStates={resetAllGameStates}
                gameid={gameid}
                setGameid={setGameId}
                username={username}
                setUsername={setUsername}
                setJoinLobby={setJoinLobby}
            />
        )
    } else if(hostGame) {
        return(
            <HostGame
                resetAllGameStates={resetAllGameStates}
                gameid={gameid}
                setGameid={setGameId}
                username={username}
                setUsername={setUsername}
                setHostLobby={setHostLobby}
            />
        )
    } else if (hostLobby) {
        return(
            <HostLobby
                resetAllGameStates={resetAllGameStates}
                gameid={gameid}
                username={username}
                setGameLobby={setGameLobby}
            />
        )
    } else if(joinLobby) {
        return(
            <JoinLobby
                resetAllGameStates={resetAllGameStates}
                gameid={gameid}
                username={username}
                setGameLobby={setGameLobby}
            />
        )
    } else if(gameLobby) {
        return(
            <GameLobby
                resetAllGameStates={resetAllGameStates}
                gameid={gameid}
                username={username}
            />
        );
    }
};

export default App;