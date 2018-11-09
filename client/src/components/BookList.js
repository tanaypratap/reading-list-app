import React, { Component } from 'react';
import { graphql } from "react-apollo";

import { getBooksQuery } from "../queries/queries";
import BookDetails from './BookDetails';

class BookList extends Component {
    state = {
        selectedBook: null
    }
    render() {
        const { loading, books } = this.props.data
        return (
            <div>
                {
                    loading && <div> Loading Books.. </div>
                }
                <ul id="book-list">
                {
                    !loading && books.map(book => (<li key={book.id} onClick={ (e) => this.setState({ selectedBook: book.id }) }>{book.name}</li>))
                }
                </ul>
                {
                    this.state.selectedBook &&
                    <BookDetails bookId={this.state.selectedBook} />
                }
                
             </div >
        );
    }
}

export default graphql(getBooksQuery)(BookList);
