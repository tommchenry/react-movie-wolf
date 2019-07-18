import React, { Component } from 'react'
import { Header, Item, Segment } from 'semantic-ui-react'
import MovieCard from './moviecard.js'

class SuggestedMovie extends Component {
  render() {
    const suggestedMovie = this.props.movie
    const getYearMovies = this.props.getYearMovies
    const getDirectorMovies = this.props.getDirectorMovies

    if (suggestedMovie) {
      return (
        <Segment color="grey" inverted padded tertiary>
          <Header as='h1'>Awoo</Header>
          <Item.Group>
            <MovieCard movie={suggestedMovie} getYearMovies={getYearMovies}getDirectorMovies={getDirectorMovies} />
          </Item.Group>
        </Segment>
      )
    } else {
      return null
    }
  }
}

export default SuggestedMovie;
