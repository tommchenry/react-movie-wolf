import React, { Component } from 'react'
import { Container,  Menu, Image, Dimmer, Loader, Divider } from 'semantic-ui-react'
import DirectorBox from './directorbox.js'
import SuggestedMovie from './suggestedmovie.js'
import MovieList from './movielist.js'

class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getMovies = this.getMovies.bind(this)
    this.getOwnedMovies = this.getOwnedMovies.bind(this)
    this.getMovie = this.getMovie.bind(this)
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

  getFilteredMovies = tag_id => {
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

  getDirectorMovies = director_id => {
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

  getYearMovies = year => {
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
        <Container>
        <Divider hidden section />
        <Menu color='red' inverted stackable>
          <Menu.Item onClick={() => this.getMovies()}>Alphabetical</Menu.Item>
          <Menu.Item onClick={() => this.getSortedMovies("chrono")}>Chronological</Menu.Item>
          <Menu.Item onClick={() => this.getSortedMovies("chrono-rev")}>Reverse Chronological</Menu.Item>
          <Menu.Item onClick={() => this.getSuggestedMovie()}>Take It To The Wolf</Menu.Item>
          <Menu.Item onClick={() => this.clearFilters()}>Clear Filters</Menu.Item>
        </Menu>
        </Container>
        <Divider hidden section />
        <SuggestedMovie movie={suggestedMovie} getYearMovies={this.getYearMovies} getDirectorMovies={this.getDirectorMovies} getFilteredMovies={this.getFilteredMovies} />
        <DirectorBox director={director} />
        <MovieList movies={movies} getYearMovies={this.getYearMovies} getDirectorMovies={this.getDirectorMovies} getFilteredMovies={this.getFilteredMovies} />
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App
