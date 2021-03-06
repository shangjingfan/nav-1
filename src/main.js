
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [ //xObject存在就读取，不存在就用后面的数组
  {
    logo: 'B',
    url: 'https://www.baidu.com'
  },
  {
    logo: 'G',
    url: 'https://google.com'
  },
  {
    logo: 'T',
    url: 'https://taobao.com'
  },
]
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') //删除/开头的内容
}

const render = () => {
  $siteList.find('li:not(.last)').remove() //清空
  hashMap.forEach((node, index) => { //再渲染
    const $li = $(`<li>
        <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-baseline-close-px"></use>
            </svg>
          </div>
        </div>
    </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation() // 阻止冒泡
      hashMap.splice(index, 1) // 删除
      render() //重新渲染下
      console.log(hashMap)
    })
  })
}

render()

$('.addButton').on('click', () => {
  let url = window.prompt('请问你要添加什么网址')
  if (url.indexOf("http") !== 0) {
    url = 'https://' + url
  }
  console.log(url)
  if (url !== 'https://') {
    hashMap.push({
      logo: simplifyUrl(url)[0],
      url: url
    })
  }

  render() //渲染
})

window.onbeforeunload = () => {
  console.log('页面要关闭了')
  const string = JSON.stringify(hashMap) //转成字符串，localStorage只能存字符串
  localStorage.setItem('x', string)
}

$(document).on('keypress', e => {
  console.log(e.key)
  const { key } = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})

const $input = $('.searchForm').find('input')
$input.on('keypress', e => { //阻止冒泡，input里输入链接首字母可能跳转链接
  // console.log(e)
  e.stopPropagation()
})
