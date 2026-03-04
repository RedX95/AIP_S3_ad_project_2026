class User {
  constructor(id, email, password) {
    this.id = id
    this.email = email
    this.password = password
  }
}

export default {
  state: {
    user: null
  },
  mutations: {},
  actions: {},
  getters: {
    user(state) {
      return state.user
    }
  }
}