import React from 'react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import {List, ListItem} from '../components/List'
import {Text, View} from 'react-native'

const query = `*[_type == "person"] {
  _id,
  name,
  "imageUrl": image.asset->url
}[0...50]
`

export default class People extends React.Component {
  static navigationOptions = {
    title: 'People'
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
      <ListItem
        imageUrl={person.imageUrl}
        heading={person.name}
        onPress={() =>
          navigate('Person', {
            id: person._id,
            title: person.title
          })
        }
      />
    )
  }

  render() {
    const {people} = this.state
    return (
      <Layout>
        <List data={people} renderItem={this.renderPerson} />
      </Layout>
    )
  }
}
