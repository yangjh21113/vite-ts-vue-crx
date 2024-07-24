async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true }
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

const startRecord = async tab => {
  const existingContexts = await chrome.runtime.getContexts({})
  let recording = false

  const offscreenDocument = existingContexts.find(c => c.contextType === 'OFFSCREEN_DOCUMENT')

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
    chrome.action.setIcon({ path: 'icons/logo.png' })
    return
  }
  // Get a MediaStream for the active tab.
  const streamId = await chrome.tabCapture.getMediaStreamId({
    targetTabId: tab.id
  })

  // Send the stream ID to the offscreen document to start recording.
  chrome.runtime.sendMessage({
    type: 'start-recording',
    target: 'offscreen',
    data: streamId
  })

  chrome.action.setIcon({ path: 'icons/recording.png' })
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.onClicked.addListener(tab => {})
  // 不能再pannel 里面调用录屏
  //Uncaught (in promise) Error: Extension has not been invoked for the current page (see activeTab permission). Chrome pages cannot be captured.
  // chrome.sidePanel.setPanelBehavior({
  //   openPanelOnActionClick: true
  // })
})

chrome.runtime.onMessage.addListener(async (message, sender) => {
  console.log('sw 接受消息', message, sender)

  if (message.type === 'to-record') {
    const tab = await getCurrentTab()
    console.log('sw tab', tab)
    startRecord(tab)
  }
})
