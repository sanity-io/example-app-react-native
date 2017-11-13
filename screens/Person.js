import React from 'react'
import {Image, Text, View, StyleSheet} from 'react-native'
import {List, ListItem} from '../components/List'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import Heading from '../components/Heading'

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

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 8
  }
})

const getKey = value => value._key

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
      <ListItem
        imageUrl={movie.posterUrl}
        heading={`${movie.title} (${movie.releaseDate.substr(0, 4)})`}
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
    const {person, isLoading} = this.state
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
          <Heading>{person.name}</Heading>

          {person.imageUrl && (
            <Image source={{uri: `${person.imageUrl}?w=272`}} style={{width: 136, height: 204}} />
          )}

          <Heading level={2}>Acted in</Heading>
        </View>

        <List data={person.actedIn} renderItem={this.renderMovie} />
      </Layout>
    )
  }
}
