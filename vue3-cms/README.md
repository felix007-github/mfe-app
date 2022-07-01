# vue3 + typescript + element-plus + vue-cli

## Project init
```
yarn install
```

### run start on local development
```
yarn run dev
```

### build production 
```
yarn run build
```
## Dev Tool & plugin

```
Tool:
VS Code

VS Code Plugin:
EditorConfig for VS Code
ESLint
Prettier
Vetur
Vue language Features
```
## 代码风格
```
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
```

## directory structure
```
|-- public                    # static files                                   
|   |-- favicon.ico                
|   |-- index.html            # index
|-- src                                
|   |--assets                 # static resource
|   |--components             # vue components
|   |--views                         
|   |--router                 # router config
|   |--store                  # state management
|   |--App.vue                # 
|   |--main.ts                # 
|-- .eslintrc.js              # ES-lint                  
|-- .gitignore                # git ignore   
|-- babel.config.js           # babel                       
|-- package.json              # Basic Project Information 
|-- shims-vue.d.ts            # Ts identifies the VUE configuration
|-- tsconfig.json             # ts
|-- vue.config.js             # config 
```
## Microfront-end configuration
1. /public/index.html `#us_legislation_amnote`
2. /src/router/index.ts `process.env.VUE_APP_ROUTER_BASE`
3. /.env.development & /.env.production `VUE_APP_ROUTER_BASE`
4. /src/main.ts `mount` & `unmount`