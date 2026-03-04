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
  mutations: {
    setUser(state, payload) {
      console.log(payload)
      state.user = payload
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError', null, { root: true })
      commit('setLoading', true, { root: true })

      // Имитация запроса на сервер
      let isRequestOk = true
      let promise = new Promise(function(resolve) {
        setTimeout(() => resolve('Done'), 3000)
      })

      try {
        if (isRequestOk) {
          await promise
          commit('setUser', new User(1, email, password))
          commit('setLoading', false, { root: true })
        } else {
          await promise
          commit('setLoading', false, { root: true })
          commit('setError', 'Ошибка регистрации', { root: true })
          throw 'Упс... Ошибка регистрации'
        }
      } catch (error) {
        commit('setLoading', false, { root: true })
        commit('setError', error, { root: true })
        throw error
      }
    },
    
    async loginUser({ commit }, { email, password }) {
      commit('clearError', null, { root: true })
      commit('setLoading', true, { root: true })

      // Имитация запроса на сервер
      let isRequestOk = true
      let promise = new Promise(function(resolve) {
        setTimeout(() => resolve('Done'), 3000)
      })

      try {
        if (isRequestOk) {
          await promise
          commit('setUser', new User(1, email, password))
          commit('setLoading', false, { root: true })
        } else {
          await promise
          commit('setLoading', false, { root: true })
          commit('setError', 'Ошибка логина или пароля', { root: true })
          throw 'Упс... Ошибка логина или пароля'
        }
      } catch (error) {
        commit('setLoading', false, { root: true })
        commit('setError', error, { root: true })
        throw error
      }
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}