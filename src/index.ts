import { getClientEnv, includeScript } from './utils/index'
import { PlatformType } from './types/enum'
const WX_SDK_URL = 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'
const ALIPAY_SDK_URL = 'https://appx/web-view.min.js'
export class TJMobBridge {
  // 当前环境
  _platformType: PlatformType = PlatformType.NULL
  // 是否已经完成初始化
  isInit: boolean = false
  /**
   * bridge初始化，自动加载微信或者支付宝SDK，并获取到当前所处的环境
   */
  async init(): Promise<any> {
    if (this.isInit) return Promise.resolve()
    // 获取环境
    this._platformType = getClientEnv()
    return new Promise(async (resolve, reject) => {
      if (this._platformType === PlatformType.WX_ENV) {
        // 微信环境 提前加载微信sdk
        if (!window.wx) {
          await includeScript(WX_SDK_URL)
        }
        if (window.wx && window.wx.miniProgram && window.wx.miniProgram.getEnv) {
          window.wx.miniProgram.getEnv((res: any) => {
            if (res.miniprogram) {
              this._platformType = PlatformType.WX_MP_ENV
            }
            this.isInit = true
            resolve()
          })
        } else {
          this.isInit = true
          resolve()
        }
      } else if (this._platformType === PlatformType.ALI_ENV) {
        // 支付宝环境 提前加载支付宝sdk
        if (!window.my) {
          await includeScript(ALIPAY_SDK_URL)
        }
        // 判断是否运行在小程序环境里
        if (window.my && window.my.getEnv) {
          window.my.getEnv((res: any) => {
            if (res.miniprogram) {
              this._platformType = PlatformType.ALI_MP_ENV
            }
            this.isInit = true
            resolve()
          })
        } else {
          this.isInit = true
          resolve()
        }
      } else {
        this.isInit = true
        resolve()
      }
    })
  }
  // 获取环境变量
  getEnv() {
    return this._platformType
  }
  // 登录
  login() {
    console.log('ts-lib-project login')
  }
  // 唤起app
  callApp() {
    console.log('ts-lib-project callApp')
  }
  // 微信分享
  shareWeixin() {
    console.log('ts-lib-project shareWeixin')
  }
  // 微博分享
  shareWeiBo() {
    console.log('ts-lib-project shareWeiBo')
  }

  // static
  static PlatformType: any = PlatformType
  static _instance: TJMobBridge
  static getInstance(): TJMobBridge {
    if (!TJMobBridge._instance) {
      TJMobBridge._instance = new TJMobBridge()
    }
    return TJMobBridge._instance
  }
}

export default TJMobBridge
