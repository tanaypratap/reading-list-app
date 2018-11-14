import React, { Component } from 'react';
import { graphql, ChildDataProps } from "react-apollo";

import { getBooksQuery } from "../queries/queries";
import BookDetails from './BookDetails';
import { Response } from './components.interface'

class BookList extends Component<ChildDataProps<{}, Response>, {selectedBook: string}> {
    state = {
        selectedBook: ''
    }
    render() {
        const { loading, books } = this.props.data
        return <div>
            {loading && <div> Loading Books.. </div>}
            <ul id="book-list">
              {!loading && books && books.map((book) => (
                  <li
                    key={book.id}
                    style={{
                      backgroundColor:
                        this.state.selectedBook === book.id
                          ? "#cbbcc4"
                          : "#eee"
                    }}
                    onClick={e =>
                      this.setState({ selectedBook: book.id })
                    }
                  >
                    {book.name} {}
                  </li>
                ))}
            </ul>
            { (this.state.selectedBook.length > 0) && <BookDetails bookId={this.state.selectedBook} />}
          </div>;
    }
}

// grahql<InputProps, Response, Variables>
export default graphql<{}, Response, {}, ChildDataProps<{}, Response>>(getBooksQuery)(BookList);
