import * as restify from 'restify';

/**
 * SuccessResponse
 *
 * @param res
 * @param data
 * @param next
 */

export function successResponse(res: restify.Response, data: any, next: restify.Next) {
  res.json(200, { status: 200, result: data });
  return next();
}
