import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

// Adding comment just to test
class AddBook extends Component {
	state = {
		name: '',
		genre: '',
		authorId: '',
	};

	submitForm = event => {
		event.preventDefault();
		this.props.addBookMutation({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				authorId:
					this.state.authorId.length > 0 ? this.state.authorId : this.props.getAuthorsQuery.authors[0].id,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});
	};
	render() {
		const {
			getAuthorsQuery: { authors, loading },
		} = this.props;

		return (
			<div>
				{loading && <div> Form loading ...</div>}
				{!loading && (
					<form id="add-book" onSubmit={this.submitForm}>
						<div className="field">
							<label> Book Name: </label>
							<input type="text" onChange={e => this.setState({ name: e.target.value })} />
						</div>
						<div className="field">
							<label> Genre: </label>
							<input type="text" onChange={e => this.setState({ genre: e.target.value })} />
						</div>
						<div className="field">
							<label> Author: </label>
							<select onChange={e => this.setState({ authorId: e.target.value })}>
								{authors.map(author => (
									<option key={author.id} value={author.id}>
										{' '}
										{author.name}{' '}
									</option>
								))}
							</select>
						</div>

						<button type="submit">+</button>
					</form>
				)}
			</div>
		);
	}
}

export default compose(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
