import Repository from '../repositories/Repository'
import Model from '../models/Model'
import IModel from '../core/interfaces/IModel'
import QueryParams from '../core/db/queryParams'

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
}
