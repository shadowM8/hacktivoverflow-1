import axios from 'axios'
// const urlLink = 'http://35.187.245.8/'
const urlLink = 'http://localhost:3000'

export default axios.create({
    baseURL: `${urlLink}`,
  });

