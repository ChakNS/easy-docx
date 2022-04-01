import exportFile from './exportFile'

class Export {
  constructor(private blob) {
    this.blob = blob
  }

  export(fileName, immediate) {
    immediate && exportFile(this.blob, fileName)

    return Promise.resolve([
      this.blob, 
      (blob, newFileName) => exportFile(blob, newFileName || fileName)
    ])
  }
}

export default Export
