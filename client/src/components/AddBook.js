import React, { Component } from "react";
import { graphql } from "react-apollo";

import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
    render() {
        const { authors, loading } = this.props.data
        return <div>
            {loading && <div> Form loading ...</div>}
            {!loading && <form id="add-book">
                <div className="field">
                  <label> Book Name: </label>
                  <input type="text" />
                </div>
                <div className="field">
                  <label> Genre: </label>
                  <input type="text" />
                </div>
                <div className="field">
                  <label> Author: </label>
                  <select>
                    {authors.map(author => (
                      <option key={author.id} value={author.id}> {author.name} </option>
                    ))}
                  </select>
                </div>

                <button>+</button>
              </form>}
          </div>;
      
        
    }
}

export default graphql(getAuthorsQuery)(AddBook)