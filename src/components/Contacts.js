import React from 'react';
import Button from './Button';

const Contacts = ({ name, number, handleDelete }) => {
  return (
    <>
      <p>
        {name} {number}
        <Button text='Delete' handleDelete={handleDelete} />
      </p>
    </>
  );
};
export default Contacts;
