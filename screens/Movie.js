import React from 'react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import {StyleSheet, Text, View, Image} from 'react-native'
import {List, ListItem} from '../components/List'
import Heading from '../components/Heading'

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

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 8
  }
})

const getCastKey = cast => cast._key

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

  renderCast = ({item: cast}) => {
    const {navigate} = this.props.navigation
    return (
      <ListItem
        imageUrl={cast.person.imageUrl}
        heading={`${cast.person.name} as ${cast.characterName}`}
        onPress={() =>
          navigate('Person', {
            id: cast.person._id,
            title: cast.person.name
          })
        }
      />
    )
  }

  render() {
    const {movie, isLoading} = this.state
    if (isLoading) {
      return (
        <Layout>
          <Text>Loading…</Text>
        </Layout>
      )
    }

    return (
      <Layout>
        <View style={styles.header}>
          <Heading>
            {movie.title} ({movie.releaseDate.substr(0, 4)})
          </Heading>

          {movie.posterUrl && (
            <Image source={{uri: `${movie.posterUrl}?w=272`}} style={{width: 136, height: 204}} />
          )}

          <Heading level={2}>Cast</Heading>
        </View>

        <List keyExtractor={getCastKey} data={movie.cast} renderItem={this.renderCast} />
      </Layout>
    )
  }
}
