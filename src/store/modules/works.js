// initial state
const state = () => ({
  works: []
})

// getters
const getters = {
  getWorksByAuthor(state) {
    return (id) => state.works.filter((work) => work.authorId == id)
  }
}

// actions
const actions = {
  async fetchWork(context, id) {
    context.commit('setWork', {
      data: await (await this.$http.get(`/works/${id}`)).data,
      id
    })
  },
  async fetchWorksByAuthor(context, authorId) {
    let fetchedWorks = await this.$http.get(
      `/works/search?authorId=${authorId}`
    )
    fetchedWorks.data.forEach((work) => {
      if (work.authorId == -1) work.authorId = authorId
      context.commit('setWork', { data: work })
    })
  }
}

// mutations
const mutations = {
  setWork(state, payload) {
    let index = state.works.findIndex((work) => work.id == payload.data.id)
    if (index === -1) state.works.push(payload.data)
    else state.works[index] = payload.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
