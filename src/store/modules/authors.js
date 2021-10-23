// initial state
const state = () => ({
  authors: [],
  itemsPerPage: 10
})

// getters
const getters = {
  getAuthorById(state) {
    return (id) => state.authors.find((author) => author.id == id)
  }
}

// actions
const actions = {
  async fetchAuthors(context, getPayload) {
    context.commit('setAuthors', await getPayload())
  }
}

// mutations
const mutations = {
  setAuthors(state, payload) {
    if (payload.data instanceof Array) {
      state.authors = payload.data
      return
    }
    let index = state.authors.findIndex((author) => author.id == payload.id)
    if (index === -1) state.authors.push(payload.data)
    else state.authors[index] = payload.data
  },
  setItemsPerPage(state, payload) {
    state.itemsPerPage = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
