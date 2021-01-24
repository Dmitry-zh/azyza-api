import Service from './Service'
import PaintingRepository from '../repositories/PaintingRepository'
import PaintingModel from "../models/PaintingModel";

export default class Painting extends Service<PaintingModel, PaintingRepository> {
  constructor() {
    super('painting', new PaintingRepository())
  }
}
