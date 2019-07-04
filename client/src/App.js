import React, { Component } from 'react'
import { Container, Button, Header, Image, Item, Label, Dimmer, Loader, Divider, Segment } from 'semantic-ui-react'

class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getMovies = this.getMovies.bind(this)
    this.getOwnedMovies = this.getOwnedMovies.bind(this)
    this.getMovie = this.getMovie.bind(this)
    this.getFilteredMovies = this.getFilteredMovies.bind(this)
    this.getDirectorMovies = this.getDirectorMovies.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
    this.getSuggestedMovie = this.getSuggestedMovie.bind(this)
  }

  componentDidMount () {
    this.getOwnedMovies()
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getFilteredMovies(tag_id) {
    this.fetch(`/api/movies?tag=${tag_id}`)
      .then(movies => {
        if (movies.length) {
          this.setState({director: "", suggestedMovie: ""})
          this.setState({movies: movies})
        } else {
          this.setState({director: "", suggestedMovie: ""})
          this.setState({movies: []})
        }
      })
  }

  getDirectorMovies(director_id) {
    this.fetch(`/api/movies?director=${director_id}&sort=chrono`)
      .then(movies => {
        if (movies.length) {
          this.setState({movies: movies, suggestedMovie: ""})
          this.getDirector(director_id)
        } else {
          this.setState({movies: []})
        }
      })
  }

  getSuggestedMovie() {
    this.fetch(`api/movies/suggest`)
      .then(suggestedMovie => this.setState({suggestedMovie: suggestedMovie}))
  }

  getDirector (id) {
    this.setState({suggestedMovie: ""})
    this.fetch(`/api/directors/${id}`)
      .then(director => this.setState({director: director}))
  }

  getYearMovies(year) {
    this.fetch(`/api/movies?year=${year}`)
      .then(movies => {
        if (movies.length) {
          this.setState({director: "", suggestedMovie: ""})
          this.setState({movies: movies})
        } else {
          this.setState({director: "", suggestedMovie: ""})
          this.setState({movies: []})
        }
      })
  }

  getMovies () {
    this.fetch('/api/movies')
      .then(movies => {
        if (movies.length) {
          this.setState({movies: movies})
        } else {
          this.setState({movies: []})
        }
      })
  }

  getOwnedMovies () {
    this.fetch('/api/movies?owned=true')
      .then(movies => {
        if (movies.length) {
          this.setState({director: "", suggestedMovie: ""})
          this.setState({movies: movies})
        } else {
          this.setState({director: "", suggestedMovie: ""})
          this.setState({movies: []})
        }
      })
  }

  clearFilters () {
    this.setState({director: "", suggestedMovie:""})
    this.getOwnedMovies()
  }

  getSortedMovies (sort) {
    this.fetch(`/api/movies?owned=true&sort=${sort}`)
      .then(movies => {
        if (movies.length) {
          this.setState({director: ""})
          this.setState({movies: movies})
        } else {
          this.setState({director: ""})
          this.setState({movies: []})
        }
      })
  }

  getMovie (id) {
    this.fetch(`/api/movies/${id}`)
      .then(movie => this.setState({movie: movie}))
  }

  render () {
    let {movies, director, suggestedMovie} = this.state
    return movies
      ? <Container text>
        <Image src='https://s3.amazonaws.com/movie-wolf/MovieWolfLogo.png' size='medium' centered />
        <Button.Group color='red' fluid>
          <Button onClick={() => this.getMovies()}>Alphabetical</Button>
          <Button onClick={() => this.getSortedMovies("chrono")}>Chronological</Button>
          <Button onClick={() => this.getSortedMovies("chrono-rev")}>Reverse Chronological</Button>
          <Button onClick={() => this.getSuggestedMovie()}>Take It To The Wolf</Button>
          <Button onClick={() => this.clearFilters()}>Clear Filters</Button>
        </Button.Group>
        <Divider hidden section />
        {suggestedMovie ?

          <Segment color="grey" inverted padded tertiary>
          <Header as='h1'>Awoo</Header>
          <Item.Group>
          <Item>
                <MovieImage image_url={suggestedMovie.image_url} />
                <Item.Content>
                  <Item.Header>{suggestedMovie.title}</Item.Header>
                  <Item.Meta>
                    <Label onClick={() => this.getYearMovies(suggestedMovie.year)} as='a' color="orange">{suggestedMovie.year}</Label>
                      {suggestedMovie.directors.length > 0 && 
                        suggestedMovie.directors.map((director) => {
                          return <Label onClick={() => this.getDirectorMovies(director.id)} key={director.id.toString()} as='a' color="orange">{director.name}</Label>
                        })
                      }
                  </Item.Meta>
                <MovieDescription description={suggestedMovie.description} />
                <Divider hidden section />
                {suggestedMovie.tags.length > 0 && 
                  suggestedMovie.tags.map((tag) => {
                    return <Label onClick={() => this.getFilteredMovies(tag.id)} key={tag.id.toString()} as='a' color="red" tag>{tag.name}</Label>
                  })
                }
                </Item.Content>
          </Item>
          </Item.Group>
          </Segment>
          :
          ""
        }
        {director ? 
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
          : ""
        }
        {movies && movies.length
          ? <Item.Group divided>
            {Object.keys(movies).map((key) => {
              return <Item key={key}>
                <MovieImage image_url={movies[key].image_url} is_owned={movies[key].is_owned} />
                <Item.Content>
                  <Item.Header>{movies[key].title}</Item.Header>
                  <Item.Meta>
                    <Label onClick={() => this.getYearMovies(movies[key].year)} as='a' color="orange">{movies[key].year}</Label>
                      {movies[key].directors.length > 0 && 
                        movies[key].directors.map((director) => {
                          return <Label onClick={() => this.getDirectorMovies(director.id)} key={director.id.toString()} as='a' color="orange">{director.name}</Label>
                        })
                      }
                  </Item.Meta>
                <MovieDescription description={movies[key].description} />
                <StreamingLink streaming_link={movies[key].streaming_link} is_owned={movies[key].is_owned} />
                <WishlistLink wishlist_link={movies[key].wishlist_link} is_owned={movies[key].is_owned} />
                <Divider hidden section />
                {movies[key].tags.length > 0 && 
                  movies[key].tags.map((tag) => {
                    return <Label onClick={() => this.getFilteredMovies(tag.id)} key={tag.id.toString()} as='a' color="red" tag>{tag.name}</Label>
                  })
                }
                </Item.Content>
                </Item>
            })}
          </Item.Group>
          : <Container textAlign='center'>No movies found.</Container>
        }
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
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

export default App
