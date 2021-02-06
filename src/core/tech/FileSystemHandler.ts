import fs from 'fs'
import path from 'path'
import {v4} from 'uuid'
import sharp from 'sharp'
import FileType from 'file-type'
import {OutgoingHttpHeaders} from 'http'

const staticDir = './static'
const imagesDir = './static/images'

const COMPRESS_PERCENT = 5
const CACHE_LIFETIME_SECONDS = 3600

const checkImageDirExists = async (): Promise<void> => {
  if (!fs.existsSync(imagesDir)) {
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir)
    }
    return fs.mkdirSync(imagesDir)
  }
}

const compressImage = async (imageBuffer:any): Promise<any> => {
  let compressedImageBuffer = null
  await sharp(imageBuffer).metadata()
    .then(info => {
      const width = Math.round(info.width * COMPRESS_PERCENT / 100);
      const height = Math.round(info.height * COMPRESS_PERCENT / 100);
      compressedImageBuffer = sharp(imageBuffer).resize(width, height).toBuffer();
    })

  return compressedImageBuffer
}

export const deleteImages = async (images: string[]): Promise<any> => {
  return images.forEach((img:string) => fs.unlinkSync(`${imagesDir}/${img}`))
}

const getFileExtension = (filename: string): string => {
  const fileParts = filename.split('.')
  const extension = fileParts.length === 2 ? fileParts[1] : ''

  return extension
}

export const getHeadersFromBuffer = async (buffer: Buffer): Promise<OutgoingHttpHeaders> => {
  const bufferType = await FileType.fromBuffer(buffer)

  return {
    'Content-Type': bufferType ? bufferType.mime : '',
    'accept-ranges': 'bytes',
    'connection': 'close',
    'Cache-Control': `max-age=${CACHE_LIFETIME_SECONDS}`,
    'Pragma': 'public',
    'Expires': new Date(Date.now() + CACHE_LIFETIME_SECONDS * 1000).toUTCString()
  }
}

const generateFilename = (filename: string): string => {
  const randomName = v4()
  const extension = getFileExtension(filename)

  return `${randomName}.${extension}`
}

export const resolveImageFromStatic = async (filename: string = '') => {
  const pathToImage = `${imagesDir}/${filename}`
  const buffer = fs.readFileSync(pathToImage)

  return buffer
}

export const uploadImage = async (file:any) => {
  const imgFilename = generateFilename(file.originalname)
  const minimalImgFilename = generateFilename(file.originalname)
  checkImageDirExists().then(() => {
    fs.writeFileSync(path.join(imagesDir, imgFilename), file.buffer)
  })
  compressImage(file.buffer).then(compressedBuffer => {
    checkImageDirExists().then(() => {
      fs.writeFileSync(path.join(imagesDir, minimalImgFilename), compressedBuffer)
    })
  })

  return {imgFilename, minimalImgFilename}
}
