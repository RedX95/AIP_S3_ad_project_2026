<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          class="d-block mx-auto my-5"
        ></v-progress-circular>
        
        <v-card class="mt-5" v-else-if="ad">
          <v-img
            height="400px"
            :src="ad.src"
            cover
          ></v-img>
          
          <v-card-text>
            <h1 class="text--primary mb-3">{{ ad.title }}</h1>
            <p>{{ ad.desc }}</p>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <edit-ad-modal
              :ad="ad"
              v-if="isOwner"
            />
            <v-btn class="success" color="green">Buy</v-btn>
          </v-card-actions>
        </v-card>
        
        <div v-else class="text-center my-5">
          <p class="text--secondary">Ad not found</p>
          <v-btn color="primary" to="/">Go to Home</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAdModal from './EditAdModal.vue'

export default {
  components: {
    EditAdModal
  },
  props: ['id'],
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    ad() {
      return this.$store.getters.adById(this.id)
    },
    isOwner() {
      const user = this.$store.getters.user
      return user && this.ad && this.ad.userId === user.id
    }
  }
}
</script>