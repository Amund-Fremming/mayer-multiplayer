import React from 'react'

function PlayerTurn({ documentRef, username, gameid }) {

  const updateDices = (dice1, dice2) => {

  };

  const handleBust = () => {
    
  };

  // IF THIS PLAYER LEAVES: set the currentPlayer to next player
  return (
    <>
      <div className='flex justify-center items-center'>
        <button
          className='m-2 p-1 bg-gray-200'
          onClick={""}
        >
          Bust
        </button>
        <button
          className='m-2 p-1 bg-gray-200'
          onClick={""}
        >
          Throw dice
        </button>
      </div>
    </>
  )
};

export default PlayerTurn
