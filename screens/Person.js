import React from 'react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import {FlatList, Image, ScrollView, Text, View} from 'react-native'

const query = `*[_type == "person" && _id == $id] {
  _id,
  name,
  "imageUrl": image.asset->url,
  "actedIn": *[_type == "movie" && references(^._id) && (^._id in castMembers[].person._ref)] {
    _id,
    title,
    releaseDate,
    "posterUrl": poster.asset->url
  }
}[0]
`

const getKey = value => value._key
const getId = value => value._id

export default class Person extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: navigation.state.params.title
  })

  state = {
    person: [],
    isLoading: true
  }

  async componentDidMount() {
    const {navigation} = this.props
    this.setState({
      person: await sanity.fetch(query, {id: navigation.state.params.id}),
      isLoading: false
    })
  }

  state = {
    person: null,
    isLoading: true
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
    const {person, isLoading} = this.state
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
          {person.name}
        </Text>
        {person.imageUrl && <Image
          source={{uri: `${person.imageUrl}?h=100`}}
          style={{width: 50, height: 50}}
        />}
        <View>
          <Text>Acted in</Text>
          <FlatList data={person.actedIn} renderItem={this.renderMovie} keyExtractor={getId} />
        </View>
      </Layout>
    )
  }
}
