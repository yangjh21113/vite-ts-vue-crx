async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true }
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

chrome.runtime.onInstalled.addListener(() => {
  // chrome.contextMenus.create({
  //   id: 'startRecord',
  //   title: '开始录屏',
  //   contexts: ['all']
  // })

  chrome.commands.onCommand.addListener(async command => {
    await startRecord()
  })
})
let url = ''
chrome.runtime.onMessage.addListener(async message => {
  console.log('接受消息', message)
  if (message.type === 'open-pannel') {
    const tab = await getCurrentTab()
    url = message.url
    console.log(tab, url)
  }
})
chrome.action.onClicked.addListener(async tab => {
  console.log('发送消息', url, tab)
  await chrome.sidePanel.open({
    tabId: tab.id
  })
  await chrome.runtime.sendMessage({
    type: 'display',
    url: url
  })
  console.log('发送完消息')
})
const startRecord = async () => {
  const existingContexts = await chrome.runtime.getContexts({})
  let recording = false

  const offscreenDocument = existingContexts.find(c => c.contextType === 'OFFSCREEN_DOCUMENT')
  console.log(1111, offscreenDocument)
  // If an offscreen document is not already open, create one.
  if (!offscreenDocument) {
    // Create an offscreen document.
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['USER_MEDIA'],
      justification: 'Recording from chrome.tabCapture API'
    })
  } else {
    recording = offscreenDocument.documentUrl.endsWith('#recording')
  }

  if (recording) {
    chrome.runtime.sendMessage({
      type: 'stop-recording',
      target: 'offscreen'
    })
    chrome.action.setIcon({ path: 'icons/not-recording.png' })
    return
  }

  const activeTab = await getCurrentTab()
  console.log('activeTab', activeTab)

  // Get a MediaStream for the active tab.
  const streamId = await chrome.tabCapture.getMediaStreamId({
    targetTabId: activeTab.id
  })

  // Send the stream ID to the offscreen document to start recording.
  chrome.runtime.sendMessage({
    type: 'start-recording',
    target: 'offscreen',
    data: streamId
  })

  chrome.action.setIcon({ path: '/icons/recording.png' })
}
