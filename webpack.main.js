const path = require('path')

const common = (_ /* env */, argv) => ({
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  devtool: argv.mode === 'production' ? false : 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: [/\.tsx?$/],
        loader: 'ts-loader',
        options: { configFile: path.resolve(__dirname, 'tsconfig.main.json') },
        exclude: /node_modules/
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  }
})

const main = (env, arg) => {
  console.log('Run `main` build ...')
  return Object.assign({}, common(env, arg), {
    entry: {
      electron: './src/main/electron.ts'
    },
    target: 'electron-main'
  })
}

const preload = (env, arg) => {
  console.log('Run `preload` build ...')
  return Object.assign({}, common(env, arg), {
    entry: {
      preload: './src/main/preload.ts'
    },
    target: 'electron-preload'
  })
}

module.exports = [main, preload]
