import Service from './Service'
import PaintingService from './PaintingService'

export default class Services {

  static defaultServices = [
    new PaintingService()
  ]

  getService(entity: string = ''): Service<any, any> {
    return Services.defaultServices.find(v => v.entity === entity)
  }
}
