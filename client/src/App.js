import React, { Component } from 'react'
import { Container, Image, Item, Dimmer, Loader, Divider } from 'semantic-ui-react'

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
          ? <Item.Group divided>
            {Object.keys(movies).map((key) => {
              return <Item>
                <Item.Image src={movies[key].image_url} />
                <Item.Content>
                  <Item.Header as='a'>{movies[key].title}</Item.Header>
                  <Item.Meta>
                    <span>{movies[key].year}</span>
                  </Item.Meta>
                  <Item.Description>
                    <span>{movies[key].description}</span>
                  </Item.Description>
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

export default App
