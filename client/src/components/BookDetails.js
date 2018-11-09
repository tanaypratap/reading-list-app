import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from '../queries/queries';

class BookDetails extends React.Component {
    render() {
        const { book } = this.props.data
        return (
            <div id="book-details">
                
               { book && <div>
                    <h2> { book.name } </h2>
                    <p> Genre: <strong> {book.genre} </strong> </p>
                    <p> Author: <strong> {book.author.name} </strong> </p>
                    <h3> Books from same author </h3>
                    <ul className="other-books">
                        {
                            book.author.books.map(book => <li key={book.id} style={{ margin: '5px', padding: '5px' }}> { book.name } </li>)
                        }
                    </ul>
                </div>}
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);