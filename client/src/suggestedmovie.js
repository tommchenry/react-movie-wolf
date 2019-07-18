import React, { Component } from 'react'
import { Header, Item, Segment } from 'semantic-ui-react'
import MovieCard from './moviecard.js'

class SuggestedMovie extends Component {
  render() {
    const suggestedMovie = this.props.movie
    const getYearMovies = this.props.getYearMovies
    const getDirectorMovies = this.props.getDirectorMovies
    const getFilteredMovies = this.props.getFilteredMovies

    if (suggestedMovie) {
      return (
        <Segment color="grey" inverted padded tertiary>
          <Header as='h1'>Awoo</Header>
          <Item.Group>
            <MovieCard movie={suggestedMovie} getYearMovies={getYearMovies}getDirectorMovies={getDirectorMovies} getFilteredMovies={getFilteredMovies}/>
          </Item.Group>
        </Segment>
      )
    } else {
      return null
    }
  }
}

export default SuggestedMovie;
