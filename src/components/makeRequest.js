function getCookieValue(a) {
  var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

async function makeRequest(method, url, data = {}, contentType = "") {
  try {
    let Head = {};
    let Token = getCookieValue("token");
    if (Token.length >= 1) {
      Token = `Bearer ${Token}`;
    }
    if (contentType) {
      //КОСТЫЛЬ 90 уровня
      Head = new Headers({
        Authorization: `${Token}`,
        "Content-Type": contentType,
      });
    } else {
      Head = new Headers({
        Authorization: `${Token}`,
      });
    }

    const response = await fetch(url, {
      method: `${method}`,
      body: data,
      headers: Head,
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
