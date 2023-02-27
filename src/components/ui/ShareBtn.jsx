import React from 'react';

function ShareBtn({ data, handleShare }) {
  const { iconUrl, altName, btnContent } = data;

  return (
    <button type='button' onClick={handleShare}>
      <img src={iconUrl} alt={altName} />
      <span>{btnContent}</span>
    </button>
  );
}

export default ShareBtn;
