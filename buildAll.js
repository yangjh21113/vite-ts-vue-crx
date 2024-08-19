import { resolve } from 'path'
import { rmSync } from 'fs'
import { exec } from 'child_process'
import { copyDirectory, deleteDirectory, CRX_POPUP_OUTFIR, CRX_OUTDIR, CRX_CONTENT_OUTDIR, CRX_BACKGROUND_OUTDIR, CRX_NEWTAB_OUTDIR, CRX_SIDEPANEL_OUTDIR, CRX_SCREEN_SHOT_OUTDIR } from './globalConfig.js'

const afterBuildFun = () => {
  // 源目录：popup script临时生成目录
  const popupOutDir = resolve(process.cwd(), CRX_POPUP_OUTFIR)
  // 源目录：content script临时生成目录
  const contentOutDir = resolve(process.cwd(), CRX_CONTENT_OUTDIR)
  // 移除开发用的content.html
  const html = resolve(process.cwd(), `${CRX_CONTENT_OUTDIR}/content.html`)
  rmSync(html)
  // 源目录：background script临时生成目录
  const backgroundOutDir = resolve(process.cwd(), CRX_BACKGROUND_OUTDIR)
  // 源目录：sidePanel script临时生成目录
  const sidePanelOutDir = resolve(process.cwd(), CRX_SIDEPANEL_OUTDIR)
  // 源目录：screenShot script临时生成目录
  const newtabOutDir = resolve(process.cwd(), CRX_NEWTAB_OUTDIR)
  // 源目录：screenShot script临时生成目录
  const screenShotOutDir = resolve(process.cwd(), CRX_SCREEN_SHOT_OUTDIR)
  // 目标目录：Chrome Extension 最终build目录
  const outDir = resolve(process.cwd(), CRX_OUTDIR)
  // 将复制源目录内的文件和目录全部复制到目标目录中
  copyDirectory(popupOutDir, outDir)
  copyDirectory(contentOutDir, outDir)
  copyDirectory(backgroundOutDir, outDir)
  copyDirectory(sidePanelOutDir, outDir)
  copyDirectory(newtabOutDir, outDir)
  copyDirectory(screenShotOutDir, outDir)
  // 删除源目录
  deleteDirectory(popupOutDir)
  deleteDirectory(contentOutDir)
  deleteDirectory(backgroundOutDir)
  deleteDirectory(sidePanelOutDir)
  deleteDirectory(newtabOutDir)
  deleteDirectory(screenShotOutDir)
}

const promise1 = () => {
  return new Promise((resolve, reject) => {
    const p = exec('vite build -c vite.content.config.js')
    p.stdout.pipe(process.stdout)
    p.addListener('close', () => {
      process.stdout.write('--------content 打印完毕--------\n')
      resolve('')
    })
  })
}

const promise2 = () => {
  return new Promise((resolve, reject) => {
    const p2 = exec('vite build -c vite.background.config.js')
    p2.stdout.pipe(process.stdout)
    p2.on('close', () => {
      process.stdout.write('--------background 打印完毕--------\n')
      resolve('')
    })
  })
}
const promise3 = () => {
  return new Promise((resolve, reject) => {
    const p3 = exec('vite build -c vite.popup.config.js')
    p3.stdout.pipe(process.stdout)
    p3.on('close', () => {
      process.stdout.write('--------popup 打印完毕--------\n')
      resolve('')
    })
  })
}
const promise4 = () => {
  return new Promise((resolve, reject) => {
    const p4 = exec('vite build -c vite.newtab.config.js')
    p4.stdout.pipe(process.stdout)
    p4.on('close', () => {
      process.stdout.write('--------newtab 打印完毕--------\n')
      resolve('')
    })
  })
}
const promise5 = () => {
  return new Promise((resolve, reject) => {
    const p5 = exec('vite build -c vite.screenShot.config.js')
    p5.stdout.pipe(process.stdout)
    p5.on('close', () => {
      process.stdout.write('--------screenShot 打印完毕--------\n')
      resolve('')
    })
  })
}
const promise6 = () => {
  return new Promise((resolve, reject) => {
    const p6 = exec('vite build -c vite.sidePanel.config.js')
    p6.stdout.pipe(process.stdout)
    p6.on('close', () => {
      process.stdout.write('--------sidePanel 打印完毕--------\n')
      resolve('')
    })
  })
}

// 异步打包 快
const packAllAsync = () => {
  process.stdout.write('--------****开始异步打包****--------\n')
  return Promise.all([promise1(), promise2(), promise3(), promise4(), promise5(), promise6()]).then(() => {
    process.stdout.write('--------恭喜你 全部打印完毕！正在整理文件夹--------\n')
    afterBuildFun()
    process.stdout.write('--------整理完毕--------\n')
  })
}

const packAllSync = async () => {
  process.stdout.write('--------****开始同步打包****--------\n')
  await promise1()
  await promise2()
  await promise3()
  await promise4()
  await promise5()
  await promise6()
  afterBuildFun()
}
const commandType = process.argv[2]
const isSync = commandType === 'sync' ? true : false

const startPack = async () => {
  let startTime = Date.now()
  if (isSync) {
    await packAllSync()
    const time = Date.now() - startTime
    process.stdout.write(`--------同步打包已完成，耗时：${time / 1000}s--------\n`)
  } else {
    packAllAsync().then(() => {
      const time = Date.now() - startTime
      process.stdout.write(`--------异步打包已完成，耗时：${time / 1000}s--------\n`)
    })
  }
}
startPack()
