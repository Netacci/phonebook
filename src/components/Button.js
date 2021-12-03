import React from 'react';

const Button = ({ text, handleDelete }) => {
  return (
    <>
      <button onClick={handleDelete}>{text}</button>
    </>
  );
};

export default Button;
