// async - asinxron funksiya yaratish

async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: data,
  })
  return await res.json()

  // await - bu kutish buyruqi ya'ni masalan resni qaytarishi uchun uni bajarilishini kutadi
}
export { postData }
