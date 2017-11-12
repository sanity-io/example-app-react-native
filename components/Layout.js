import React from 'react'
import {Text, View} from 'react-native'
import { withNavigation } from 'react-navigation';

export default withNavigation(class Layout extends React.Component {
  render() {
    const {children, navigation} = this.props
    return (
      <View>
        <View>
          <Text  onPress={() => navigation.navigate('Movies')}>Movies</Text>
          <Text onPress={() => navigation.navigate('People')}>People</Text>
        </View>
        < View>
          {children}
        </View>
      </View>
    )
  }
})
