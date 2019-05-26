import React, { Component } from 'react'
import { Container, Button, Image, Item, Label, Dimmer, Loader, Divider } from 'semantic-ui-react'

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
        </Button.Group>
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
                <MovieDescription description={movies[key].description} />
                <Divider hidden section />
                <div>
                  <MovieTagList tags={movies[key].tags} />
                </div>
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

class MovieTagList extends Component {
  render() {
    let tags = this.props.tags;
    return tags.length 
      ? 
      tags.map((tag) => {
         return <MovieTag key={tag.id.toString()}
                      value={tag.name} />
      })
      : ""
  }
}


class MovieTag extends Component {
  filterMovies(tag) {
    this.fetch(`/api/movies?tag=${tag}`)
      .then(movies => {
        if (movies.length) {
          this.setState({movies: movies})
        } else {
          this.setState({movies: []})
        }
      })
  }

  render() {
    return <Label as='a' color="red" tag>{this.props.value}</Label>
  }
}

export default App
