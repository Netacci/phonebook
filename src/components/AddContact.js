import React from 'react';
import Button from './Button';

const AddContact = ({
  onSubmit,
  onChangeName,
  onChangeNum,
  valueName,
  valueNum,
  type,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input type={type} onChange={onChangeName} value={valueName} />
        </div>
        <div>
          number: <input type={type} onChange={onChangeNum} value={valueNum} />
        </div>
        <Button text='ADD NEW' />
      </form>
    </>
  );
};
export default AddContact;
