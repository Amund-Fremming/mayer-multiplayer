import React from "react";

/**
 * Initial screen allowing users to either host or join a game.
 */
const Home = ({ setView }) => {
    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>Velkommen til Mayer</h1>
                <div className="mt-3">
                    <button
                        className="p-1 bg-gray-200 m-1"
                        onClick={() => setView("JOIN_GAME")}
                    >
                        Join
                    </button>
                    <button
                        className="p-1 bg-gray-200 m-1"
                        onClick={() => setView("HOST_GAME")}
                    >
                        Host
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;