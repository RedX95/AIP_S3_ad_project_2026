<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        <h1 class="text--secondary mb-3 mt-3">Orders</h1>
        
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          class="d-block mx-auto my-5"
        ></v-progress-circular>
        
        <v-list v-else-if="orders.length > 0" subheader two-line flat>
          <v-list-item
            v-for="order in orders"
            :key="order.id"
          >
            <template v-slot:prepend>
              <v-list-item-action>
                <v-checkbox
                  :model-value="order.done"
                  color="primary"
                  @click="toggleOrderStatus(order)"
                  :loading="order.updating"
                  :disabled="order.updating"
                ></v-checkbox>
              </v-list-item-action>
            </template>
            
            <v-list-item-content>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
            </v-list-item-content>
            
            <template v-slot:append>
              <v-list-item-action>
                <v-btn 
                  class="primary" 
                  :to="'/ad/' + order.adId"
                  :disabled="order.updating"
                >
                  Open
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
        
        <div v-else-if="!loading" class="text-center my-5">
          <p class="text--secondary">No orders yet</p>
          <v-btn color="primary" to="/">Browse ads</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      updatingOrders: {}
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    orders() {
      return this.$store.getters.orders.map(order => ({
        ...order,
        updating: this.updatingOrders[order.id] || false
      }))
    }
  },
  methods: {
    toggleOrderStatus(order) {
      // Устанавливаем флаг обновления для этого заказа
      this.$set(this.updatingOrders, order.id, true)
      
      this.$store.dispatch("markOrderDone", order.id)
        .finally(() => {
          // Снимаем флаг обновления
          this.$set(this.updatingOrders, order.id, false)
        })
    }
  }
}
</script>