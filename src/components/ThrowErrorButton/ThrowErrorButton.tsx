import { useState } from 'react';

const ThrowErrorButton = () => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error('This is a test error');
  }

  return (
    <div className="text-center mt-6">
      <button
        onClick={() => setIsError(true)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
      >
        Throw Error
      </button>
    </div>
  );
};

export default ThrowErrorButton;
