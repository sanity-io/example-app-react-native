import React from 'react'
import {StyleSheet, Text} from 'react-native'

const styles = StyleSheet.create({
  heading1: {
    fontWeight: 'bold',
    fontSize: 24
  },

  heading2: {
    fontWeight: 'bold',
    fontSize: 20
  }
})

export default props => {
  const {children, level} = props
  const style = styles[`heading${level || 1}`]
  return <Text style={style}>{children}</Text>
}
