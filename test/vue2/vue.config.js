const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const easyDocxPath = path.join(__dirname, '..', '..', 'dist')
    config.resolve.alias.set('@easyDocx', easyDocxPath)
  }
}
