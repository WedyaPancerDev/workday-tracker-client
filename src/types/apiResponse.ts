export interface ApiResponse<T> {
  code: number
  status: string
  data: T | null
  message: string
}
