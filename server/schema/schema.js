// Inside this file the whole schema of graph and describes like object types their relation and how we can reach into the graph and interact with the data
const graphql = require('graphql');

// Destructuring to take out the GraphQLObjectType and other props from graphql. The casing is very important.
const { GraphQLObjectType, GraphQLString } = graphql;

// Declaring a new object type for graphql
const BookType = new GraphQLObjectType({
	name: 'Book', // Name of the object
	// Contains the fields this object type must hold like id, title, genre etc.
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
		// This object type contains 3 fields which are all strings in graphql
	})
});
