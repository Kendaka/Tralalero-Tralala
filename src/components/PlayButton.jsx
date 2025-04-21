import React from 'react';

const PlayButton = ({ onClick, text }) => {
  return (
    <button 
      onClick={onClick}
      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xl"
    >
      {text}
    </button>
  );
};

export default PlayButton;