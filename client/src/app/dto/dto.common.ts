export interface DtoErrorPopup{
  open: boolean,
  title: string,
  desc: string
}

export interface DtoErrorResponse{
  status: number,
  response: {
    statusCode: number,
    message: string,
  }
}
