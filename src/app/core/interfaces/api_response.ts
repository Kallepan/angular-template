type HTTPStatus = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500;
/**
 * Generic API response interface
 * @template T - Data type
 * @property {number} status - HTTP status code
 * @property {string} [message] - message
 * @property {T} [data] - Optional data
 * @property {boolean} [success] - success status
 */
export interface APIResponse<T = unknown> {
  /** HTTP status code */
  status: HTTPStatus;

  /** Detailed message */
  message: string;

  /** Success status */
  success: boolean;

  /** The API response (if any) */
  data?: T;
}
