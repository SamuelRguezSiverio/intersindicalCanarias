import axios from 'axios'

const authApi = axios.create({
  baseURL: 'https://intersindicalcanarias.onrender.com/api'
})

export default authApi
