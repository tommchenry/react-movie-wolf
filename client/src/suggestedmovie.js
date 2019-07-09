import React, { Component } from 'react'
import { Container, Button, Header, Image, Item, Label, Dimmer, Loader, Divider, Segment } from 'semantic-ui-react'
import MovieCard from './moviecard.js'

class SuggestedMovie extends Component {
  render() {
    const suggestedMovie = this.props.movie
    if (suggestedMovie) {
      return (
          <Segment color="grey" inverted padded tertiary>
          <Header as='h1'>Awoo</Header>
          <Item.Group>
          <MovieCard movie={suggestedMovie} />
          </Item.Group>
          </Segment>
      )
    } else {
      return null
    }
  }
}

export default SuggestedMovie;
