import React, { Component } from 'react'
import { Item, Label, Divider } from 'semantic-ui-react'

class MovieCard extends Component {
  getYearMoviesClick = () => {
    this.props.getYearMovies(this.props.movie.year);
  }

  render() {
    const key = this.props.key
    const movie = this.props.movie
    const getDirectorMovies = this.props.getDirectorMovies

    return (
      <Item key={key}>
                <MovieImage image_url={movie.image_url} is_owned={movie.is_owned} />
                <Item.Content>
                  <Item.Header>{movie.title}</Item.Header>
                  <Item.Meta>
                    <Label onClick={this.getYearMoviesClick} as='a' color="orange">{movie.year}</Label>
                  {Object.keys(movie.directors).map((key) => (
                    <DirectorButton key={key} director={movie.directors[key]} getDirectorMovies={getDirectorMovies} />
                  ))}
                  </Item.Meta>
                <MovieDescription description={movie.description} />
                <StreamingLink streaming_link={movie.streaming_link} is_owned={movie.is_owned} />
                <WishlistLink wishlist_link={movie.wishlist_link} is_owned={movie.is_owned} />
                <Divider hidden section />
                {movie.tags.length > 0 &&
                  movie.tags.map((tag) => {
                    return <Label onClick={() => this.getFilteredMovies(tag.id)} key={tag.id.toString()} as='a' color="red" tag>{tag.name}</Label>
                  })
                }
                </Item.Content>
                </Item>
              )
  }
}


class MovieImage extends Component {
  render() {
    if (this.props.is_owned) {
      return(
        <Item.Image src={this.props.image_url} label={{ as: 'a', corner: 'right', color: 'orange', icon: 'heart' }} />
      );
    } else {
      return (<Item.Image src={this.props.image_url} />);
    }
  }
}

class MovieDescription extends Component {
  render() {
    return(
      <Item.Description>
      <span>{this.props.description}</span>
      </Item.Description>
    );
  }
}

class DirectorButton extends Component {
  getDirectorMoviesClick = () => {
    this.props.getDirectorMovies(this.props.director.id);
  }

  render() {
    return(
    <Label onClick={this.getDirectorMoviesClick} key={this.props.director.id.toString()} as='a' color="orange">{this.props.director.name}</Label>
    );
  }
}

class WishlistLink extends Component {
  render() {
    if (this.props.is_owned) {
      return (
        ""
      )
    } else {
      return (
        <Label as='a' color="yellow" href={this.props.wishlist_link} >Add to Wishlist</Label>
      )
    }
  }
}

class StreamingLink extends Component {
  render() {
    if (this.props.is_owned) {
      return (
        ""
      )
    } else {
      return (
        <Label as='a' color="yellow" href={this.props.streaming_link} >Check Streaming Availability</Label>
      )
    }
  }
}

export default MovieCard;
