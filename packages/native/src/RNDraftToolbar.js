/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import * as Icons from './RNDraftIcons'

const buttons = [
  {
    type: 'INLINE',
    style: 'BOLD',
    Icon: Icons.Bold
  },
  {
    type: 'INLINE',
    style: 'ITALIC',
    Icon: Icons.Italic
  },
  {
    type: 'INLINE',
    style: 'UNDERLINE',
    Icon: Icons.Underlined
  },
  {
    type: 'BLOCK',
    style: 'header-three',
    Icon: Icons.Header
  },
  {
    type: 'BLOCK',
    style: 'blockquote',
    Icon: Icons.QuoteOpen
  },
  {
    type: 'BLOCK',
    style: 'unordered-list-item',
    Icon: Icons.ListBulleted
  },
  {
    type: 'BLOCK',
    style: 'ordered-list-item',
    Icon: Icons.ListNumbered
  },
  {
    type: 'BLOCK',
    style: 'code-block',
    Icon: Icons.Code
  },
  {
    type: 'BLOCK',
    style: 'IMAGE',
    Icon: Icons.Image
  }
]

class RNDraftToolbar extends React.Component {
  static defaultProps = {
    style: {},
    buttons: buttons
  }
  render () {
    const { currentStyle, blockType } = this.props
    console.log(`typeof currentStyle is ${typeof currentStyle}`)
    console.log(`currentStyle is ${JSON.stringify(currentStyle)}`)
    console.log([].includes)
    return (
      <View style={[styles.toolbar, this.props.style]} >
        <ScrollView
          horizontal
        >
          {this.props.buttons.map(btn => {
            const { Icon } = btn
            const isActive = btn.type === 'BLOCK'
              ? blockType === btn.style
              : currentStyle.includes(btn.style)
            return (
              <TouchableOpacity
                key={btn.style}
                onPress={(e) => this.props.onToggle(e, btn)}
                style={styles.button}
              >
                <Icon
                  size={30}
                  color={isActive ? '#88F' : '#333'}
                />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  toolbar: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#eee',
    height: 40,
    backgroundColor: '#FAFAFA',
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    // backgroundColor: '#ccc',
    width: 32,
    height: 32
  }
})

export default RNDraftToolbar
