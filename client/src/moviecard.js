import React, { Component } from 'react'
import { Item, Label, Divider } from 'semantic-ui-react'

class MovieCard extends Component {
  getYearMoviesClick = () => {
    this.props.getYearMovies(this.props.movie.year);
  }

  render() {
    const movie = this.props.movie
    const getDirectorMovies = this.props.getDirectorMovies
    const getFilteredMovies = this.props.getFilteredMovies

    return (
      <Item>
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
          {Object.keys(movie.tags).map((key) => (
            <MovieTag key={key} tag={movie.tags[key]} getFilteredMovies={getFilteredMovies} />
          ))}
        </Item.Content>
      </Item>
    )
  }
}

class MovieTag extends Component {
  getFilteredMoviesClick = () => {
    this.props.getFilteredMovies(this.props.tag.id);
  }

  render() {
    return(
      <Label onClick={this.getFilteredMoviesClick} as='a' color="red" tag>{this.props.tag.name}</Label>
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
    <Label onClick={this.getDirectorMoviesClick} as='a' color="orange">{this.props.director.name}</Label>
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
