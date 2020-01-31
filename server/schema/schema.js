// Inside this file the whole schema of graph and describes like object types their relation and how we can reach into the graph and interact with the data
const graphql = require('graphql');
const _ = require('lodash');

// Destructuring to take out the GraphQLObjectType and other props from graphql. The casing is very important.
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Dummy data
var books = [
	{ name: 'Name of the wind', genre: 'Fantasy', id: '1' },
	{ name: 'The Final empire', genre: 'Fantasy', id: '2' },
	{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3' }
];

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

// RootQuery is how we jump into the graph
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLString } }, // This argument gets the id of the book we want to query.
			/* From frontend it looks like
			Book(id: '123') {
				name, genre
			} */
			resolve(parent, args) {
				// code to get data from db / othersources
				// Using loadash to find the id from the books array
				return _.find(books, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
