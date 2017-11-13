import React from 'react'
import {Text, View, StyleSheet, StatusBar, TouchableHighlight} from 'react-native'
import {withNavigation} from 'react-navigation'

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
    backgroundColor: '#333',
    height: 50
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10
  },

  text: {
    fontSize: 18,
    color: '#fff'
  },

  touchable: {
    flexBasis: 1,
    flexGrow: 1
  }
})

export default withNavigation(
  class Layout extends React.Component {
    navigate = {
      toMovies: () => this.props.navigation.navigate('Movies'),
      toPeople: () => this.props.navigation.navigate('People')
    }

    render() {
      const {children} = this.props
      return (
        <View>
          <View style={styles.navigation}>
            <TouchableHighlight style={styles.touchable} onPress={this.navigate.toMovies}>
              <View style={styles.navItem}>
                <Text style={styles.text}>Movies</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.touchable} onPress={this.navigate.toPeople}>
              <View style={styles.navItem}>
                <Text style={styles.text}>People</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View>{children}</View>
        </View>
      )
    }
  }
)
