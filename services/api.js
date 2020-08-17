import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8000/api/',
  transformRequest: [
    function (data, headers) {
      if (typeof data !== 'object' || data === null) return data

      const form = new FormData()
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
      Object.keys(data).map((k) => form.append(k, data[k]))
      return form
    },
  ],
})
