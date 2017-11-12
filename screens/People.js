import React from 'react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import {FlatList, Image, ScrollView, Text, View} from 'react-native'

const query = `*[_type == "person"] {
  _id,
  name,
  "imageUrl": image.asset->url,
  "movies": *[_type == "movie" && references(^._id)] {
    _id,
    title
  }
}[0...50]
`

const getId = value => value._id

export default class People extends React.Component {
  static navigationOptions = {
    title: 'People',
  }

  state = {
    people: []
  }

  async componentDidMount() {
    this.setState({people: await sanity.fetch(query)})
  }

  renderPerson = ({item: person}) => {
    const {navigate} = this.props.navigation

    return (
      <View
        style={{flex: 1, flexDirection: 'column'}}
      >
        {person.imageUrl && <Image
          source={{uri: `${person.imageUrl}?h=50`}}
          style={{width: 50, height: 50}}
        />}
        <Text onPress={() => navigate('Person', {
          id: person._id,
          title: person.name
        })}>
          {person.name}
        </Text>
      </View>
    )
  }

  render() {
    const {people} = this.state
    return (
      <Layout>
        <FlatList
          data={people}
          keyExtractor={getId}
          renderItem={this.renderPerson}
        />
      </Layout>
    )
  }
}
