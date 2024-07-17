interface TreasureTrunkProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    onClick?: () => void;
  }
  
  const TreasureTrunk: React.FC<TreasureTrunkProps> = ({ width = 200, height = 150, style, onClick, ...props }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 150" 
      width={width} 
      height={height}
      style={{ ...style }}
      {...props}
      onClick={onClick}
    >
      <style>
        {`
          .trunk-body { fill: #8B4513; }
          .trunk-lid { fill: #A0522D; }
          .metal-band { fill: #CD7F32; }
          .lock { fill: #FFD700; }
          @keyframes sparkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          .sparkle {
            fill: white;
            animation: sparkle 1.5s infinite;
          }
          .sparkle:nth-child(2) { animation-delay: 0.5s; }
          .sparkle:nth-child(3) { animation-delay: 1s; }
        `}
      </style>
      
      <rect className="trunk-body" x="20" y="70" width="160" height="70" rx="10" ry="10" />
      <path className="trunk-lid" d="M20 70 Q100 40 180 70 L180 80 Q100 50 20 80 Z" />
      <rect className="metal-band" x="15" y="90" width="170" height="10" />
      <rect className="metal-band" x="15" y="120" width="170" height="10" />
      <circle className="lock" cx="100" cy="75" r="10" />
      <polygon className="sparkle" points="40,100 45,95 50,100 45,105" />
      <polygon className="sparkle" points="160,110 165,105 170,110 165,115" />
      <polygon className="sparkle" points="100,130 105,125 110,130 105,135" />
    </svg>
  );
  
  export default TreasureTrunk;