import axios from "axios";

const allCountriesUrl = "https://restcountries.eu/rest/v2/all";

const getAllCountries = () => {
  const req = axios.get(allCountriesUrl);
  return req.then(res => res.data);
};

export default { getAllCountries };