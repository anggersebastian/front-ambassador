import * as Cookies from 'js-cookie'

export const state = () => ({
    loading:false,
    totalCart: 0,
    cart:[],
    wishlist:[],
    lang : 'en',
    currency:'idr',
    drawer:false
})
  
export const mutations = {
    setCart(state, data){
        state.cart = data
    },

    addTotalCart(state, data = false){
        return state.totalCart ++
    },

    setLoading(state, status){
        state.loading = status
    },

    setLang(state, params){
        state.lang = params
    },

    setCurrency(state, params){
        state.lang = params
    },

    drawerToggle(state){
        state.drawer = state.drawer ? false : true
    },

    setWhislist(state, params){
        state.wishlist = params
    }
}

export const actions = {
    async getCart({commit}){
        try {
            let cart = await this.$axios.$get('/v2/cart/product')
            if(cart.status){
                commit('setCart', cart.data)
            }
        } catch (error) {
            throw error
        }
    },

    async getWishlist({commit}){
        try {
            let wishlist = await this.$axios.$get('/v2/wishlist/count')
            if(wishlist.status){
                commit('setWhislist', wishlist.data)
            }
        } catch (error) {
            commit('setWhislist', [])
        }
    },

    setCart({commit}, params){
        commit('setCart', params)
    },

    setLoading({commit}, status) {
        commit('setLoading', status)
    },

    setLang({commit}, params){
        Cookies.set('lang', params, { expires: 7})
        commit('setLang', params)
        if(process.browser){
            location.reload()
        }
    },

    setCurrency({commit}, params){
        Cookies.set('currency', params, { expires: 7})
        commit('setCurrency', params)
        if(process.browser){
            location.reload()
        }
    },
}

export const getters = {
    totalCart : state => state.totalCart,
    cart : state => state.cart,
    loading : state => state.loading,
    lang : state => state.lang,
    currency : state => state.currency,
    wishlist: state=>state.wishlist
}

export const strict = false