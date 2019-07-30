import React, { Component } from 'react'
import { Container, Icon, Menu, Image, Dimmer, Loader, Divider } from 'semantic-ui-react'
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
    this.setState({director: "", suggestedMovie:"", currentSort:""})
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

  // function for dynamic sorting
  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }


  getAlphaSortMovies(order='asc') {
    let currentMovies = [];
    let sortedMovies = [];
    const currentSort = this.state.currentSort;

    currentMovies = this.state.movies;

    if (currentSort === "alpha_asc") {
      order = 'desc'
    }
    sortedMovies = currentMovies.sort(this.compareValues('title', order))

    this.setState({
      movies: sortedMovies,
      currentSort: "alpha_" + order
    });
  }

  getChronoSortMovies(order='asc') { 
    let currentMovies = [];
    let sortedMovies = [];
    const currentSort = this.state.currentSort;

    currentMovies = this.state.movies;

    if (currentSort === "chrono_asc") { 
      order = 'desc'
    }
    sortedMovies = currentMovies.sort(this.compareValues('year', order))

    this.setState({
      movies: sortedMovies,
      currentSort: "chrono_" + order
    });
  }

  getMovie (id) {
    this.fetch(`/api/movies/${id}`)
      .then(movie => this.setState({movie: movie}))
  }

  getIconForSort (sortPrefix) {
    let currentSort = this.state.currentSort;
    let arrowDown = "long arrow alternate down"
    let arrowUp = "long arrow alternate up"
    if (!currentSort) {
      return arrowUp
    }
    
    if (currentSort.includes(sortPrefix) && currentSort.includes("asc")) {
      return arrowDown
    } else {
      return arrowUp
    }
  }

  render () {
    let {movies, director, suggestedMovie} = this.state
    return movies
      ? <Container text>
        <Image src='https://s3.amazonaws.com/movie-wolf/MovieWolfLogo.png' size='medium' centered />
        <Divider hidden section />
        <SuggestedMovie movie={suggestedMovie} getYearMovies={this.getYearMovies} getDirectorMovies={this.getDirectorMovies} getFilteredMovies={this.getFilteredMovies} />
        <DirectorBox director={director} />
        <Container>
        <Divider hidden section />
        <Menu color='red' inverted stackable>
          <Menu.Item onClick={() => this.getAlphaSortMovies()}>Alphabetical<Icon name={this.getIconForSort("alpha")} /></Menu.Item>
          <Menu.Item onClick={() => this.getChronoSortMovies()}>Chronological<Icon name={this.getIconForSort("chrono")} /></Menu.Item>
          <Menu.Item onClick={() => this.getSuggestedMovie()}>Take It To The Wolf</Menu.Item>
          <Menu.Item onClick={() => this.clearFilters()}>Clear Filters</Menu.Item>
        </Menu>
        </Container>
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
