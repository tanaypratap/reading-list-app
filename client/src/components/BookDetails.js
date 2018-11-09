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
                    <p> { book.genre } </p>
                    <p> { book.author.name } </p>
                    <h4> Other Books from the author </h4>
                    <ul className="other-books">
                        {
                            book.author.books.map(book => <li key={book.id}> { book.name } </li>)
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