import axios from 'axios'

const authApi = axios.create({
  baseURL: 'https://intersindicalcanarias.onrender.com/api'
    // baseURL: 'http://localhost:3000/api'


})

export default authApi
