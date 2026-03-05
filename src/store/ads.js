export default {
  state: {
    ads: [
      {
        title: "First",
        desc: "First Desc",
        promo: true,
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        id: "1",
        userId: "1"
      },
      {
        title: "Second",
        desc: "Second Desc",
        promo: true,
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        id: "2",
        userId: "1"
      },
      {
        title: "Third",
        desc: "Thitd Desc",
        promo: true,
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        id: "3",
        userId: "2"
      },
      {
        title: "Fouth",
        desc: "Fouth Desc",
        promo: true,
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        id: "4",
        userId: "2"
      }
    ]
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    updateAd(state, { title, desc, id }) {
      const ad = state.ads.find(a => a.id === id)
      if (ad) {
        ad.title = title
        ad.desc = desc
      }
    }
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      payload.id = Math.random().toString()
      payload.userId = getters.user != null ? getters.user.id : '1'
      
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
          commit('createAd', payload)
          commit('setLoading', false, { root: true })
          return Promise.resolve()
        } else {
          await promise
          commit('setLoading', false, { root: true })
          commit('setError', 'Ошибка создания объявления', { root: true })
          throw new Error('Ошибка создания объявления')
        }
      } catch (error) {
        commit('setLoading', false, { root: true })
        commit('setError', error.message, { root: true })
        throw error
      }
    },

    async updateAd({ commit }, { title, desc, id }) {
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
          commit('updateAd', { title, desc, id })
          commit('setLoading', false, { root: true })
          return Promise.resolve()
        } else {
          await promise
          commit('setLoading', false, { root: true })
          commit('setError', 'Ошибка редактирования объявления', { root: true })
          throw new Error('Ошибка редактирования объявления')
        }
      } catch (error) {
        commit('setLoading', false, { root: true })
        commit('setError', error.message, { root: true })
        throw error
      }
    }
  },
  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds(state, getters) {
      if (!getters.user) return []
      return state.ads.filter(ad => ad.userId === getters.user.id)
    },
    adById(state) {
      return id => {
        return state.ads.find(ad => ad.id === id)
      }
    }
  }
}