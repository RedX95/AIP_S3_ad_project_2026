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
        
        <v-card class="mt-5" v-else>
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
            <v-btn 
              class="warning" 
              color="orange"
              @click="openEditDialog"
              v-if="isOwner"
            >
              Edit
            </v-btn>
            <v-btn class="success" color="green">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      showEditDialog: false
    }
  },
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
  },
  methods: {
    openEditDialog() {
      this.showEditDialog = true
    }
  }
}
</script>