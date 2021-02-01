import Repository from '../repositories/Repository'
import Model from '../models/Model'
import IModel from '../core/interfaces/IModel'
import QueryParams from '../core/db/queryParams'
import GalleryObjectModel from '../models/GalleryObjectModel'
import {uploadImage} from '../core/tech/FileSystemHandler'

export default abstract class Service<T extends IModel<T> & Model, T1 extends Repository<T>> {
  entity: string = ''
  repository: T1

  constructor(entity: string, repository: T1) {
    this.entity = entity
    this.repository = repository
  }

  getList (queryParams: QueryParams) {
    return this.repository.getList(queryParams)
  }
  create (model: Model) {
    return this.repository.create(model)
  }
  // gallery only
  setImagesNamesToModel(model: GalleryObjectModel, imgName:string, minimalImgName: string): GalleryObjectModel {
    return model
  }
  uploadImageAndCreate(model: GalleryObjectModel, image: any) {
    if (!image) {
      return this.create(model)
    }
    return uploadImage(image).then(imgNames => {
      const {imgFilename, minimalImgFilename} = imgNames
      model.img_id = imgFilename
      model.minimal_img_id = minimalImgFilename

      return this.create(model)
    })
  }
}
