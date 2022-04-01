import { syncMap, flatArray } from '@src/utils/functional'
import { imgSrcToBase64 } from '@src/utils/parse'
import { COMPONENT_TYPES } from '../types'

const { SECTION, TITLE, TABLE, PARAGRAPH, TEXT, ROW, CELL, IMAGE, BREAK, TEMPLATE } = COMPONENT_TYPES
const TAG_MAP = {
  page: SECTION,
  title: TITLE,
  p: PARAGRAPH,
  table: TABLE,
  row: ROW,
  cell: CELL,
  span: TEXT,
  img: IMAGE,
  br: BREAK,
  template: TEMPLATE,
}

async function componentConfFactory(tagData: { tag: Symbol | string, text?: string, attrs?: StringOrObject, children: ConfigType[] }) {
  let result = {
    type: TAG_MAP[tagData.tag.toString()],
    children: (await syncMap(tagData.children, item => toComponentConf(item))).filter(item => item),
    attrs: tagData.attrs
  }

  switch (TAG_MAP[tagData.tag.toString()]) {
    case IMAGE:
      if (!tagData.attrs || !tagData.attrs.src) { // 无图片资源时，去掉该配置
        result = null
      } else if (tagData.attrs.src) {
        // 图片转base64
        tagData.attrs.src = await imgSrcToBase64((tagData.attrs as { src: string }).src)
      }
      break
    case TEXT:
      delete result.children

      // @ts-ignore
      result.value = tagData.children && tagData.children[0] ? tagData.children[0].text : ''
      break
  }

  return result
}

async function toComponentConf(tagData: { tag: Symbol | string, text?: string, atts?: StringOrObject, children: ConfigType[] }, rootTag?: Symbol) {
  tagData.tag = tagData.tag || ''
  let result = null

  if (typeof rootTag !== 'undefined' && tagData.tag === rootTag) {
    result = {
      type: rootTag,
      // 递归
      children: (await syncMap(tagData.children, item => toComponentConf(item))).filter(item => item)
    }
  } else if (TAG_MAP[tagData.tag.toString()] === TEMPLATE) { // 若为template，则以数组形式返回结果，相当于忽略template
    result = (await syncMap(tagData.children, item => toComponentConf(item))).filter(item => item)
  } else if (TAG_MAP[tagData.tag.toString()]) {
    result = await componentConfFactory(tagData)
  } else if (typeof tagData.text !== 'undefined') {
    result = {
      type: TEXT,
      value: tagData.text,
      attrs: {}
    }
  }

  if (
    Object.prototype.toString.call(result) === '[object Object]' 
    && result.children
  ) { // 将children中元素为数组类型的内容展开
    result.children = flatArray(result.children)
  }

  return result
}

export default toComponentConf
