import React, { Component } from 'react'
import { Container, Button, Image, Item, Label, Dimmer, Loader, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getMovies = this.getMovies.bind(this)
    this.getMovie = this.getMovie.bind(this)
    this.getFilteredMovies = this.getFilteredMovies.bind(this)
    this.getDirectorMovies = this.getDirectorMovies.bind(this)
  }

  componentDidMount () {
    this.getMovies()
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
          this.setState({movies: movies})
        } else {
          this.setState({movies: []})
        }
      })
  }

  getDirectorMovies(director_id) {
    this.fetch(`/api/movies?director=${director_id}&sort=chrono`)
      .then(movies => {
        if (movies.length) {
          this.setState({movies: movies})
        } else {
          this.setState({movies: []})
        }
      })
  }

  getYearMovies(year) {
    this.fetch(`/api/movies?year=${year}`)
      .then(movies => {
        if (movies.length) {
          this.setState({movies: movies})
        } else {
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

  getSortedMovies (sort) {
    this.fetch(`/api/movies?sort=${sort}`)
      .then(movies => {
        if (movies.length) {
          this.setState({movies: movies})
        } else {
          this.setState({movies: []})
        }
      })
  }

  getMovie (id) {
    this.fetch(`/api/movies/${id}`)
      .then(movie => this.setState({movie: movie}))
  }

  render () {
    let {movies} = this.state
    return movies
      ? <Container text>
        <Image src='https://s3.amazonaws.com/movie-wolf/MovieWolfLogo.png' size='medium' centered />
        <Button.Group color='red' fluid>
          <Button onClick={() => this.getMovies()}>Alphabetical</Button>
          <Button onClick={() => this.getSortedMovies("chrono")}>Chronological</Button>
          <Button onClick={() => this.getSortedMovies("chrono-rev")}>Reverse Chronological</Button>
          <Button onClick={() => this.getMovies()}>Clear Filters</Button>
        </Button.Group>
        <Divider hidden section />
        {movies && movies.length
          ? <Item.Group divided>
            {Object.keys(movies).map((key) => {
              return <Item key={key}>
                <Item.Image src={movies[key].image_url} />
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

export default App
