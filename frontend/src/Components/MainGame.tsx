import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import KingSvg from './KingSvg';

interface Character {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  distanceToPlayer: number;
  isPaused: boolean; 
}

interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const GameView: React.FC = () => {
  // const [NPCTouched, setNPCTouched] = useState<boolean>(false);
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [player, setPlayer] = useState<Player>({ x: 400, y: 300, vx: 0, vy: 0 });
  const requestRef = useRef<number>();
  const canvasWidth = 800;
  const canvasHeight = 600;
  const characterSize = 20;
  const numCharacters = 3;
  const playerSpeed = 5;
  const playerRef = useRef<Player>({ x: 400, y: 300, vx: 0, vy: 0 });
  const pauseDistance = 20; // Distance threshold for pausing characters

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  // Function to be triggered when a character is close to the player
  const onCharacterClose = useCallback((character: Character) => {
    console.log(`Character ${character.id} is close to the player!`);
    // You can add more logic here, such as updating game state, triggering events, etc.
    navigate(`/cd${character.id}`);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch(event.key) {
      case 'ArrowLeft':
        setPlayer(prev => {
          const newPlayer = { ...prev, vx: -playerSpeed };
          playerRef.current = newPlayer;
          return newPlayer;
        });
        break;
      case 'ArrowRight':
        setPlayer(prev => {
          const newPlayer = { ...prev, vx: playerSpeed };
          playerRef.current = newPlayer;
          return newPlayer;
        });
        break;
      case 'ArrowUp':
        setPlayer(prev => {
          const newPlayer = { ...prev, vy: -playerSpeed };
          playerRef.current = newPlayer;
          return newPlayer;
        });
        break;
      case 'ArrowDown':
        setPlayer(prev => {
          const newPlayer = { ...prev, vy: playerSpeed };
          playerRef.current = newPlayer;
          return newPlayer;
        });
        break;
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    switch(event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        setPlayer(prev => {
          const newPlayer = { ...prev, vx: 0 };
          playerRef.current = newPlayer;
          return newPlayer;
        });
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        setPlayer(prev => {
          const newPlayer = { ...prev, vy: 0 };
          playerRef.current = newPlayer;
          return newPlayer;
        });
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    // Initialize characters
    const initialCharacters: Character[] = Array.from({ length: numCharacters }, (_, i) => ({
      id: i,
      x: Math.random() * (canvasWidth - characterSize),
      y: Math.random() * (canvasHeight - characterSize),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      distanceToPlayer: 0, // Initialize distance
      isPaused: false
    }));
    setCharacters(initialCharacters);

    // Animation loop
    const animate = () => {
      setCharacters(prevCharacters => 
        prevCharacters.map(char => {
          const distanceToPlayer = calculateDistance(
            char.x + characterSize/2, 
            char.y + characterSize/2, 
            playerRef.current.x + characterSize/2, 
            playerRef.current.y + characterSize/2
          );
    
          const isPaused = distanceToPlayer < pauseDistance;
    
          let newX = char.x;
          let newY = char.y;
          let newVx = char.vx;
          let newVy = char.vy;

          if(char.isPaused) {
            onCharacterClose(char);
          }
    
          if (!isPaused) {
            newX += char.vx;
            newY += char.vy;
            
            // Bounce off the walls
            if (newX <= 0 || newX >= canvasWidth - characterSize) {
              newVx *= -1;
              newX = Math.max(0, Math.min(newX, canvasWidth - characterSize));
            }
            if (newY <= 0 || newY >= canvasHeight - characterSize) {
              newVy *= -1;
              newY = Math.max(0, Math.min(newY, canvasHeight - characterSize));
            }
            

            if (Math.random() < 0.06) {
              newVx = (Math.random() - 0.5) * 2;
              newVy = (Math.random() - 0.5) * 2;
            }
          }
    
          return { 
            ...char, 
            x: newX, 
            y: newY, 
            vx: newVx,
            vy: newVy,
            distanceToPlayer, 
            isPaused 
          };
        })
      );

      setPlayer(prev => {
        let newX = prev.x + prev.vx;
        let newY = prev.y + prev.vy;

        // Keep player within bounds
        newX = Math.max(0, Math.min(newX, canvasWidth - characterSize));
        newY = Math.max(0, Math.min(newY, canvasHeight - characterSize));

        return { ...prev, x: newX, y: newY };
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [onCharacterClose]);

  return (
    <div className="flex justify-center items-start h-screen bg-neutral-800">
      <svg width={canvasWidth} height={canvasHeight} className="bg-white ">
      <div className='h-150 w-150'>
        <KingSvg width="100%" height="100%" viewBox="0 0 100 100" />
      </div>
        
        {/* AI Characters */}
        {characters.map(char => (
          <g key={char.id} transform={`translate(${char.x},${char.y})`}>
            <circle cx={characterSize/2} cy={characterSize/2} r={characterSize*1.8} fill="rgb(0, 0, 0, 1%)" />
            <circle cx={characterSize/2} cy={characterSize/2} r={characterSize/2} fill={char.color} />
            <circle cx={characterSize/3} cy={characterSize/3} r={2} fill="white" />
            <circle cx={characterSize*2/3} cy={characterSize/3} r={2} fill="white" />
            <path d={`M${characterSize/3},${characterSize*2/3} Q${characterSize/2},${characterSize*4/5} ${characterSize*2/3},${characterSize*2/3}`} stroke="white" fill="none" />
            {/* Display distance */}
            <text x={characterSize/2} y={-5} textAnchor="middle" fill="black" fontSize="10">
              {char.id === 0 && "Zara"}
              {char.id === 1 && "Grimble"}
              {char.id === 2 && "Lady Whisper"}
            </text>
          </g>
        ))}

        {/* Player Character */}
        <g transform={`translate(${player.x},${player.y})`}>
            <circle cx={characterSize/2} cy={characterSize/2} r={characterSize*1.8} fill="rgb(0, 0, 0, 1%)" />
            <circle cx={characterSize/2} cy={characterSize/2} r={characterSize/2} fill="red" />
            <circle cx={characterSize/3} cy={characterSize/3} r={2} fill="white" />
            <circle cx={characterSize*2/3} cy={characterSize/3} r={2} fill="white" />
            <path d={`M${characterSize/3},${characterSize*2/3} Q${characterSize/2},${characterSize*4/5} ${characterSize*2/3},${characterSize*2/3}`} stroke="white" fill="none" />
            <text x={characterSize/2} y={-5} textAnchor="middle" fill="black" fontSize="10">
              {"You"}
            </text>
        </g>

      </svg>
    </div>
  );
};

export default GameView;