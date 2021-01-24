import { PaintingModelDefiner } from './PaintingModel'

const schemas = [
  PaintingModelDefiner()
]

const syncModels = () => {
  schemas.forEach(async schema => {
    await schema.sync({
      force: false
    })
  })
}

export default syncModels
