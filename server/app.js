const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

// Command to make an app using express
const app = express();

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
