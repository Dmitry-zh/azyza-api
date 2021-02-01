import PaintingRepository from '../repositories/PaintingRepository'
import PaintingModel from '../models/PaintingModel'
import Service from './Service'

export default class Painting extends Service<PaintingModel, PaintingRepository> {
  constructor() {
    super('painting', new PaintingRepository())
  }
}
