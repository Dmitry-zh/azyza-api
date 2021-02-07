import Model from '../models/Model'
import IModel from '../core/interfaces/IModel'
import QueryParams from '../core/db/queryParams'

export default abstract class Repository<T extends IModel<T> & Model> {
  model: T

  constructor(model: T) {
    this.model = model
  }

  get(id: number): Promise<T> {
    return this.model.db_connector.findOne({where: {id}})
  }

  getList(queryParams: QueryParams): Promise<T> {
    const { offset, limit } = queryParams

    return this.model.db_connector.findAndCountAll({offset, limit})
  }

  create(model: Model): Promise<T> {
    return this.model.db_connector.create(model)
  }

  update(model: Model): Promise<T> {
    return this.model.db_connector.update(model, {
      where: {
        id: model.id
      }
    }).then(() => model)
  }

  delete(id: number): Promise<T> {
    return this.get(id).then(async model => {
      await this.model.db_connector.destroy({where: {id}})

      return model
    })
  }
}

