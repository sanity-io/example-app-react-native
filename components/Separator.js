import React from 'react'
import {StyleSheet, View} from 'react-native'

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc'
  }
})

export default () => <View style={styles.divider} />
