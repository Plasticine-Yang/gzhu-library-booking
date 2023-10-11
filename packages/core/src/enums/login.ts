/** 登录发生异常的阶段 */
export enum LoginErrorPhase {
  Unknown = 'Unknown',
  Launch = 'Launch',
  NewPage = 'NewPage',
  Goto = 'Goto',
  WaitForNavigation = 'WaitForNavigation',
  TypeUsername = 'TypeUsername',
  TypePassword = 'TypePassword',
  ClickLoginButton = 'ClickLoginButton',
  GetCookies = 'GetCookies',
  GetLoginSuccessCookieValue = 'GetLoginSuccessCookieValue',
}
