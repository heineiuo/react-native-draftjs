/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import * as Svg from 'react-native-svg'

// @see https://oblador.github.io/react-native-vector-icons/
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
// import Foundation from 'react-native-vector-icons/Foundation'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

export const Bold = (props) => (
  <MaterialIcons
    color={props.color || '#333'}
    name='format-bold'
    size={props.size || 30}
  />
)
export const Italic = (props) => (
  <MaterialIcons
    color={props.color || '#333'}
    name='format-italic'
    size={props.size || 30}
  />
)
export const Underlined = (props) => (
  <MaterialIcons
    color={props.color || '#333'}
    name='format-underlined'
    size={(props.size || 30) - 2}
  />
)

export const QuoteOpen = (props) => (
  <MaterialCommunityIcons
    color={props.color || '#333'}
    name='format-quote-open'
    size={(props.size || 30) + 2}
  />
)

export const ListBulleted = (props) => (
  <MaterialIcons
    color={props.color || '#333'}
    name='format-list-bulleted'
    size={(props.size || 30)}
  />
)
export const ListNumbered = (props) => (
  <MaterialIcons
    color={props.color || '#333'}
    name='format-list-numbered'
    size={(props.size || 30)}
  />
)
export const Code = (props) => (
  <MaterialCommunityIcons
    color={props.color || '#333'}
    name='code-tags'
    size={(props.size || 30)}
  />
)

export const Image = (props) => (
  <Feather
    color={props.color || '#333'}
    name='image'
    size={(props.size || 30) - 2}
  />
)

export const Header = (props) => {
  const size = (props.size || 30) - 6
  return (
    <Svg.Svg viewBox='0 0 1024 1024' width={size} height={size}>
      <Svg.Path
        fill={props.color || '#333'}
        d='M768 102.4v358.4H307.2V102.4H204.8v819.2h102.4v-358.4h460.8v358.4h102.4V102.4z'
      />
    </Svg.Svg>
  )
}
