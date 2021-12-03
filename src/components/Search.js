import React from 'react';

const Search = ({ type, value, onChange }) => {
  return (
    <>
      <div>
        Search Contacts <input type={type} value={value} onChange={onChange} />
      </div>
    </>
  );
};

export default Search;
