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

class RNDraftToolbar extends React.Component {
  static defaultProps = {
    style: {}
  }
  render () {
    return (
      <View style={[styles.toolbar, this.props.style]} >
        <ScrollView
          horizontal
        >
          <TouchableOpacity style={styles.button}>
            <Icons.Bold />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icons.Italic />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icons.Underlined />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icons.Header />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icons.QuoteOpen />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icons.ListBulleted />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icons.ListNumbered />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icons.Code />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icons.Image />
          </TouchableOpacity>
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
