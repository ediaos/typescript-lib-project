export class MobBridge {
  getTestNumber() {
    return 1
  }

  // static
  static _instance: MobBridge
  static getInstance(): MobBridge {
    if (!MobBridge._instance) {
      MobBridge._instance = new MobBridge()
    }
    return MobBridge._instance
  }
}

export default MobBridge
