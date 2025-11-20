import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  input: 'src/index.js',
  output: {
    file: 'deepseek.js',
    format: 'esm',
  },
  plugins: [
    {
      name: 'resolve-absolute-paths',
      resolveId(source, importer) {
        // 处理以 / 开头的绝对路径
        if (source.startsWith('/')) {
          return path.resolve(__dirname, source.slice(1))
        }
        return null // 其他情况交给默认处理
      }
    },
  ],
};