import TJMobBridge from '..'

console.log('1See this in your browser console: Typescript Webpack Starter Launched')

async function init() {
  const tjMobBridge = TJMobBridge.getInstance()
  await tjMobBridge.init()
  tjMobBridge.login()
}

init()
