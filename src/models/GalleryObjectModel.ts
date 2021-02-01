import Model from './Model'

export default class GalleryObjectModel extends Model {
  id: number = null
  title: string = ''
  description: string = ''
  sold: boolean = false
  price_rub: number = null
  img_id: string = ''
  minimal_img_id: string = ''

  constructor () {
    super()
  }
  fromObject(obj: any): GalleryObjectModel  {
    const model = new GalleryObjectModel()
    model.id = obj.id || null
    model.title = obj.title || ''
    model.description = obj.description || ''
    model.sold = obj.sold || false
    model.price_rub = obj.price_rub || null
    model.img_id = obj.img_id || ''
    model.minimal_img_id = obj.minimal_img_id || ''

    return model
  }
}
