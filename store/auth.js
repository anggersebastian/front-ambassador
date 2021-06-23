import * as Cookies from 'js-cookie'

export const state = () => ({
    token: null,
    error:null,
    name:null,
    country:null,
    package:'Basic'
})
  
export const mutations = {

    setToken (state, value) {
        state.token = value
        if(process.browser){
            Cookies.set('token', value, { expires: 1 })
        }
    },

    setError(state, value){
        state.error = value
    },

    setName(state, value){
        state.name = value
    },

    setCountry(state, value){
        state.country = value
    },

    setPackage(state, value){
        state.package = value
    }
}

export const actions = {
    async LOGIN({commit}, params){
        commit('setError', null)
        try {
            const response = await this.$axios.$post('/v2/auth/login', JSON.stringify(params))
            if(response.status){
                let data = response.data
                commit('setToken', data.user.token)
                commit('setName', data.user.name)
                commit('setCountry', data.user.country_code)
                if(data.package){
                    commit('setPackage', data.package.package_name)
                }
                return
            }
            commit('setError', response.data)
            return true
        } catch (error) {
            commit('setError', 'Unauthorized')
            return false
        }
    },

    loginByRegister({commit}, params){
        commit('setToken', params.token)
        commit('setName', params.name)
        commit('setCountry', params.country_code)
    },

    async LOGOUT({commit}){
        Cookies.remove('token')
        await this.$axios.get('/auth-app/logout')
        commit('setToken', null)
        commit('setName', null)
        commit('setPackage', '')
        localStorage.removeItem('vuex')
        location.reload()
    },

    destroyed({commit}) {
        commit('setToken', null)
        commit('setName', null)
        if(process.browser){
            localStorage.removeItem('token')
        }
    },

    SET_PACKAGE({commit}, val){
        commit('setPackage', val)
    }
}

export const getters = {
    token : state => state.token,
    error : state => state.error,
    name : state => state.name,
    country : state => state.country,
    package : state => state.package
}
