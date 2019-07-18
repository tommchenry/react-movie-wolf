import React, { Component } from 'react'
import { Container, Item } from 'semantic-ui-react'
import MovieCard from './moviecard.js'

class MovieList extends Component {
  render() {
    const movies = this.props.movies
    const getYearMovies = this.props.getYearMovies
    const getDirectorMovies = this.props.getDirectorMovies

    if (movies && movies.length) {
      return (
        <Item.Group divided>
        {Object.keys(movies).map((key) => ( 
          <MovieCard key={key} movie={movies[key]} getYearMovies={getYearMovies} getDirectorMovies={getDirectorMovies} /> 
        ))}
        </Item.Group>
      )
    } else {
      return (
        <Container textAlign='center'>No movies found.</Container>
      )
    }
  }
}

export default MovieList;