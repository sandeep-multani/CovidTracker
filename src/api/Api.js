const baseUrl = "api.covid19api.com/";
const useHttps = true;

const buildUrl = endpoint =>
    (useHttps ? `https://${baseUrl}${endpoint}` : `http://${baseUrl}${endpoint}`);
    
export default {
    cache: [],
    getSummary() {
        return fetch(buildUrl("summary")).then((response) => response.json());
    },
    getCountries() {
        return fetch(buildUrl("countries")).then((response) => response.json());
    },
    getCountryDetails(countryId, from, to) {
        return fetch(buildUrl(`total/country/${countryId}?from=${from}&to=${to}`)).then((response) => response.json());
    }
}
