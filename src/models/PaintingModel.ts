import { db } from '../core/db/dbConnector'
import { DataTypes } from 'sequelize'
import Model from './Model'

export default class PaintingModel extends Model {
  id: number = null
  title: string = ''
  description: string = ''
  sold: boolean = false
  price_rub: number = null
  db_connector = PaintingModelDefiner()

  constructor () {
    super()
  }
  fromObject(obj: any): PaintingModel  {
    const model = new PaintingModel()
    model.id = obj.id || null
    model.title = obj.title || ''
    model.description = obj.description || ''
    model.sold = obj.sold || false
    model.price_rub = obj.price_rub || null

    return model
  }
}

export const PaintingModelDefiner = () => {
  return db.define('painting', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.TEXT
      },
      description: {
        type: DataTypes.TEXT
      },
      sold: {
        type: DataTypes.BOOLEAN
      },
      price_rub: {
        type: DataTypes.INTEGER
      },
    }, {
      timestamps: true
    })
}
