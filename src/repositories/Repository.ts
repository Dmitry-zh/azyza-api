import Model from '../models/Model'
import IModel from '../core/interfaces/IModel'
import QueryParams from '../core/db/queryParams'
import {where} from "sequelize";

export default abstract class Repository<T extends IModel<T> & Model> {
  model: T

  constructor(model: T) {
    this.model = model
  }

  getEntity(id: number): Promise<T> {
    console.log('id', id)
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
  }}

// import { ProductModel, ProductDefiner } from '../models/ProductModel'
// import { db } from '../core/db/dbConnector'
// import { QueryTypes } from 'sequelize'
//
// const productSchema = ProductDefiner()
//
// export default class ProductMapPointService {
//
//   create = async (product: any) => {
//     const productModel = new ProductModel( product )
//     let newProduct:any
//     try {
//       newProduct = await productSchema.create(productModel)
//     } catch (e) {
//       throw new Error(e.message)
//     }
//     return newProduct
//   }
