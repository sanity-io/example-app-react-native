import React from 'react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import {FlatList, Image, ScrollView, Text, View} from 'react-native'

const query = `*[_type == "movie" && _id == $id] {
  _id,
  title,
  releaseDate,
  "posterUrl": poster.asset->url,
  "cast": castMembers[] {
    _key,
    characterName,
    "person": person-> {
      _id,
      name,
      "imageUrl": image.asset->url
    }
  }
}[0]
`

const getKey = value => value._key

export default class Movie extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: navigation.state.params.title
  })

  state = {
    movies: [],
    isLoading: true
  }

  async componentDidMount() {
    const {navigation} = this.props
    this.setState({
      movie: await sanity.fetch(query, {id: navigation.state.params.id}),
      isLoading: false
    })
  }

  state = {
    movie: null,
    isLoading: true
  }

  renderCast = ({item: cast}) => {
    const {navigate} = this.props.navigation
    return (
      <View>
        {cast.person.imageUrl && (
          <Image
            source={{uri: `${cast.person.imageUrl}?h=100`}}
            style={{width: 50, height: 50}}
          />
        )}
        <Text onPress={() => navigate('Person', {
          id: cast.person._id,
          title: cast.person.name
        })}>
          {cast.person.name}
        </Text>
        <Text> as {cast.characterName}</Text>
      </View>
    )
  }

  render() {
    const {movie, isLoading} = this.state
    if (isLoading) {
      return (
        <Layout>
          <Text>
            Loading…
          </Text>
        </Layout>
      )
    }
    return (
      <Layout>
        <Text>
          {movie.title} ({movie.releaseDate.substr(0, 4)})
        </Text>
        {movie.posterUrl && <Image
          source={{uri: `${movie.posterUrl}?h=100`}}
          style={{width: 50, height: 50}}
        />}
        <View>
          <Text>Cast</Text>
          <FlatList data={movie.cast} renderItem={this.renderCast} keyExtractor={getKey} />
        </View>
      </Layout>
    )
  }
}
