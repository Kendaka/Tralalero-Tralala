import React from 'react';

const Score = ({ score = 0, highScore = 0, isGameActive = false }) => {
    return (
        <>
            {/* Current Score (centered)*/}
            {isGameActive && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white font-bold bg-black/50 rounded-xl px-6 py-3">
                    {score}
                </div>
            )}
            
            {/* High Score (top right) */}
            <div className="absolute top-4 right-4 text-xl text-black font-bold bg-white/80 border border-gray-300 rounded-xl px-4 py-2 shadow-md">
                High Score: {highScore}
            </div>
        </>
    )
}

export default Score;