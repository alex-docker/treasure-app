const API_ENDPOINT = process.env.REACT_APP_BACKEND_API_BASE;

export const getPrivateMes = function(idToken) {
  return fetch(`${API_ENDPOINT}/private`, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin"
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`Request rejected with status ${res.status}`);
    }
  });
};

export const getPublicMes = function() {
  return fetch(`${API_ENDPOINT}/public`);
};

export const getArticles = () => {
  return fetch(`${API_ENDPOINT}/articles`)
}

export const postArticle = (body, idToken) => {
  console.log(body)
  return fetch(`${API_ENDPOINT}/articles`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    mode: 'no-cors',
    body: JSON.stringify(body),
  })
}