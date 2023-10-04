export const state = () => ({
    accessToken: null,
    refreshToken: null,
    fullname: null,
})

export const mutations = {
    setFullname(state, fullname){
        state.fullname = fullname
    },
    setAccessToken(state, accessToken) {
        state.accessToken = accessToken
    },
    setRefreshToken(state, refreshToken){
        state.refreshToken = refreshToken
    }
    
}

export const actions= {
    async login({login}, payload){
        const response = await this.$axios.post('http://localhost:3000/login', payload)
        if(!response) { return false }

        commit('setFullname', response.data.fullname)
        commit('setAccessToken', response.data.setAccessToken)
        commit('setRefreshToken', response.data.refreshToken)
    }
}