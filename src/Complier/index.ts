import compile from './compile'

class Complier {
  constructor(private template: TempType) {}

  compile() {
    return compile(this.template)
  }
}

export default Complier
