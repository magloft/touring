export const request = (url: string, { method = 'get', responseType = 'json' } = {}): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.responseType = responseType as XMLHttpRequestResponseType
    xhr.onload = () => {
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
