// initial state
const state = () => ({
  authors: []
})

// getters
const getters = {
  getAuthorById(state) {
    return (id) => state.authors.find((author) => author.id == id)
  }
}

// actions
const actions = {
  async fetchAuthors(context) {
    context.commit('setAuthors', {
      data: await (await this.$http.get('/authors')).data
    })
  },
  async fetchAuthor(context, id) {
    context.commit('setAuthors', {
      data: await (await this.$http.get(`/authors/${id}`)).data,
      id
    })
  }
}

// mutations
const mutations = {
  setAuthors(state, payload) {
    if (payload.id === undefined) {
      state.authors = payload.data
      return
    }
    let index = state.authors.findIndex((author) => author.id == payload.id)
    if (index === -1) state.authors.push(payload.data)
    else state.authors[index] = payload.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
