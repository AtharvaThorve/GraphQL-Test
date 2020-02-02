import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './Components/BookList/BookList';

// Apollo client set up
const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div id='main'>
					<h1>Reading List</h1>
					<BookList />
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
