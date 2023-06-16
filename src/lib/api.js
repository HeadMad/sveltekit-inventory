/**
 * 
 * @callback createRequestCallback
 * @param {string} method - Method of Request
 * @param {Object|null} [params = null] - params of request
 * @returns {Object} - Response like {ok: true, result:{...rsult}} Or {ok: false, error: {message: ...}}
 */

/**
 * Creating function for sending request to End point
 * 
 * @param {string} url - Local url for sending request
 * @param {function} fetchHandler - For server side request set server fetch
 * @returns {createRequestCallback}
 */
export function createRequest(url, fetchHandler = fetch) {
  return async (method, params = null) => {
    const request = { method, params };
    const result = await fetchHandler(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(request),
    });
    return await result.json();
  }
}

/**
 * Creating handler for End point API
 * @param {function} handler - Method of End point API 
 * @returns {object} - Response like {ok: true, result:{...rsult}} Or {ok: false, error: {message: ...}}
 */
export function createHandlerResponse(handler) {
  return async (params) => {
    try {
      return { ok: true, result: await handler(params) }
    } catch (err) {
      return { ok: false, error: { message: err.toString() } }
    }
  }
}