# Create-React-App TypeScript 项目初始化配置

使用 create-react-app 初始化 react 项目，并进行常用配置；

- typescript
- less
- css module

## create-react-app 创建 TS 项目

```bash
$ npx create-react-app my-app --template typescript
```

## 导出 webpack 配置

```bash
$ npm run eject
$ # or
$ yarn eject

```

## 安装依赖

```bash
$ npm install less@^3.9.0 less-loader@^5.0.0 -S
$ # or
$ yarn add less@^3.9.0 less-loader@^5.0.0 -S

```

## 配置 less-loader，支持 CSS Module

```jsx
// `config/webpack.config.js`
const lessRegex = /\\.less$/;
const lessModuleRegex = /\\.module\\.less$/;

// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  // ...

  module: {
      // ...
      rules: [
          // ...
          {
              oneOf: [
                  // ...
                  {
                      test: lessRegex,
                      exclude: lessModuleRegex,
                      use: getStyleLoaders(
                        {
                          importLoaders: 2,
                          sourceMap: isEnvProduction && shouldUseSourceMap,
                          modules: {
                            getLocalIdent: getCSSModuleLocalIdent,
                          },
                        },
                        'less-loader'
                      ),
                      sideEffects: true,
                    },
                    {
                      test: lessModuleRegex,
                      exclude: lessModuleRegex,
                      use: getStyleLoaders(
                        {
                          importLoaders: 2,
                          sourceMap: isEnvProduction && shouldUseSourceMap,
                          modules: {
                            getLocalIdent: getCSSModuleLocalIdent,
                          },
                        },
                        'less-loader'
                      ),
                    },
              ]
          }
      ]
  }
}

```

> 这里直接配置 .less 文件支持 css module，而不需要每次都使用 .module.less 为后缀名的文件

在组件内使用方式：

```less
// index.less
.text {
    font-size: 50px;
    color: red;
}

```

```tsx
// inidex.tsx
import React from 'react';
import styles from './index.less';

interface Props {}

const Hello = (props: Props) => {
  return <div className={styles.text}>Hello</div>;
};

export default Hello;

```

## 配置 TypeScript 支持 CSS Module

在 tsx 文件中，引入 .less 文件会报错找不到 module，需要在声明模块，并在 tsconfig.json 中配置

新建文件 `typings/index.d.ts`

```tsx
// typings/index.d.ts
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.svg'

```

在 `tsconfig.json` 新增配置

```json
{
    // ...
    "include": ["src", "typings"],
    "typings": "typings/*"
}

```

## 路径别名

在 `config/webpack.config.js` 中配置 alias

```jsx
// ...
alias: {
    '@': 'src',
}

```

配置 ts 支持

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
  },
}

```