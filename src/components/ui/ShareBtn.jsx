import React from 'react';

function ShareBtn({ data }) {
  const { iconUrl, altName, btnContent } = data;

  return (
    <button type='button'>
      <img src={iconUrl} alt={altName} />
      <span>{btnContent}</span>
    </button>
  );
}

export default ShareBtn;
