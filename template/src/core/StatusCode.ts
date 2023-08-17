
export enum StatusCode {
  ClientErrorBadRequest = 400,
  ClientErrorConflict = 409,
  ClientErrorForbidden = 403,
  ClientErrorMethodNotAllowed = 405,
  ClientErrorNotAcceptable = 406,
  ClientErrorNotFound = 404,
  ClientErrorPaymentRequired = 402,
  ClientErrorUnauthorized = 401,
  RedirectFound = 302,
  SuccessAccepted = 202,
  SuccessAlreadyReported = 208,
  SuccessCreated = 201,
  SuccessIMUsed = 229,
  SuccessMultiStatus = 207,
  SuccessNoContent = 204,
  SuccessNonAuthoritativeInfo = 203,
  SuccessOK = 200,
  SuccessPartialContent = 206,
  SuccessResetContent = 205
}
export default StatusCode