import axios from 'axios'
import camelCaseKeys from 'camelcase-keys'
import snakeCaseKeys from 'snakecase-keys'

const api = axios.create({
    baseURL: process.env.MIX_APP_BASE_ENDPOINT,
    timeout: 60000
})

api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

api.interceptors.request.use(
    config => {
        // if (store.getters.token) {
        //     config.headers.Authorization = `Bearer ${store.getters.token}`
        // }

        if(config.params) {
            config.params = snakeCaseKeys(config.params, { deep: true })
        }

        if (config.data) {
            if(config.data.snakeCase) {
                config.data = config.data
            }
            else {
                config.data = snakeCaseKeys(config.data, { deep: true })
            } 
        }

        return config
    },
    error => {
        console.error(error)
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response.status === 401) {
            // store.dispatch('logout').then(() => {
            //     router.push( {
            //         path: '/login'
            //     })
            // }).catch(error => {
            //     console.error('Unable to process log out.')
            //     console.error(error)
            // })
        }
        else {
            return Promise.reject(error)
        }
    }
)

api.defaults.transformResponse = [(data, headers) => {
    if (data && headers['content-type'].includes('application/json')) {
        return camelCaseKeys(JSON.parse(data), { deep: true })
    }
}]

export default api;