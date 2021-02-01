import Service from './Service'
import PaintingService from './PaintingService'
import GalleryObjectService from './GalleryObjectService'

export default class Services {

  static galleryServices = [
    new PaintingService()
  ]

  getGalleryService(entity: string = ''): GalleryObjectService {
    return Services.galleryServices.find(v => v.entity === entity)
  }
}
