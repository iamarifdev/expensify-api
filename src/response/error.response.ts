import * as restify from 'restify';

/**
 * ErrorResponse
 *
 * @param res
 * @param error
 * @param next
 */

export function errorResponse(res: restify.Response, error: any, next: restify.Next) {
  res.json(500, { status: 500, error: error });
  return next(false);
}
