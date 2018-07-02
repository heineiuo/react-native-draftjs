import React from 'react'

export default props => (
  <style>
    {`
a,img,button,input,textarea,div {
  -webkit-tap-highlight-color:rgba(255,255,255,0);
}

.RichEditor-root {
  background: #fff;
  border: 1px solid #ddd;
  font-family: 'Georgia', serif;
  font-size: 14px;
  padding: 15px;
}


.RichEditor-editor {
  /* border-top: 1px solid #ddd; */
  cursor: text;
  font-size: 16px;
  margin-top: 0px;
  /* max-height: 300px; */
  word-break: break-all;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  tap-highlight-color: rgba(0, 0, 0, 0);
}

.RichEditor-editor .public-DraftEditorPlaceholder-root,
.RichEditor-editor .public-DraftEditor-content {
  margin: 0;
  padding: 15px;
}

.RichEditor-editor .public-DraftEditor-content {
  min-height: 100px;
}

.RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
  display: none;
}

.RichEditor-editor .RichEditor-blockquote {
  border-left: 5px solid #eee;
  color: #666;
  font-family: 'Hoefler Text', 'Georgia', serif;
  font-style: italic;
  margin: 16px 0;
  padding: 10px 20px;
}

.RichEditor-editor .public-DraftStyleDefault-pre {
  background-color: rgba(0, 0, 0, 0.05);
  font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
  font-size: 16px;
  padding: 20px;
}

.RichEditor-controls {
  font-family: 'Helvetica', sans-serif;
  font-size: 14px;
  margin-bottom: 5px;
  user-select: none;
}

.RichEditor-styleButton {
  color: #999;
  cursor: pointer;
  margin-right: 16px;
  padding: 2px 0;
  display: inline-block;
}

.RichEditor-activeButton {
  color: #5890ff;
}
  `}
  </style>
)
