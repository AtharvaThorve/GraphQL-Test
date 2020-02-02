import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../../Queries/Queries';

// The result of the graphql is stored in the props in this component it is binded to
class BookList extends Component {
	displayBooks = () => {
		const data = this.props.data;
		if (data.loading) {
			return <div>Loading books...!</div>;
		} else {
			return data.books.map(book => {
				return <li key={book.id}>{book.name}</li>;
			});
		}
	};

	render() {
		return (
			<div>
				<ul id='book-list'>{this.displayBooks()}</ul>
			</div>
		);
	}
}

// Binds the graphql query to the booklist
export default graphql(getBooksQuery)(BookList);