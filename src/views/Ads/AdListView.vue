<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        <h1 class="text--secondary mb-3 mt-3">My ads</h1>
        
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          class="d-block mx-auto my-5"
        ></v-progress-circular>
        
        <v-card 
          v-for="ad in myAds" 
          :key="ad.id" 
          class="mb-3" 
          max-width="1000"
          v-else
        >
          <v-row>
            <v-col cols="4">
              <v-img :src="ad.src" height="175px" cover></v-img>
            </v-col>
            
            <v-col cols="8">
              <h2 class="text--primary">{{ ad.title }}</h2>
              <p style="height: 85px; overflow: hidden; text-overflow: ellipsis;">
                {{ ad.desc }}
              </p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" :to="'/ad/' + ad.id">
                  Open
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
        
        <div v-if="!loading && myAds.length === 0" class="text-center my-5">
          <p class="text--secondary">You have no ads yet.</p>
          <v-btn color="primary" to="/new">Create your first ad</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    myAds() {
      return this.$store.getters.myAds
    }
  }
}
</script>