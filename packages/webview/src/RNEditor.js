/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react'
import {
  convertFromRaw, convertToRaw,
  DefaultDraftBlockRenderMap,
  Editor, EditorState, RichUtils
} from 'draft-js'
import Immutable from 'immutable'
import 'draft-js/dist/Draft.css'
import isEqual from 'lodash/isEqual'
import RichEditorStyle from './RNEditorStyle'
import { Block } from './RNEditorHelper'
import ImageBlock from './RNEditorImageBlock'

class RichEditor extends Component {
  static defaultProps = {
    rawState: null,
    withTitleInput: true,
    customBlocks: [],
    onTitleChange: () => { },
    onBlurWithStateChange: () => { }
  }

  /**
   * @param rawState {object} rawState
   */
  static createEditorState = (rawState) => {
    const editorState = rawState
      ? EditorState.createWithContent(convertFromRaw(rawState))
      : EditorState.createEmpty()
    return editorState
  }

  static getRawContent = (editorState) => {
    return convertToRaw(editorState.getCurrentContent())
  }

  state = {
    isLoading: true,
    msg: [],
    editorState: EditorState.createEmpty()
  }

  componentDidCatch (e) {
    this.setState({
      error: e
    })
  }

  componentDidMount () {
    document.addEventListener('message', this.handleMessage)
  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {
    document.removeEventListener('message', this.handleMessage)
  }

  postMessage = (type, payload = {}, id) => {
    window.postMessage(JSON.stringify({
      type,
      payload,
      id
    }), '*')
  }

  focus = () => this.refs.editor.focus()

  handleMessage = (e) => {
    let data = null
    try {
      data = JSON.parse(e.data)
    } catch (e) { }
    if (!data) return false
    const { type, payload, id } = data
    // const msg = this.state.msg.concat({
    //   type, payload, id
    // })
    let isLoading = this.state.isLoading
    let editorState = this.state.editorState
    if (type === 'isready') {
      this.postMessage('ready')
    } else if (type === 'reload') {
      editorState = EditorState.createWithContent(convertFromRaw(payload))
      isLoading = false
    } else if (type === 'toggleBlockType') {
      editorState = this.toggleBlockType(payload.blockType)
    } else if (type === 'toggleInlineStyle') {
      editorState = this.toggleInlineStyle(payload.inlineStyle)
    } else if (type === 'getRawContentState') {
      this.postMessage('response', convertToRaw(this.state.editorState.getCurrentContent()), id)
    }

    this.setState({
      isLoading,
      editorState
      // msg
    })
  }

  toggleBlockType = (blockType) => {
    return RichUtils.toggleBlockType(
      this.state.editorState,
      blockType
    )
  }

  toggleInlineStyle = (inlineStyle) => {
    return RichUtils.toggleInlineStyle(
      this.state.editorState,
      inlineStyle
    )
  }

  handleChange = (editorState) => {
    const prevSelection = this.state.editorState.getSelection()
    const selection = editorState.getSelection()
    if (!isEqual(prevSelection, selection)) {
      const currentStyle = editorState.getCurrentInlineStyle()
      const selection = editorState.getSelection()
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()

      this.postMessage('selection', {
        currentStyle,
        blockType
      })
    }
    this.setState({
      editorState
    })
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.handleChange(newState)
      return true
    }
    return false
  }

  handleTab = (e) => {
    const maxDepth = 4
    this.handleChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
  }

  handleBlur = (e) => {
    // this.props.onBlurWithStateChange(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote'
      default: return null
    }
  }

  getEditorState = () => this.state.editorState
  setEditorState = (editorState) => {
  }

  getUrlFromId = (id) => {
    return id
  }

  blockRendererFn = (contentBlock) => {
    const { getEditorState, setEditorState } = this
    const commonProps = {
      getEditorState,
      setEditorState,
      getUrlFromId: this.getUrlFromId
    }
    const type = contentBlock.getType()
    // console.log(`blockRendererFn: type is ${type}`)
    // const ImageBlock = this.renderImageBlock

    if (type === Block.IMAGE) {
      return {
        component: ImageBlock,
        editable: true,
        props: {
          ...commonProps
        }
      }
    }
    return null
  }

  extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(Immutable.Map({
    [Block.IMAGE]: {
      element: 'div'
    },
    IMAGE: {
      element: 'div'
    }
  }))

  render () {
    const { editorState, error } = this.state

    if (error) {
      return (
        <React.Fragment>
          <div>{error.message}</div>
          <div>{error.stack}</div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <RichEditorStyle />
        {this.state.isLoading ? null
          : <Editor
            blockRendererFn={this.blockRendererFn}
            blockRenderMap={this.extendedBlockRenderMap}
            blockStyleFn={this.getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onTab={this.handleTab}
            placeholder='添加描述'
            ref='editor'
          />
        }
      </React.Fragment>
    )
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
}

export default RichEditor
