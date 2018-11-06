import React, { Component } from 'react';
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`
class BookList extends Component {
    
    render() {
        const { loading, books } = this.props.data
        return (
            <div>
                {
                    loading && <div> Loading Books.. </div>
                }
                <ul id="book-list">
                {
                    !loading && books.map(book => (<li key={book.id}>{book.name}</li>))
                }
                </ul>
             </div >
        );
    }
}

export default graphql(getBooksQuery)(BookList);
