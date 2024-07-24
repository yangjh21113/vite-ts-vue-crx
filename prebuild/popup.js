const recordBtn = document.getElementById('recordBtn')
const recordResult = document.getElementById('recordResult')
const recordAllBtn = document.getElementById('recordAllBtn')
const recordBtnclick = () => {
  console.log('pop 开始录屏')
  chrome.runtime.sendMessage({
    type: 'to-record'
  })
}
if (recordBtn) {
  recordBtn.addEventListener('click', recordBtnclick)
}
const recordAllBtnClick = () => {
  console.log('pop record all')
  chrome.runtime.sendMessage({
    type: 'to-record-all'
  })
}
if (recordAllBtn) {
  recordAllBtn.addEventListener('click', recordAllBtnClick)
}
const test = document.getElementById('test')
if (test) {
  //  每个tab 的popup会刷新页面
  test.innerHTML = `${new Date().getTime()}`
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
