import { App } from 'vue'

const directiveFiles = require.context('.', true, /\.ts$/)
const directives = directiveFiles
  .keys()
  .filter((key) => key !== './index.ts')
  .map((key) => directiveFiles(key).default)

const directive = {
  install: (app: App<Element>) => {
    directives.forEach((directive) => directive(app))
  }
}

export default directive
