import React from 'react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import {AppRegistry, FlatList, Image, ScrollView, Text, View} from 'react-native'

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
    title: 'Movies',
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
      <View
        style={{flex: 1, flexDirection: 'column'}}
      >
        {movie.posterUrl && <Image
          source={{uri: `${movie.posterUrl}?h=50`}}
          style={{width: 50, height: 50}}
        />}
        <Text onPress={() => navigate('Movie', {
          id: movie._id,
          title: movie.title
        })}>
          {movie.title}
        </Text>
        <Text>({movie.releaseDate.substr(0, 4)})</Text>
        {movie.director && <Text>Directed by {movie.director}</Text>}
      </View>
    )
  }

  render() {
    const {movies} = this.state
    return (
      <Layout>
        <FlatList
          data={movies}
          keyExtractor={getId}
          renderItem={this.renderMovie}
        />
      </Layout>
    )
  }
}
