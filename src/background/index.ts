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
