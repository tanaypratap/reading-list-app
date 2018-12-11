import React from "react";
import { withApollo } from 'react-apollo';
import { getBookQuery, getBooksQuery, getBookFragment, justGetBookQuery } from '../queries/queries';

class BookNameEditor extends React.Component<{book:any, client:any}> {

    editBookHandler = (event: any) => {
        
        const { client } = this.props;
        const newBookName = event.target.value;

        /** Using all books query */
        // let allBooks: any = client.readQuery({
        //     query: getBooksQuery
        // })

        // console.log({ allBooks })

        // const bookEditedIdx = allBooks.books.findIndex((book: any) => book.id === this.props.book.id)

        // console.log({ bookEditedIdx })

        // allBooks.books[bookEditedIdx].name = newBookName;

        // console.log({ allBooks })

        // client.writeQuery({
        //     query: getBooksQuery,
        //     data: allBooks
        // })

        /** Using getBookQuery */
        const queryData: any = client.readQuery({
            query: getBookQuery,
            variables: {
                id: this.props.book.id,
            },
        })

        const newBooksArray = queryData.book.author.books.map((book: any) => {
            if (book.id == this.props.book.id) {
                return { ...book, name: newBookName }
            } else return book
        })

        const data = {
            ...queryData,
            book: {
                ...queryData.book,
                name: newBookName,
                author: {
                    ...queryData.book.author,
                    books: newBooksArray
                }
            }

        }

         client.writeQuery({
            query: getBookQuery,
            variables: {
                id: this.props.book.id,
            },
            data,
        })


        /** Just get book query */
        // const queryData: any = client.readQuery({
        //     query: justGetBookQuery,
        //     variables: {
        //         id: this.props.book.id,
        //     },
        // })

        // const data = {
        //     ...queryData,
        //     book: {
        //         ...queryData.book,
        //         name: newBookName
        //     }

        // }

        //  client.writeQuery({
        //     query: justGetBookQuery,
        //     variables: {
        //         id: this.props.book.id,
        //     },
        //     data,
        // })

        /* Using fragments created just for this */
        // let data: any = client.readFragment({
        //     id: 'Book:'+ this.props.book.id,
        //     fragment: getBookFragment,
        // })

        // data = {
        //     ...data, name: newBookName
        // }

        //  client.writeFragment({
        //     id: 'Book:'+ this.props.book.id,
        //     fragment: getBookFragment,
        //     data,
        // })

        // for debugging
        console.log('cacheValue: ',(window as any).__APOLLO_CLIENT__.store.cache.data.data[`Book:${this.props.book.id}`].name)
    
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <input 
                    type="text" 
                    onChange={this.editBookHandler}
                    value={this.props.book.name}>
                </input>
            </div>
        )
    }
}

export default withApollo(BookNameEditor) as any