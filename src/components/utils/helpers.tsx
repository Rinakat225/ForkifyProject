export const getJSON = async function (url: RequestInfo | URL) {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
};

export const sendJSON = async function (url: RequestInfo | URL, uploadData) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uploadData),
  });
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
};
