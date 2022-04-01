import Complier from './Complier'
import Export from './Export'

const getExportOption = function(option: OptionType) {
  if (typeof option === 'string') {
    option = { fileName: option }
  }

  option = Object.assign({
    immediate: true, // 是否立即下载
    fileName: ''
  }, option || {})

  return option
}

/**
 * @param template 模板 支持html字符串 和 jsx 
 * @param option OptionType
*/

const EasyDocx = async function(template: TempType, option?: OptionType) {
  option = getExportOption(option)
  const { immediate, fileName } = option

  // 编译成docx配置
  const complier = new Complier(template)
  const blob = await complier.compile()
  // 导出
  const packer = new Export(blob)

  return packer.export(fileName, immediate)
}

export { Complier, Export }
export default EasyDocx
