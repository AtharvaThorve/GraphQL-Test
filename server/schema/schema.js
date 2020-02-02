// Inside this file the whole schema of graph and describes like object types their relation and how we can reach into the graph and interact with the data
const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../Models/Book');
const Author = require('../Models/Author');

// Destructuring to take out the GraphQLObjectType and other props from graphql. The casing is very important.
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql;

// Dummy data
// var books = [
// 	{ name: 'Name of the wind', genre: 'Fantasy', id: '1', authorId: '1' },
// 	{ name: 'The Final empire', genre: 'Fantasy', id: '2', authorId: '2' },
// 	{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
// 	{ name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
// 	{ name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
// 	{ name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' }
// ];

// var authors = [
// 	{ name: 'Patrick Rothfuss', age: 44, id: '1' },
// 	{ name: 'Brandon Sanderson', age: 42, id: '2' },
// 	{ name: 'Terry Pratchett', age: 66, id: '3' }
// ];

// Declaring a new object type for graphql
const BookType = new GraphQLObjectType({
	name: 'Book', // Name of the object
	// Contains the fields this object type must hold like id, title, genre etc.
	fields: () => ({
		id: { type: GraphQLID }, // Use GraphQLID to make id or give type to the id property
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// The parent property contains whatever data we got from the higher level data in this case book with the author id
				console.log(parent);
				// return _.find(authors, { id: parent.authorId });
				return Author.findById(parent.authorId);
				// Finds the author in the database
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// Need to return list of books with author id matching to the id of parent(in this case it is author)
				// return _.filter(books, { authorId: parent.id });
				return Book.find({ authorId: parent.id });
			}
		}
	})
});

// RootQuery is how we jump into the graph
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } }, // This argument gets the id of the book we want to query.
			/* From frontend it looks like
			Book(id: '123') {
				name, genre
			} */
			resolve(parent, args) {
				// code to get data from db / othersources
				// Using loadash to find the id from the books array
				console.log(typeof args.id); // this shows it changes id to string
				// return _.find(books, { id: args.id });
				return Book.findById(args.id);
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(authors, { id: args.id });
				return Author.findById(args.id);
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return books
				return Book.find({});
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// return authors
				return Author.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, args) {
				let author = new Author({
					...args
				});
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let book = new Book({
					...args
				});
				return book.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
