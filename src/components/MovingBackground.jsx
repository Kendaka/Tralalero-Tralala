import backgroundImage from '../assets/movingBackground.png';

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