import React, { Component } from 'react'
import { Container, Divider, Item, Input } from 'semantic-ui-react'
import MovieCard from './moviecard.js'

class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredMovies: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      filteredMovies: this.props.movies
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredMovies: nextProps.movies
    });
  }

  handleChange(e) {
    let currentList = [];
    let filteredList = [];

    if (e.target.value !== "") {
      currentList = this.props.movies;

      filteredList = currentList.filter(movie => {
        const lc = movie.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      filteredList = this.props.movies;
    }

    this.setState({
      filteredMovies: filteredList
    });
  }

  render() {
    const movies = this.state.filteredMovies
    const getYearMovies = this.props.getYearMovies
    const getDirectorMovies = this.props.getDirectorMovies
    const getFilteredMovies = this.props.getFilteredMovies

    if (movies && movies.length) {
      return (
        <Item.Group divided unstackable>
          <Input fluid icon='search' onChange={this.handleChange} placeholder='Search...' />
          {Object.keys(movies).map((key) => (
            <MovieCard key={key} movie={movies[key]} getYearMovies={getYearMovies} getDirectorMovies={getDirectorMovies} getFilteredMovies={getFilteredMovies} />
          ))}
        </Item.Group>
      )
    } else {
      return (
        <Item.Group divided unstackable>
          <Input fluid icon='search' onChange={this.handleChange} placeholder='Search...' />
          <Divider hidden section />
          <Container textAlign='center'>No movies found.</Container>
        </Item.Group>
      )
    }
  }
}

export default MovieList;
