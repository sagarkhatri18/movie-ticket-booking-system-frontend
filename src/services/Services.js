import axios from 'axios'

// handle the login API
export const login = async (email, password) => {
  return axios.post(process.env.API_URL + `login`, { email: email, password: password })
}
