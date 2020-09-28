---
title: Learn front-end engineering from vuepress source code
date: 2020-3-18 11:06 AM
tags:
  - node
  - webpack
categories:
  - frontend
comments: true
thumbnail: '/thumbnails/vuepress.jpg'
---

when we execute _yarn build_, we can see a lots of thing have been done automaticly, let's check the source code step-by-step, see what is going on...
<!-- more -->

```js
wait Extracting site metadata...
tip Apply local theme at /home/paul.xiao/Workspace/lab/paul-xiao.github.io/.vuepress/theme...
warning An error was encountered in theme "/home/paul.xiao/Workspace/lab/paul-xiao.github.io/.vuepress/theme"
tip Apply theme local ...
tip Apply plugin container (i.e. "vuepress-plugin-container") ...
tip Apply plugin @vuepress/register-components (i.e. "@vuepress/plugin-register-components") ...
tip Apply plugin @vuepress/last-updated (i.e. "@vuepress/plugin-last-updated") ...
tip Apply plugin @vuepress/nprogress (i.e. "@vuepress/plugin-nprogress") ...
tip Apply plugin @vuepress/back-to-top (i.e. "@vuepress/plugin-back-to-top") ...
tip Apply plugin @vuepress/medium-zoom (i.e. "@vuepress/plugin-medium-zoom") ...
tip Apply plugin @vuepress/blog (i.e. "@vuepress/plugin-blog") ...
warning Override existing page /.

✔ Client
  Compiled successfully in 21.97s

✔ Server
  Compiled successfully in 11.91s

wait Rendering static HTML...
success Generated static files in .vuepress/dist.
```



#### deep dive **yarn build**

1. init: wait Extracting site metadata...

```js
/**
 * path: @vuepress/core/lib/index.js
 * jobs: init createApp/build/dev methods
 */

async function build(options) {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = "production";
  }
  const app = createApp(options);
  await app.process(); // prepare the context of the current app. which contains loading pages and plugins, apply plugins, etc.
  return app.build(); //build start
}

function createApp(options) {
  logger.wait("Extracting site metadata...");
  return new App(options);
}
```

2. apply theme and plugins: tip Apply...

```js
/**
 * path: @vuepress/core/lib/node/App.js
 * jobs: Expose VuePressApp.
 */

   async process () {
    await this.resolveConfigAndInitialize()
    this.normalizeHeadTagUrls()
    this.themeAPI = loadTheme(this) // logger.tip(`Apply local theme at ${chalk.gray(path)}...`)

    this.resolveTemplates()
    this.resolveGlobalLayout()

    this.applyInternalPlugins()
    this.applyUserPlugins()
    this.pluginAPI.initialize()

    this.markdown = createMarkdown(this)

    await this.resolvePages()

    await this.pluginAPI.applyAsyncOption('additionalPages', this)
    await Promise.all(
      this.pluginAPI.getOption('additionalPages').appliedValues.map(async (options) => {
        await this.addPage(options) // logger.warn(`Override existing page ${chalk.yellow(page.path)}.`)
      })
    )
    await this.pluginAPI.applyAsyncOption('ready')
    await Promise.all([
      this.pluginAPI.applyAsyncOption('clientDynamicModules', this),
      this.pluginAPI.applyAsyncOption('enhanceAppFiles', this),
      this.pluginAPI.applyAsyncOption('globalUIComponents', this)
    ])
  }
```
3. apply webpack configs: ✔ Client ...

```js
/**
 * path: @vuepress/core/lib/node/build/index.js
 * jobs: Prepare webpack config under build.
 */
prepareWebpackConfig () {
    this.clientConfig = createClientConfig(this.context).toConfig()
    this.serverConfig = createServerConfig(this.context).toConfig()

    const userConfig = this.context.siteConfig.configureWebpack
    if (userConfig) {
      this.clientConfig = applyUserWebpackConfig(userConfig, this.clientConfig, false)
      this.serverConfig = applyUserWebpackConfig(userConfig, this.serverConfig, true)
    }
  }  

// progress bar
if (!env.isDebug) {
    const WebpackBar = require('webpackbar') // Elegant ProgressBar and Profiler for Webpack
    config
      .plugin('bar')
      .use(WebpackBar, [{
        name: 'Client',
        color: '#41b883',
        compiledIn: false
      }])
  }

// figures : Unicode symbols with Windows CMD fallbacks

import { bullet, tick, cross, pointerSmall, radioOff } from 'figures'

```

4. build: wait Rendering static HTML...

```js
/**
 * path: @vuepress/core/lib/node/App.js
 * jobs: Launch a build process with current app context
 */
async build () {
    this.buildProcess = new BuildProcess(this)
    await this.buildProcess.process()
    await this.buildProcess.render() 
    // render page : logger.wait('Rendering static HTML...') 
    // DONE :  logger.success(`Generated static files in ${chalk.cyan(relativeDir)}.`)


    return this
  }

```
#### add self-define image-compress tool
