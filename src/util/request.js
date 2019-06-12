export function request(url, { method = 'get', responseType = 'json' } = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.responseType = responseType
    xhr.onload = function() {
      const status = xhr.status
      if (status === 200) {
        resolve(xhr.response)
      } else {
        reject(xhr.response)
      }
    }
    xhr.send()
  })
}
