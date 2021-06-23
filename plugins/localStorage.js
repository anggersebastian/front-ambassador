import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    if(process.browser){

        createPersistedState({
            key: 'vuex',
            paths:['auth.name', 'auth.token', 'auth.package', 'auth.country', 'cart', 'totalCart', 'wishlist'],
        })(store)
    }
}