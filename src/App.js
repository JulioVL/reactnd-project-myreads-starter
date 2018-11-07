import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import BookShelf from './BookShelf'

class BooksApp extends Component {
  
  constructor() {
    super();
    this.state = {
      books: []
    };
    this.changeShelf = this.changeShelf.bind(this);
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  componentDidMount() {
    this.getBooks();
  }

  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf).then( () => {
      book.shelf = shelf;

      this.getBooks();
    })
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )}/>
        <Route path='/Search' render={() => (
          <Search />
        )}/>
      </div>
    )
  }
}

export default BooksApp
