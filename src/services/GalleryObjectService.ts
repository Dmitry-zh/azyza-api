import Service from './Service'
import GalleryObjectModel from '../models/GalleryObjectModel'
import GalleryObjectRepository from '../repositories/GalleryObjectRepository'


export default class GalleryObjectService extends Service<GalleryObjectModel, GalleryObjectRepository> {
  entity: string = ''

  constructor() {
    super('gallery-object', new GalleryObjectRepository())
  }
}
