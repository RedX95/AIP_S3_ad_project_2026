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
    orders: [
      {
        id: "123",
        name: "Kostya",
        phone: "+7(978)000-00-05",
        adId: "1",
        userId: "1",
        done: true
      },
      {
        id: "124",
        name: "Anna",
        phone: "+7(978)000-00-06",
        adId: "2",
        userId: "1",
        done: false
      },
      {
        id: "125",
        name: "Maria",
        phone: "+7(978)000-00-07",
        adId: "3",
        userId: "2",
        done: false
      }
    ]
  },
  mutations: {
    createOrder(state, payload) {
      state.orders.push(payload)
    },
    markOrderDone(state, orderId) {
      const order = state.orders.find(o => o.id === orderId)
      if (order) {
        order.done = !order.done
      }
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
    },
    
    async markOrderDone({ commit }, orderId) {
      commit('clearError', null, { root: true })
      
      // Имитация запроса на сервер
      let isRequestOk = true
      let promise = new Promise(function(resolve) {
        setTimeout(() => resolve('Done'), 1000)
      })

      try {
        if (isRequestOk) {
          await promise
          commit('markOrderDone', orderId)
          return Promise.resolve()
        } else {
          commit('setError', 'Ошибка обновления заказа', { root: true })
          throw new Error('Ошибка обновления заказа')
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