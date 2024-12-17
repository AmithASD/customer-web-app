import axios from "axios";

// API Key
const API_KEY = '?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQf';

// Configure Axios
const API_ENDPOINT = axios.create({
    headers: {
        'apiToken': API_KEY, // set the API Key
      },
});

export default API_ENDPOINT;
