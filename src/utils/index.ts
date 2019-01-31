import { PlatformType } from '../types/enum';
/**
 * 获取客户端类型，app,wx,alipay,browser
 */
export function getClientEnv(): PlatformType {
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf('tujia') >= 0) {
    return PlatformType.ALI_ENV;
  } else if (ua.indexOf('micromessenger') >= 0) {
    return PlatformType.WX_ENV;
  } else if (ua.indexOf('alipay') >= 0) {
    return PlatformType.ALI_ENV;
  } else {
    return PlatformType.BROWSER_ENV;
  }
}

/**
 * 动态加载
 * @param {string} url 文件路径
 */
export function includeScript(url: string): Promise<any> {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.defer = true;
    document.head.appendChild(script);
    script.onload = function() {
      resolve();
    };
    script.onerror = function() {
      reject();
    };
  });
}
