import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

function getAll(url) {
  return axios.get(baseUrl);
}

export default { getAll };
