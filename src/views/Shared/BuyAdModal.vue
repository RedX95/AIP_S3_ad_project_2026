<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        color="success"
        class="ml-2"
      >
        Buy
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Do you want to buy it?</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
                            <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Your name"
                  required
                  :rules="[v => !!v || 'Name is required']"
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  label="Your phone"
                  required
                  :rules="[v => !!v || 'Phone is required']"
                  prepend-icon="mdi-phone"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="closeDialog"
            :disabled="localLoading"
          >
            Close
          </v-btn>
          <v-btn
            color="success"
            @click="createOrder"
            :loading="localLoading"
            :disabled="!isValid || localLoading"
          >
            Buy it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <script>
  export default {
    props: {
      ad: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        dialog: false,
        name: "",
        phone: "",
        localLoading: false
      }
    },
    computed: {
      isValid() {
        return this.name && this.phone
      }
    },
    watch: {
      dialog(val) {
        if (!val) {
          this.resetForm()
        }
      }
    },
    methods: {
      closeDialog() {
        this.dialog = false
      },
      resetForm() {
        this.name = ""
        this.phone = ""
        this.localLoading = false
      },
      createOrder() {
        if (this.isValid) {
          this.localLoading = true
          
          const order = {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            userId: this.ad.userId
          }
          
          this.$store.dispatch("createOrder", order)
            .finally(() => {
              this.localLoading = false
              this.dialog = false
            })
        }
      }
    }
  }
  </script>