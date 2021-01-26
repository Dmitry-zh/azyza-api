export default class QueryParams {
  offset: number = 0
  limit: number = 10

  constructor(params: any) {
    this.limit = Number(params.itemsPerPage) || 10
    this.offset = Number(params.itemsPerPage) * Number(params.page) - Number(params.itemsPerPage) || 0
  }
}
