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

export function createHandlerResponse(handler) {
  return async (params) => {
    try {
      return { ok: true, result: await handler(params) }
    } catch (err) {
      return { ok: false, error: { message: err.toString() } }
    }
  }
}