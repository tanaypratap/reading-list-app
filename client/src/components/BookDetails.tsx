import React from "react";
import { graphql, ChildDataProps } from "react-apollo";
import { getBookQuery } from '../queries/queries';
import { Book } from './components.interface';
import BookNameEditor from './BookNameEditor';

type Response = { book: Book }
type InputProps = { bookId: string }
type Variables = { id: string }

const editButtonStyle = {
    cursor: 'pointer'
}

class BookDetails extends React.Component<ChildDataProps<InputProps, Response, Variables>, { editingBookName: boolean }> {
    state = {
        editingBookName: false
    }

    editBookName = () => {
        this.setState({ editingBookName: true })
    }

    render() {
        const { book } = this.props.data
        console.log('book', book)
        return (
            <div id="book-details">
                
               { book && <div>
                    <h2> { book.name } <sub style={editButtonStyle} onClick={this.editBookName}> 🖉 </sub> </h2>
                    <p> Genre: <strong> {book.genre} </strong> </p>
                    <p> Author: <strong> {book.author.name} </strong> </p>
                    <h3> Books from same author </h3>
                    <ul className="other-books">
                        {
                            book.author.books.map((book: any) => <li key={book.id} style={{ margin: '5px', padding: '5px' }}> { book.name } </li>)
                        }
                    </ul>
                </div>}

                { this.state.editingBookName &&
                    <div className="book-name-editor"> 
                        <BookNameEditor book={book} />
                    </div>
                }
            </div>
        );
    }
}

export default graphql<InputProps, Response, Variables, ChildDataProps<InputProps, Response, Variables>>(getBookQuery, {
    options: ({ bookId }) => ({
            variables: { id: bookId }
        }),
    })(BookDetails);