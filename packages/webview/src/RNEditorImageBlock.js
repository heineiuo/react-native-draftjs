/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types'
import React from 'react'
import { EditorBlock, EditorState, SelectionState } from 'draft-js'
import { getCurrentBlock } from './RNEditorHelper'

class ImageBlock extends React.Component {
  static propTypes = {
    block: PropTypes.object,
    blockProps: PropTypes.object
  }

  getUrlFromId = (id) => {
    return this.props.getUrlFromId(id)
  }

  focusBlock = () => {
    const { block, blockProps } = this.props
    const { getEditorState, setEditorState } = blockProps
    const key = block.getKey()
    const editorState = getEditorState()
    const currentblock = getCurrentBlock(editorState)
    if (currentblock.getKey() === key) {
      return
    }
    const newSelection = new SelectionState({
      anchorKey: key,
      focusKey: key,
      anchorOffset: 0,
      focusOffset: 0
    })
    setEditorState(EditorState.forceSelection(editorState, newSelection))
  }

  render () {
    const { block } = this.props
    const data = block.getData()
    const fileId = data.get('fileId')
    if (fileId) {
      const src = this.getUrlFromId(fileId)
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            onClick={this.focusBlock}
          >
            <img role='presentation' src={src} style={{maxWidth: '100%'}} />
          </div>
          <figcaption>
            <EditorBlock {...this.props} />
          </figcaption>
        </div>
      )
    }
    return <EditorBlock {...this.props} />
  }
}

/**
 * @deprecated
 * @param {*} props
 */
const ImageBlock2 = props => { // eslint-disable-line
  // console.log(props)
  const { block, contentState } = props
  // const { foo } = props.blockProps
  // console.log(block)
  // console.log(block.getEntityAt(0))
  // console.log( contentState.getEntity(block.getEntityAt(0)))
  // const data = contentState.getEntity(block.getEntityAt(0)).getData()
  const data = contentState.getEntity(block.getEntityAt(0)).getData()
  // console.log(data)
  return (
    <div>
      <img
        onClick={e => console.log(block)}
        src={data.src}
        alt=''
        style={{ width: '99%' }}
      />
      <span>{data.text}</span>
    </div>
  )
}

export default ImageBlock
