# vue3 + typescript + element-plus + vue-cli

## Project init 下载依赖
```
yarn install
```

### 启动项目
```
yarn run serve
```

### 打包 production 环境
```
yarn run build
```

### 打包测试 tests 环境
```
yarn run test
```

## 代码风格
1、文件夹命名
    英文驼峰命名法，首字母小写
    文件名不得出现下划线与中划线
2、文件命名
    英文驼峰命名法，首字母小写
    vue文件：
        文件名应与页面名字相关
    css以及less文件：
        文件名与被调用的vue页面名称一样
    js文件：
        原则上不增加JS文件，如有需要，请在readme说明
3、组件命名
    英文驼峰命名法，首字母大写

夕阳沉落在海水深处却不见浪花翻滚，淡淡的只留下一个让人沉思的背影。
雨落是晚风中的殇，带着晨曦的翘首滑落最后的伤痕！雨落含羞，淡抹嫣红！
    在最深的绝望里，
    遇见最美的惊喜！

## 目录结构
```
|-- public                    # 静态文件夹                                   
|   |-- favicon.ico                
|   |-- index.html            #入口页面
|-- src                       # 源码目录         
|   |--assets                 # 模块资源
|   |--components             # vue公共组件
|   |--views                         
|   |--router                 # 路由配置
|   |--store                  # 状态管理
|   |--App.vue                # 页面入口文件
|   |--main.ts                # 入口文件，加载公共组件
|-- .eslintrc.js              # ES-lint校验                   
|-- .gitignore                # git忽略上传的文件格式   
|-- babel.config.js           # babel语法编译                        
|-- package.json              # 项目基本信息 
|-- shims-vue.d.ts            # ts识别vue配置
|-- tsconfig.json             # ts配置
|-- vue.config.js             # 配置文件 
```
