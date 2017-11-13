import React from 'react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import {List, ListItem} from '../components/List'

const query = `*[_type == "movie"] {
  _id,
  title,
  releaseDate,
  "director": crewMembers[job == "Director"][0].person->name,
  "posterUrl": poster.asset->url
}[0...50]
`

const getId = value => value._id

export default class Movies extends React.Component {
  static navigationOptions = {
    title: 'Movies'
  }

  state = {
    movies: []
  }

  async componentDidMount() {
    this.setState({movies: await sanity.fetch(query)})
  }

  renderMovie = ({item: movie}) => {
    const {navigate} = this.props.navigation

    return (
      <ListItem
        imageUrl={movie.posterUrl}
        heading={`${movie.title} (${movie.releaseDate.substr(0, 4)})`}
        subText={movie.director && `Directed by ${movie.director}`}
        onPress={() =>
          navigate('Movie', {
            id: movie._id,
            title: movie.title
          })
        }
      />
    )
  }

  render() {
    const {movies} = this.state
    return (
      <Layout>
        <List data={movies} renderItem={this.renderMovie} />
      </Layout>
    )
  }
}
