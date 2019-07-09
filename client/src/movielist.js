import React, { Component } from 'react'
import { Container, Button, Header, Image, Item, Label, Dimmer, Loader, Divider, Segment } from 'semantic-ui-react'
import MovieCard from './moviecard.js'

class MovieList extends Component {
  render() {
    const movies = this.props.movies
    if (movies && movies.length) {
      return (
        <Item.Group divided>
        {Object.keys(movies).map((key) => ( 
          <MovieCard key={key} movie={movies[key]}/> 
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
