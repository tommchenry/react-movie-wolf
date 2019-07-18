import React, { Component } from 'react'
import { Header, Item, Divider, Segment } from 'semantic-ui-react'

class DirectorBox extends Component {
  render() {
    const director = this.props.director
    if (director) {
    return(
      <div>
      <Segment color="grey" inverted padded tertiary>
      <Item.Group>
      <Item>
      <Item.Image src={director.image_url} />

      <Item.Content>
      <Item.Header as='a'>{director.name}</Item.Header>
      <Item.Description>
      {director.biography}
      </Item.Description>
      </Item.Content>
      </Item>
      </Item.Group>
      </Segment>
      <Header as='h1'>Films by {director.name}</Header>
      <Divider section />
      </div>
    )
    } else {
      return null
    }
  }
}

export default DirectorBox;
