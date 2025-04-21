import React from 'react';

const PlayButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
    >
      Start Game
    </button>
  );
};

export default PlayButton;