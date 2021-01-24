import Repository from './Repository'
import PaintingModel from '../models/PaintingModel'

export default class PaintingRepository extends Repository<PaintingModel> {
  constructor() {
    super(new PaintingModel())
  }
}
