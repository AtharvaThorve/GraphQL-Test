import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../Queries/Queries';

import BookDetails from '../BookDetails/BookDetails';

// The result of the graphql is stored in the props in this component it is binded to
class BookList extends Component {
	state = {
		selected: null
	};
	displayBooks = () => {
		const data = this.props.data;
		if (data.loading) {
			return <div>Loading books...!</div>;
		} else {
			return data.books.map(book => {
				return (
					<li
						key={book.id}
						onClick={e => {
							this.setState({ selected: book.id });
						}}
					>
						{book.name}
					</li>
				);
			});
		}
	};

	render() {
		return (
			<div>
				<ul id='book-list'>{this.displayBooks()}</ul>
				<BookDetails bookId={this.state.selected}/>
			</div>
		);
	}
}

// Binds the graphql query to the booklist so it adds some new props to it which we have used above
export default graphql(getBooksQuery)(BookList);
