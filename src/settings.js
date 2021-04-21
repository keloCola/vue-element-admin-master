module.exports = {
  title: '小慕书屋',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  // 控制右侧控制面板是否显示
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header 固定头部
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar 是否展示侧边栏logo图标
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  // 错误日志
  errorLog: 'production'
}
