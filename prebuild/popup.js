const recordBtn = document.getElementById('recordBtn')
const recordResult = document.getElementById('recordResult')
const recordBtnclick = () => {
  console.log('pop 开始录屏')
  chrome.runtime.sendMessage({
    type: 'to-record'
  })
}
if (recordBtn) {
  recordBtn.addEventListener('click', recordBtnclick)
}

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log('pop', message.sender)
  if (message.type === 'preview') {
    if (recordResult) {
      // 切换tab，会将视频url 清空？？？
      console.log('pop 预览录屏', message.url)
      recordResult.src = message.url
    }
  }
})
