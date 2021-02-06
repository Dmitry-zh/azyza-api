import Repository from '../repositories/Repository'
import Model from '../models/Model'
import IModel from '../core/interfaces/IModel'
import QueryParams from '../core/db/queryParams'
import GalleryObjectModel from '../models/GalleryObjectModel'
import { uploadImage, deleteImages } from '../core/tech/FileSystemHandler'

export default abstract class Service<T extends IModel<T> & Model, T1 extends Repository<T>> {
  entity: string = ''
  repository: T1

  constructor(entity: string, repository: T1) {
    this.entity = entity
    this.repository = repository
  }
  getEntity (id:number) {
    return this.repository.getEntity(id)
  }

  getList (queryParams: QueryParams) {
    return this.repository.getList(queryParams)
  }
  create (model: Model) {
    return this.repository.create(model)
  }
  update (model: Model) {
    return this.repository.update(model)
  }
  // gallery only
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
  updateImageAndModel(model: GalleryObjectModel, image: any) {
    let oldImageNames = ['']
    return uploadImage(image)
      .then(async imgNames => {
        const {imgFilename, minimalImgFilename} = imgNames
        model.img_id = imgFilename
        model.minimal_img_id = minimalImgFilename
        const oldModel = await this.getEntity(model?.id)
        oldImageNames = [oldModel.img_id, oldModel.minimal_img_id]

        return this.update(model)
    })
      .then(async updatedModel => {
        await deleteImages(oldImageNames)

        return updatedModel
    })
  }
}
