import { IRequestHeaders } from '../types/interfaces/requestHeadersTypes'

const headers: IRequestHeaders | {} = {}

const setHeaders = (headers: IRequestHeaders) => (headers = headers)

export { setHeaders, headers }
