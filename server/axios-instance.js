const axios = require('axios')

const instance = axios.create({
	baseURL: 'https://book-app-b4efc.firebaseio.com'
})

module.exports = instance