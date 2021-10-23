const axios = require('axios').default

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

export default axios
