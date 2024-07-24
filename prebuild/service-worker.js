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
let recording = false
const startRecordAll = async streamId => {
  const existingContexts = await chrome.runtime.getContexts({})

  const offscreenDocument = existingContexts.find(c => c.contextType === 'OFFSCREEN_DOCUMENT')

  // If an offscreen document is not already open, create one.
  if (!offscreenDocument) {
    // Create an offscreen document.
    await chrome.offscreen.createDocument({
      url: 'offscreen2.html',
      reasons: ['USER_MEDIA'],
      justification: 'Recording from chrome.tabCapture API'
    })
  } else {
    recording = offscreenDocument.documentUrl.endsWith('#recording')
  }

  if (recording) {
    chrome.runtime.sendMessage({
      type: 'stop-recording-all',
      target: 'offscreen2'
    })
    chrome.action.setIcon({ path: 'icons/logo.png' })
    return
  }

  chrome.runtime.sendMessage({
    type: 'start-recording-all',
    target: 'offscreen2',
    data: streamId
  })

  chrome.action.setIcon({ path: 'icons/recording.png' })
}
const recordAllCb = async (streamId, options, xx) => {
  console.log('sw record all callback', streamId, options, xx)
  startRecordAll(streamId)
}
chrome.runtime.onMessage.addListener(async (message, sender) => {
  console.log('sw 接受消息', message, sender)

  const tab = await getCurrentTab()
  console.log('sw tab', tab)
  console.log('sw recording', recording)
  if (message.type === 'to-record') {
    startRecord(tab)
  } else if (message.type === 'to-record-all') {
    if (recording) {
      recordAllCb()
    } else {
      chrome.desktopCapture.chooseDesktopMedia(['window', 'screen', 'tab'], tab, recordAllCb)
    }
  }
})
