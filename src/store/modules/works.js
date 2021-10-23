// initial state
const state = () => ({
  works: []
})

// getters
const getters = {
  getWorksByAuthor(state) {
    return (id) =>
      state.works.filter(
        (work) =>
          work.authorId == id ||
          work.anotherAuthors.findIndex(
            (anotherAuthor) => anotherAuthor.id == id
          ) !== -1
      )
  }
}

// actions
const actions = {
  async fetchWorksByAuthor(context, payload) {
    let fetchedWorks = await payload.get()
    fetchedWorks.forEach((work) => {
      if (work.authorId == -1) work.authorId = payload.authorId
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
