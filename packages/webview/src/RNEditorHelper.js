/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  List,
  Map
} from 'immutable'

import {
  EditorState,
  genKey,
  ContentBlock,
  Modifier,
  BlockMapBuilder,
  CharacterMetadata,
  ContentState
} from 'draft-js'

/*
Some of the constants which are used throughout this project instead of
directly using string.
*/

export const Block = {
  UNSTYLED: 'unstyled',
  PARAGRAPH: 'unstyled',
  OL: 'ordered-list-item',
  UL: 'unordered-list-item',
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  H5: 'header-five',
  H6: 'header-six',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  ATOMIC: 'atomic',
  BLOCKQUOTE_CAPTION: 'block-quote-caption',
  CAPTION: 'caption',
  TODO: 'todo',
  IMAGE: 'atomic:image',
  BREAK: 'atomic:break'
}

export const Inline = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE',
  HIGHLIGHT: 'HIGHLIGHT'
}

export const Entity = {
  LINK: 'LINK'
}

export const HYPERLINK = 'hyperlink'
export const HANDLED = 'handled'
export const NOT_HANDLED = 'not_handled'

export const KEY_COMMANDS = {
  addNewBlock: () => 'add-new-block',
  changeType: (type = '') => `changetype:${type}`,
  showLinkInput: () => 'showlinkinput',
  unlink: () => 'unlink',
  toggleInline: (type = '') => `toggleinline:${type}`,
  deleteBlock: () => 'delete-block'
}

/*
Returns default block-level metadata for various block type. Empty object otherwise.
*/
export const getDefaultBlockData = (blockType, initialData = {}) => {
  switch (blockType) {
    case Block.TODO: return { checked: false }
    default: return initialData
  }
}

/*
Get currentBlock in the editorState.
*/
export const getCurrentBlock = (editorState) => {
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  const block = contentState.getBlockForKey(selectionState.getStartKey())
  return block
}

/*
Replaces an empty block at the current cursor position
of the given `newType`.
*/
export const replaceEmptyBlock = (editorState, newType = Block.UNSTYLED, initialData = {}) => {
  const selectionState = editorState.getSelection()
  if (!selectionState.isCollapsed()) {
    console.log('skip because selection state is collapsed')
    return editorState
  }
  const contentState = editorState.getCurrentContent()
  const key = selectionState.getStartKey()
  const blockMap = contentState.getBlockMap()
  const currentBlock = getCurrentBlock(editorState)
  if (!currentBlock) {
    console.log('skip because no current block')
    return editorState
  }
  if (currentBlock.getLength() === 0) {
    if (currentBlock.getType() === newType) { // why ?
      console.log('skip because current block type is the same')
      return editorState
    }
    const newBlock = currentBlock.merge({
      type: newType,
      data: getDefaultBlockData(newType, initialData)
    })
    const newContentState = contentState.merge({
      blockMap: blockMap.set(key, newBlock),
      selectionAfter: selectionState
    })
    return EditorState.push(editorState, newContentState, 'change-block-type')
  }
  return editorState
}

/**
 * @addNewBlock
 * @param {*} editorState
 * @param {*} newType
 * @param {*} data
 */
export const addNewBlock = (editorState, newType, data) => {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()

  const afterRemoval = Modifier.removeRange(
    contentState,
    selectionState,
    'backward'
  )

  const targetSelection = afterRemoval.getSelectionAfter()
  const afterSplit = Modifier.splitBlock(afterRemoval, targetSelection)
  const insertionTarget = afterSplit.getSelectionAfter()

  const asAtomicBlock = Modifier.setBlockType(
    afterSplit,
    insertionTarget,
    Block.IMAGE
  )

  const block = new ContentBlock({
    key: genKey(),
    type: Block.IMAGE,
    text: '',
    characterList: List(),
    data: new Map(data)
  })

  const fragmentArray = [
    block,
    new ContentBlock({
      key: genKey(),
      type: Block.IMAGE,
      text: '',
      characterList: List()
    })
  ]

  const fragment = BlockMapBuilder.createFromArray(fragmentArray)

  const withAtomicBlock = Modifier.replaceWithFragment(
    asAtomicBlock,
    insertionTarget,
    fragment
  )

  const newContent = withAtomicBlock.merge({
    selectionBefore: selectionState,
    selectionAfter: withAtomicBlock.getSelectionAfter().set('hasFocus', true)
  })

  return EditorState.push(editorState, newContent, 'insert-fragment')
}

/**
 * @param data.src image url
 */
export const deprecated__insertImage = (editorState, data) => { // eslint-disable-line
  // const selection = editorState.getSelection()
  const contentState = editorState.getCurrentContent()

  const entityKey = contentState
    .createEntity('IMAGE', 'IMMUTABLE', data)
    .getLastCreatedEntityKey()

  let characterList = List([])
  characterList = characterList.insert(0, CharacterMetadata.create({
    entity: entityKey
  }))
  const newBlock = new ContentBlock({
    key: genKey(),
    type: 'IMAGE',
    text: ' ',
    characterList
  })
  const newBlockMap = contentState.getBlockMap().set(newBlock.key, newBlock)
  const nextContentState = ContentState.createFromBlockArray(newBlockMap.toArray())
    .set('selectionBefore', contentState.getSelectionBefore())
    .set('selectionAfter', contentState.getSelectionAfter())

  // console.log(convertToRaw(nextContentState))
  return EditorState.push(
    editorState,
    nextContentState
  )
}
