/**
 * Error codes for responses from the API.
 */
export enum APIErrorCode {
  Unauthorized = 'unauthorized',
  RestrictedResource = 'restricted_resource',
  ObjectNotFound = 'object_not_found',
  RateLimited = 'rate_limited',
  InvalidJSON = 'invalid_json',
  InvalidRequestURL = 'invalid_request_url',
  InvalidRequest = 'invalid_request',
  ValidationError = 'validation_error',
  ConflictError = 'conflict_error',
  InternalServerError = 'internal_server_error',
  ServiceUnavailable = 'service_unavailable'
}

/**
 * Body of an error response from the API.
 */
interface APIErrorResponseBody {
  code: APIErrorCode
  message: string
}

export interface APIErrorResponse extends APIErrorResponseBody {
  object: 'error'
  status: number
}
