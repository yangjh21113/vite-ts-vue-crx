const recordBtn = document.getElementById('recordBtn')

const recordBtnclick = () => {
  console.log('pop 开始录屏')
  chrome.runtime.sendMessage({
    type: 'to-record'
  })
}
if (recordBtn) {
  recordBtn.addEventListener('click', recordBtnclick)
}
