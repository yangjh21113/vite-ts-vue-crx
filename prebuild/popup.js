const ele = document.getElementById('btn')

const btnclick = () => {
  console.log('开始截屏')
}

if (ele) {
  ele.onclick = btnclick
}

chrome.runtime.onMessage.addListener(message => {
  console.log('侧边栏接收到消息', message)
  if (message.type === 'display') {
    console.log('接收到消息')
    const videoEle = document.getElementById('videoItem')
    if (videoEle) {
      videoEle.src = message.url
    }
  }
})
