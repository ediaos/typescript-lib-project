import TJMobBridge from '../src'
const tjMobBridge = new TJMobBridge()
/**
 * Dummy test
 */
describe('TJMobBridge test', async () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('TJMobBridge.getInstance is TJMobBridge', () => {
    expect(TJMobBridge.getInstance()).toBeInstanceOf(TJMobBridge)
  })

  it('TJMobBridge can be init', async () => {
    window.wx = {}
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'micromessenger test',
      configurable: true
    })
    await tjMobBridge.init()
    expect(tjMobBridge.getEnv()).toBe(3)
  })
})
