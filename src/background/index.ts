/* global chrome */
import { apiRequest } from '@/api/index'
// manifest.json的Permissions配置需添加declarativeContent权限
chrome.runtime.onInstalled.addListener(function () {
  console.log('runtime onInstalled')
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: '打开侧边栏',
    contexts: ['all']
  })

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'openSidePanel') {
      // This will open the panel in all the pages on the current window.
      chrome.sidePanel.open({ windowId: tab.windowId })
    }
  })
  chrome.action.onClicked.addListener(tab => {
    console.log('点击icon', tab)
    chrome.sidePanel.setPanelBehavior({
      openPanelOnActionClick: true
    })
  })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // 接收来自content script的消息，requset里不允许传递function和file类型的参数
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const { contentRequest } = request
    // 接收来自content的api请求
    if (contentRequest === 'apiRequest') {
      const { config } = request
      // API请求成功的回调
      config.success = data => {
        data.result = 'succ'
        sendResponse(data)
      }
      // API请求失败的回调
      config.fail = msg => {
        sendResponse({
          result: 'fail',
          msg
        })
      }
      // 发起请求
      apiRequest(config)
    }
  })
  return true
})

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return
})
