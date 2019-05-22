import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Image, Dimmer, Loader, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getMovies = this.getMovies.bind(this)
    this.getMovie = this.getMovie.bind(this)
  }

  componentDidMount () {
    this.getMovies()
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getMovies () {
    this.fetch('/api/movies')
      .then(movies => {
        if (movies.length) {
          this.setState({movies: movies})
          this.getMovie(movies[0].id)
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
    let {movies, movie} = this.state
    return movies
      ? <Container text>
        <Image src='https://s3.amazonaws.com/movie-wolf/MovieWolfLogo.png' size='medium' centered />
        <Divider hidden section />
        {movies && movies.length
          ? <Button.Group color='red' fluid widths={movies.length}>
            {Object.keys(movies).map((key) => {
              return <Button active={movie && movie.id === movies[key].id} fluid key={key} onClick={() => this.getMovie(movies[key].id)}>
                {movies[key].title}
              </Button>
            })}
          </Button.Group>
          : <Container textAlign='center'>No movies found.</Container>
        }
        <Divider section />
        {movie &&
          <Container>
            <Header as='h2'>{movie.title}</Header>
            {movie.description && <p>{movie.description}</p>}
            {movie.directors &&
              <Segment.Group>
                {movie.directors.map((director, i) => <Segment key={i}>{director.name}</Segment>)}
              </Segment.Group>
            }
            {movie.steps && <p>{movie.steps}</p>}
            {movie.source && <Button basic size='tiny' color='red' href={movie.source}>Source</Button>}
          </Container>
        }
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App
