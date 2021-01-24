import IParsable from './IParsable'

export default interface IModel<T> extends IParsable<T> {
  id: number
  title?: string
  description?: string
  [key: string]: any
}
