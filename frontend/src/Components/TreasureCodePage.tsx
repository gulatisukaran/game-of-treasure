import { useState } from 'react';

const TreasureCodePage = () => {
  const [code, setCode] = useState(['', '', '']);
  const correctCode = ['2', '7', '5']; // The correct code
  const [won, setWon] = useState(false);

  const handleInputChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Check if the code is correct
    if (newCode.join('') === correctCode.join('')) {
      setWon(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-[1280px]">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Treasure Code</h2>
        
        {!won ? (
          <>
            <div className="flex justify-center mb-6">
              {[0, 1, 2].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={code[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-20 h-20 text-4xl text-center border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 text-center">Enter the 3-digit code to unlock the treasure!</p>
          </>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 mb-4">Congratulations!</p>
            <p className="text-lg text-gray-700">You've cracked the code and won the game!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreasureCodePage;