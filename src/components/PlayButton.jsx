import React from 'react';

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