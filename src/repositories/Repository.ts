import Model from '../models/Model'
import IModel from '../core/interfaces/IModel'

export default abstract class Repository<T extends IModel<T> & Model> {
  model: T

  constructor(model: T) {
    this.model = model
  }

  create(model: Model): Promise<T> {
    return this.model.db_connector.create(model)
  }
}

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
