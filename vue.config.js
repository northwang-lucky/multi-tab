const IS_DEV = process.env.NODE_ENV === 'development'
const CompressionPlugin = require('compression-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const path = require('path')

const options = {
  /**
   * public目录的位置
   * 如果你需要部署到GitHub Pages上，您需要设置为/仓库名/
   * 因为GitHub Pages默认访问https://你的用户名.github.io/项目名/
   */
  publicPath: '/multi-tab/',

  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: IS_DEV,

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,

  css: {
    // 开启css模块化
    requireModuleExtension: true,
    loaderOptions: {
      sass: {
        data: '@import "@/assets/styles/mixin.scss";',
        sourceMap: false
      }
    }
  },

  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',

  // 配置Webpack
  chainWebpack: (config) => {
    /***  开发环境配置 ***/
    if (IS_DEV) {
      // 配置静态依赖
      config.plugin('hard-source-webpack-plugin').use(HardSourceWebpackPlugin)
    }

    /***  生产环境配置 ***/
    if (!IS_DEV) {
      // 配置gzip
      config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
        {
          algorithm: 'gzip',
          test: /\.(js|css)$/,
          threshold: 10240,
          deleteOriginalAssets: false,
          minRatio: 0.8
        }
      ])
    }

    // 设置网站标题
    config.plugin('html').tap((args) => {
      args[0].title = '多页签系统模板'
      return args
    })

    // 映射路径
    config.resolve.alias.set('@', path.resolve('src'))

    // 配置 svg-sprite-loader
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({ configFile: '../svgo.config.js' })
      .end()

    // 配置正常svg
    const normalSvgRule = config.module.rule('normal_svg')
    normalSvgRule
      .test(/\.(svg)(\?.*)?$/)
      .include.add(path.resolve('src/assets/imgs'))
      .end()
      .use('file-loader')
      .loader(path.resolve('node_modules/file-loader/dist/cjs.js'))
      .options({ name: 'static/img/[name].[hash:8].[ext]' })
      .end()
  }
}

module.exports = options
