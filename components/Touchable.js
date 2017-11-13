import React from 'react'
import {TouchableNativeFeedback, TouchableHighlight, Platform} from 'react-native'

const Ripple = TouchableNativeFeedback.Ripple
const canRipple = Platform.OS === 'android' && TouchableNativeFeedback.canUseNativeForeground()

export default (canRipple ? TouchableNativeFeedback : TouchableHighlight)
