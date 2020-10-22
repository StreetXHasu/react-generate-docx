async function makeRequest(method, url, data = {}) {
  try {
    const response = await fetch(url, {
      method: `${method}`,
      body: data,
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTk4MDIzOTk0fQ.qalGYUk1DWF0IT-VAiXwG2Gowe0WgHGjTfNJ2mlu_hw",
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return { ok: true, data: await response.json(), error: null };
  } catch (err) {
    return { ok: false, data: null, error: err };
  }
}

export default makeRequest;
