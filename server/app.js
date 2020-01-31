const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
// Command to make an app using express
const app = express();

mongoose.connect('mongodb+srv://Atharva:test123@book-app-fw1al.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
	console.log('Connected to database')
})
// Middleware
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true // Make this true to use graphiql
	})
);

// method to run the app or listen to a port
app.listen(4000, () => {
	console.log('Now listening to requests on port 4000');
});
