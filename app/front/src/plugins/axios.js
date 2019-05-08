import Vue from 'vue'
import axios from 'axios'
import { xml2json } from 'xml-js'

Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: '/pentaho/plugin/app/api/'
    }),

    Vue.prototype.$pentaho = axios.create({
      baseURL: '/pentaho/',
      transformResponse: [function (data, headers) {
        if (headers['content-type'] === 'application/xml') {
          data = JSON.parse(
              xml2json(data, {
              compact: true,
              spaces: 2,
              alwaysChildren: true,
              ignoreDeclaration: true,
              ignoreAttributes: true,
              ignoreComment: true
            })
          )
        }
        return data
      }]
    })

  }

  
})
