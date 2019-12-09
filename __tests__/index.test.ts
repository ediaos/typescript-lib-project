import MobBridge from '../src'
/**
 * Dummy test
 */
describe('MobBridge test', () => {
  it('works if true is truthy', () => {
    expect(MobBridge.getInstance()).toBeTruthy()
  })
  it('works if getNumbers', () => {
    expect(MobBridge.getInstance().getTestNumber()).toEqual(1)
  })
})
