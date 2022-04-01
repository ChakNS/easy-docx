import parseTemplate from './parser'
import generateDoc, { toBlob } from './generator'

const compile = async function(template: TempType) {
  // // 解析模板语法，生成json配置
  const parsedData: ConfigType[] = await parseTemplate(template)
  // 生成配置
  const doc = generateDoc(parsedData)
  // 返回blob
  return toBlob(doc)
}

export default compile
