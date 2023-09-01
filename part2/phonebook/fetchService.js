import axios from "axios";
const baseUrl = "http://localhost:3001/contacts";

function getData(url) {
  return axios.get(baseUrl);
}

function create(newContact) {
  return axios.post(baseUrl, newContact);
}

function update(id, newContact) {
  return axios.put(`${baseUrl}/${id}`, newContact);
}

function destroy(id) {
  return axios.delete(`${baseUrl}/${id}`);
}

export default { getData, create, update, destroy };
