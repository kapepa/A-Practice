export interface DtoQuery {
  take?: number,
  skip?: number,
  where?: string,
  order?: 'DESC' | 'ASC'
}
