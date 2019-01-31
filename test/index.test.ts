import TJMobBridge from '../src'
/**
 * Dummy test
 */
describe('TJMobBridge test', async () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('TJMobBridge getInstance is TJMobBridge', () => {
    expect(TJMobBridge.getInstance()).toBeInstanceOf(TJMobBridge)
  })

  it('TJMobBridge can be init', async () => {
    const tjMobBridge = new TJMobBridge()
    await tjMobBridge.init()
    expect(tjMobBridge.isInit).toBeTruthy()
  })

  it('TJMobBridge check wx env', async () => {
    const tjMobBridge = new TJMobBridge()
    window.wx = {}
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'micromessenger test',
      configurable: true
    })
    await tjMobBridge.init()
    expect(tjMobBridge.getEnv()).toBe(3)
  })

  it('TJMobBridge login', async () => {
    const tjMobBridge = new TJMobBridge()
    await tjMobBridge.init()
    tjMobBridge.login()
    expect(tjMobBridge.login()).toBeUndefined()
  })
})
