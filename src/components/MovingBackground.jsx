import backgroundImage from '../assets/movingBackground.png';

// This component renders a moving background image that covers the entire screen.

const MovingBackground = () => {
  return (
    <div 
      className="absolute inset-0 z-0 moving-bg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    ></div>
  );
};

export default MovingBackground;