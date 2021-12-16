import axios from 'axios';

const url = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};
const create = (obj) => {
  const request = axios.post(url, obj);
  return request.then((response) => response.data);
};

const deleteObj = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => response.data);
};
const replaceNum = (id, obj) => {
  const request = axios.put(`${url}/${id}`, obj);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deleteObj, replaceNum };
