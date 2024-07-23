const ele = document.getElementById('btn')

const btnclick = () => {
  console.log('开始截屏')
}

if (ele) {
  ele.onclick = btnclick
}
