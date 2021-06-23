export const state = () => ({
    bottomTab: false
})
  
export const mutations = {

    tooggleBottomTab (state, status) {
        state.bottomTab = status
    },
}