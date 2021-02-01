import Repository from './Repository'
import GalleryObjectModel from '../models/GalleryObjectModel'

export default class GalleryObjectRepository extends Repository<GalleryObjectModel> {
  constructor() {
    super(new GalleryObjectModel())
  }
}
