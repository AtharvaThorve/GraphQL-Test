import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../../Queries/Queries';

class BookDetails extends Component {
	displayBookHandler = () => {
		// Destructuring
		const { book } = this.props.data;
		if (book) {
			return (
				<div>
					<h2>{book.name}</h2>
					<p>{book.genre}</p>
					<p>{book.author.name}</p>
					<p>All books by the author</p>
					<ul className='other-books'>
						{book.author.books.map(book => {
							return <li key={book.id}>{book.name}</li>;
						})}
					</ul>
				</div>
			);
		} else {
			return <p>No book selected!!!</p>;
		}
	};
	render() {
		return (
			<div id='book-details'>
				{this.displayBookHandler()}
			</div>
		);
	}
}

export default graphql(getBookQuery, {
	options: props => {
		return {
			variables: {
				id: props.bookId
			}
		};
	}
})(BookDetails);
