class Order {
  constructor(name, phone, adId, userId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.userId = userId
    this.done = done
    this.id = id || Date.now().toString()
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder(state, payload) {
      state.orders.push(payload)
    }
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, userId }) {
      let payload = new Order(name, phone, adId, userId, false)
      
      commit('clearError', null, { root: true })

      // Имитация запроса на сервер
      let isRequestOk = true
      let promise = new Promise(function(resolve) {
        setTimeout(() => resolve('Done'), 3000)
      })

      try {
        if (isRequestOk) {
          await promise
          commit('createOrder', payload)
          return Promise.resolve()
        } else {
          await promise
          commit('setError', 'Ошибка создания заказа', { root: true })
          throw new Error('Ошибка создания заказа')
        }
      } catch (error) {
        commit('setError', error.message, { root: true })
        throw error
      }
    }
  },
  getters: {
    orders(state, getters) {
      if (!getters.user) return []
      return state.orders.filter(order => order.userId === getters.user.id)
    }
  }
}