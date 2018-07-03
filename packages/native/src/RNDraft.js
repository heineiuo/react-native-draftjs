/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import {
  // Button,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  // ScrollView,
  StyleSheet,
  // TextInput,
  View,
  WebView
} from 'react-native'
import uuid from 'uuid/v1'
import isEqual from 'lodash/isEqual'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Toolbar from './RNDraftToolbar'
// import RNDraftHTML from './RNDraftHTML'
import { generateRandomKey } from './RNDraftUtils'

const isIphoneX = (() => {
  let d = Dimensions.get('window')
  const { height, width } = d

  return (
    // This has to be iOS duh
    Platform.OS === 'ios' &&

    // Accounting for the height in either orientation
    (height === 812 || width === 812)
  )
})()

const createRawContentState = () => ({
  blocks: [
    {
      'key': generateRandomKey(),
      'text': '',
      'type': 'unstyled',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}}
  ],
  'entityMap': {}
})

class RNDraft extends React.Component {
  static getDerivedPropsFromState (props, state) {

  }

  static defaultProps = {
    uri: 'http://localhost:8053/packages/cms-rn-editor/'
  }

  state = {
    blockType: 'unstyled',
    currentStyle: [],
    rawContentState: createRawContentState()
  }

  componentDidUpdate (prevProps, prevState) {
    if (!isEqual(this.state.rawContentState, prevState.rawContentState)) {
      this.postMessage('reload', this.state.rawContentState)
    }
  }

  handleToolbarButtonToggle = (e, btn) => {
    console.log(btn)
    if (btn.type === 'BLOCK') {
      this.postMessage('toggleBlockType', { blockType: btn.style })
    } else if (btn.type === 'INLINE') {
      this.postMessage('toggleInlineStyle', { inlineStyle: btn.style })
    }
  }

  handleMessage = (e) => {
    console.log(e.nativeEvent.data)
    let data = null
    try {
      data = JSON.parse(e.nativeEvent.data)
    } catch (e) {
      console.log(e)
    }
    if (!data) return false
    const { type, payload, id } = data
    if (type === 'response') {
      console.log(payload)
      if (!id) {
        return false
      }
    } else if (type === 'ready') {
      console.log('ready')
      this.postMessage('reload', this.state.rawContentState)
    } else if (type === 'selection') {
      const { blockType, currentStyle } = payload
      this.setState({
        blockType,
        currentStyle
      })
      console.log(`[${new Date()}]${blockType}`)
    } else {
      console.log('unknown message')
    }
  }

  postMessage = (type, payload = {}) => {
    console.log(`post message to webview: type is ${type}, payload is ${JSON.stringify(payload)}`)
    this.webview.postMessage(JSON.stringify({
      type, payload, id: uuid()
    }), '*')
  }

  handleLoad = (e) => {
    this.postMessage('isready')
  }

  renderAndroid = ({ webview }) => {
    return (
      <View style={styles.editor}>
        <KeyboardAvoidingView
          enabled
          keyboardVerticalOffset={64 + 44}
          style={{
            display: 'flex',
            flex: 1
          }}
          behavior='height'
        >
          {webview}
          <Toolbar
            onToggle={this.handleToolbarButtonToggle}
            blockType={this.state.blockType}
            currentStyle={this.state.currentStyle}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0
            }}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }

  renderIOS = ({ webview }) => {
    return (
      <SafeAreaView style={styles.editor}>
        {webview}
        <Toolbar
          onToggle={this.handleToolbarButtonToggle}
          blockType={this.state.blockType}
          currentStyle={this.state.currentStyle}
        />
        <KeyboardSpacer topSpacing={isIphoneX ? -34 : 0} />
      </SafeAreaView>
    )
  }

  render () {
    const webview = (
      <WebView
        ref={webview => { this.webview = webview }}
        style={styles.webview}
        onMessage={this.handleMessage}
        onLoad={this.handleLoad}
        source={{
          uri: this.props.uri
        }}
      />
    )
    return Platform.select({
      ios: this.renderIOS({ webview }),
      android: this.renderAndroid({ webview })
    })
  }
}

const styles = StyleSheet.create({
  editor: {
    backgroundColor: '#FAFAFA',
    display: 'flex',
    flex: 1
  },
  webview: {
    flex: 1
  },
  toolbar: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#eee',
    height: 40,
    backgroundColor: '#FAFAFA'
  }
})

export default RNDraft
