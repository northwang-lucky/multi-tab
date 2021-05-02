# 目录结构

```yaml
├── public                                 # 静态资源 (不参与打包)
|  ├── imgs                                # 位图图片资源
|  ├── loading                             # 开屏动画资源
|  ├── theme                               # 主题资源 
|  ├── favicon.ico                         # 网站图标
|  └── index.html                          # HTML模板文件
├── src                                    # 源代码
|  ├── assets                              # 静态资源 (参与打包)
|  |  ├── icons                            # 图标资源
|  |  |  ├── svg                           # 所有svg图标
|  |  |  ├── index.ts                      # svg图标自动引入文件
|  |  |  └── svgo.config.js                # svgo配置文件
|  |  └── styles                           # sass样式资源
|  |     ├── animation.scss                # 全局动画
|  |     ├── element-reset.scss            # element样式重置
|  |     ├── index.scss                    # 入口文件
|  |     ├── mixin.scss                    # 全局样式混入
|  |     ├── reset.scss                    # 浏览器默认样式重置
|  |     ├── transition.scss               # 全局过度动画
|  |     └── variables.scss                # 全局sass变量
|  ├── components                          # 全局公共组件
|  |  └── common                           # 原子组件
|  |  |  ├── Contextmenu                   # 右键菜单组件
|  |  |  └── SvgIcon                       # svg图标组件
|  |  └── entity                           # 业务组件
|  ├── consts                              # 全局常量
|  ├── directive                           # 全局指令
|  ├── layout                              # 主布局组件
|  |  └── components
|  |     ├── AppMain                       # 子级路由载体
|  |     ├── AsideBar                      # 侧边栏组件
|  |     |  └── components
|  |     |     ├── MenuItem                # 菜单项组件
|  |     |     ├── ModuleMenu              # 菜单组件
|  |     |     └── SystemLogo              # 侧栏头部组件
|  |     ├── HeaderToolbar                 # 头部工具栏组件
|  |     |  └── components
|  |     |     ├── PathBreadcrumb          # 面包屑组件
|  |     |     ├── TagsPager               # 标签栏翻页组件
|  |     |     └── TagsView                # 标签栏组件
|  |     └── SettingPane                   # 系统设置面板组件
|  ├── plugins                             # 全局插件
|  |  ├── element-plus                     # element-plus引入
|  |  ├── first-loading                    # 开屏动画引入
|  |  ├── global-common                    # 全局组建引入
|  |  ├── clipboard                        # clipboard
|  |  └── n-progress                       # nProgress引入
|  ├── router                              # 路由
|  |  ├── modules                          # 路由模块
|  |  ├── index.ts                         # 路由入口文件
|  |  └── routes.ts                        # 路由配置文件
|  ├── store                               # 全局状态管理
|  |  ├── modules                          # 状态管理模块
|  |  └── index.ts                         # 入口文件
|  ├── typings                             # 全局ts类型声明
|  ├── utils                               # 工具类
|  |  ├── index.ts                         # 入口文件
|  |  └── storage.ts                       # 缓存封装
|  ├── views                               # 所有业务页面
|  ├── App.vue                             # 页面入口文件
|  ├── main.ts                             # 主入口文件
|  ├── setting.ts                          # 系统配置
|  └── shims-vue.d.ts                      # 单页面组件ts声明文件
├── .eslintrc.js                           # eslint配置
├── .prettierrc                            # prettier配置
├── package.json                           # npm包管理
├── tsconfig.json                          # typescript配置
└── vue.config.js                          # vue-cli配置
```