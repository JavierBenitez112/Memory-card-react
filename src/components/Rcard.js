import React from 'react';

function Rcard({ image, title }) {
  return (
    // using Tailwind CSS for styling it was not made by AI
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg w-64 h-64 object-cover" src={image} alt={title} />
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    </div>
  );
}

export default Rcard;
