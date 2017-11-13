import React from 'react'
import {FlatList, Image, Text, View, StyleSheet} from 'react-native'
import Touchable from './Touchable'
import Separator from './Separator'

const styles = StyleSheet.create({
  listRow: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  details: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10
  },

  heading: {
    fontWeight: 'bold',
    fontSize: 18
  },

  subText: {
    fontSize: 16
  },

  image: {
    width: 48,
    height: 72
  }
})

const getId = value => value._id

export class List extends React.Component {
  render() {
    const {data, renderItem, keyExtractor} = this.props
    return (
      <FlatList
        ItemSeparatorComponent={Separator}
        data={data}
        keyExtractor={keyExtractor || getId}
        renderItem={renderItem}
      />
    )
  }
}

export class ListItem extends React.Component {
  render() {
    const {onPress, heading, subText, imageUrl} = this.props
    return (
      <Touchable onPress={onPress}>
        <View style={styles.listRow}>
          {imageUrl && <Image source={{uri: `${imageUrl}?h=144`}} style={styles.image} />}

          <View style={styles.details}>
            <Text style={styles.heading}>{heading}</Text>

            {subText && <Text style={styles.subText}>{subText}</Text>}
          </View>
        </View>
      </Touchable>
    )
  }
}
