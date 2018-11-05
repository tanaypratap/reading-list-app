Some Example Queries, Mutations and their results
=================================================

Query
-----

`{
  book(id:  "5be00697dfbd6761a50a6e74") {
    name
    genre
    author{
      name
      age
      books {
        name
        genre
      }
    }
  }
}`

Output
------

`{
  "data": {
    "book": {
      "name": "The Hero of Ages",
      "genre": "Fantasy",
      "author": {
        "name": "Brandon Sanderson",
        "age": 42,
        "books": [
          {
            "name": "The Final Empire",
            "genre": "Fantasy"
          },
          {
            "name": "The Hero of Ages",
            "genre": "Fantasy"
          }
        ]
      }
    }
  }
}
`

Query 
-----
`{
	authors {
    name
    age
    books{
      name
    }
  }
}`

Output
------

`{
  "data": {
    "authors": [
      {
        "name": "Patrick Rothfuss",
        "age": 44,
        "books": [
          {
            "name": "Name of the Wind"
          }
        ]
      },
      {
        "name": "Brandon Sanderson",
        "age": 42,
        "books": [
          {
            "name": "The Final Empire"
          },
          {
            "name": "The Hero of Ages"
          }
        ]
      },
      {
        "name": "Terry Pratchett",
        "age": 66,
        "books": [
          {
            "name": "The Colour of Magic"
          },
          {
            "name": "The Light Fantastic"
          },
          {
            "name": "The Long Earth"
          }
        ]
      }
    ]
  }
}`