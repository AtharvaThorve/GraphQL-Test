import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import flowright from 'lodash.flowright';
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery
} from '../../Queries/Queries';

class AddBook extends Component {
	state = {
		name: '',
		genre: '',
		authorId: ''
	};

	displayAuthors = () => {
		const data = this.props.getAuthorsQuery;
		// console.log(this.props)
		if (data.loading) {
			return <option disabled>Loading Authors...!</option>;
		} else {
			return data.authors.map(author => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				);
			});
		}
	};
	submitFormHandler = e => {
		e.preventDefault();
		// console.log(this.state);
		this.props.addBookMutation({
			// This variables are passed down to the mutations were they are used
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				authorId: this.state.authorId
			},
			// It refetches the given query and so it runs again and since it gets updated when form is
			// submitted then the component gets rerendered and we see the added book
			refetchQueries: [{ query: getBooksQuery }]
		});
	};
	render() {
		return (
			<form id='add-book' onSubmit={this.submitFormHandler}>
				<div className='field'>
					<label>Book name:</label>
					<input
						type='text'
						onChange={e => this.setState({ name: e.target.value })}
					/>
				</div>

				<div className='field'>
					<label>Genre:</label>
					<input
						type='text'
						onChange={e => this.setState({ genre: e.target.value })}
					/>
				</div>

				<div className='field'>
					<label>Author:</label>
					<select
						defaultValue={''}
						onChange={e =>
							this.setState({ authorId: e.target.value })
						}
					>
						<option value='' disabled hidden>
							Select Author:
						</option>
						{this.displayAuthors()}
					</select>
				</div>

				<button>+</button>
			</form>
		);
	}
}

// Whatever name you give down there is the name that is used to call/use it.
export default flowright(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
