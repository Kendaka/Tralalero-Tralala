import React from 'react';

// This component renders a play button with a given text and an onClick handler.

const PlayButton = ({ onClick, text }) => {
  return (
    <button 
      onClick={onClick}
      className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xl font-bold shadow-lg"
    >
      {text}
    </button>
  );
};

export default PlayButton;