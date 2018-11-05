import React, { Component } from "react";
import { graphql } from "react-apollo";

import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
    state = {
        name: '',
        genre: '',
        authorId: ''
    }

    submitForm = (event) => {
        event.preventDefault();
        console.log(this.state)
    }
    render() {
        const { authors, loading } = this.props.data
        return <div>
            {loading && <div> Form loading ...</div>}
            {!loading && <form id="add-book" onSubmit={this.submitForm}>
                <div className="field">
                  <label> Book Name: </label>
                  <input type="text" onChange={ (e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="field">
                  <label> Genre: </label>
                    <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
                </div>
                <div className="field">
                  <label> Author: </label>
                    <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                    {authors.map(author => (
                      <option key={author.id} value={author.id}> {author.name} </option>
                    ))}
                  </select>
                </div>

                <button type="submit">+</button>
              </form>}
          </div>;
      
        
    }
}

export default graphql(getAuthorsQuery)(AddBook)