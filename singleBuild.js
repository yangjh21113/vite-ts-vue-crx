import { resolve } from 'path'
import { copyDirectory, deleteDirectory, CRX_OUTDIR, CRX_CONTENT_OUTDIR, CRX_BACKGROUND_OUTDIR, CRX_POPUP_OUTFIR, CRX_SIDEPANEL_OUTDIR, CRX_NEWTAB_OUTDIR, CRX_SCREEN_SHOT_OUTDIR } from './globalConfig.js'
import { rmSync } from 'fs'

const curType = process.argv[2]

// 单独打包，仅复制当前文件夹 到 build

const outDir = resolve(process.cwd(), CRX_OUTDIR)

switch (curType) {
  case 'content':
    const contentOutDir = resolve(process.cwd(), CRX_CONTENT_OUTDIR)
    // 移除开发用的content.html
    const html = resolve(process.cwd(), `${CRX_CONTENT_OUTDIR}/content.html`)
    rmSync(html)
    copyDirectory(contentOutDir, outDir)
    deleteDirectory(contentOutDir)
    break
  case 'background':
    const backgroundOutDir = resolve(process.cwd(), CRX_BACKGROUND_OUTDIR)
    copyDirectory(backgroundOutDir, outDir)
    deleteDirectory(backgroundOutDir)
    break
  case 'sidePanel':
    const sidePanelOutDir = resolve(process.cwd(), CRX_SIDEPANEL_OUTDIR)
    copyDirectory(sidePanelOutDir, outDir)
    deleteDirectory(sidePanelOutDir)
    break
  case 'popup':
    const popupOutDir = resolve(process.cwd(), CRX_POPUP_OUTFIR)
    copyDirectory(popupOutDir, outDir)
    deleteDirectory(popupOutDir)
    break
  case 'screenShot':
    const screenShotOutDir = resolve(process.cwd(), CRX_SCREEN_SHOT_OUTDIR)
    copyDirectory(screenShotOutDir, outDir)
    deleteDirectory(screenShotOutDir)
    break
  case 'newtab':
    const newtabOutDir = resolve(process.cwd(), CRX_NEWTAB_OUTDIR)
    copyDirectory(newtabOutDir, outDir)
    deleteDirectory(newtabOutDir)
    break
  default:
    break
}
