/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default (options) => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
  <meta name="format-detection" content="telephone=no">
  <meta name="HandheldFriendly" content="True">
  <title>Dashboard</title>
</head>
<body>
  <div id="app"></div>
  <script src="${options.url}"></script>
</body>
</html>
`
