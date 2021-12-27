import { authenticatedRequest, AuthRequestInit } from './auth';

const request = authenticatedRequest;

export class NotFoundError extends Error {
  constructor(msg?: string) {
    super(msg);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends Error {
  constructor(msg?: string) {
    super(msg);
    this.name = 'ForbiddenError';
  }
}

export function assertSuccess(response: Response) {
  if (response.status === 403) throw new ForbiddenError();
  if (response.status === 404) throw new NotFoundError();
  if (!response.ok) throw new Error();
}

export const get = request;
export const post = (url: string, options: AuthRequestInit = {}) =>
  request(url, {
    method: 'POST',
    ...options,
  });
export const put = (url: string, options: AuthRequestInit = {}) =>
  request(url, {
    method: 'PUT',
    ...options,
  });

export const del = (url: string, options: AuthRequestInit = {}) =>
  request(url, {
    method: 'DELETE',
    ...options,
  });
