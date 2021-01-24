import { Sequelize } from 'sequelize'

export const db = new Sequelize('azyza', 'admin', 'admin', {
  dialect: 'postgres'
})

