import * as restify from 'restify';

/**
 * ErrorResponse
 *
 * @param res
 *
 * @param next
 */

export function notFoundErrorResponse(res: restify.Response, next: restify.Next) {
  res.json(404, { status: 404, error: 'Not Found' });
  return next(false);
}
