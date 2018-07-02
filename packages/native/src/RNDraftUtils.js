/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const seenKeys = {}
const MULTIPLIER = Math.pow(2, 24)

export const generateRandomKey = () => {
  let key
  while (key === undefined || seenKeys.hasOwnProperty(key) || !isNaN(+key)) {
    key = Math.floor(Math.random() * MULTIPLIER).toString(32)
  }
  seenKeys[key] = true
  return key
}
