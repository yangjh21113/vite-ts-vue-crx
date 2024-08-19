import fs from 'fs'
import path from 'path'

// Chrome Extension 最终build目录
export const CRX_OUTDIR = 'build'
// Chrome popup 最终build目录
export const CRX_POPUP_OUTFIR = '_build_popup'
// 临时build content script的目录
export const CRX_CONTENT_OUTDIR = '_build_content'
// 临时build background script的目录
export const CRX_BACKGROUND_OUTDIR = '_build_background'
// 临时build sidePanel script的目录
export const CRX_SIDEPANEL_OUTDIR = '_build_sidepanel'
// 临时build newtab script的目录
export const CRX_NEWTAB_OUTDIR = '_build_newtab'
// 临时build screenshot script的目录
export const CRX_SCREEN_SHOT_OUTDIR = '_build_screen_shot'

// 拷贝目录文件
export const copyDirectory = (srcDir, destDir) => {
  // 判断目标目录是否存在，不存在则创建
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir)
  }

  fs.readdirSync(srcDir).forEach(file => {
    const srcPath = path.join(srcDir, file)
    const destPath = path.join(destDir, file)

    if (fs.lstatSync(srcPath).isDirectory()) {
      // 递归复制子目录
      copyDirectory(srcPath, destPath)
    } else {
      // 复制文件
      fs.copyFileSync(srcPath, destPath)
    }
  })
}

// 删除目录及文件
export const deleteDirectory = dir => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const curPath = path.join(dir, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子目录
        deleteDirectory(curPath)
      } else {
        // 删除文件
        fs.unlinkSync(curPath)
      }
    })
    // 删除空目录
    fs.rmdirSync(dir)
  }
}
