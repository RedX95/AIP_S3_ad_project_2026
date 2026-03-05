<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        color="warning"
        class="mr-2"
      >
        Edit
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Ad</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedTitle"
                label="Title"
                required
                :rules="[v => !!v || 'Title is required']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="editedDesc"
                label="Description"
                required
                :rules="[v => !!v || 'Description is required']"
              ></v-textarea>
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
        >
          Cancel
        </v-btn>
        <v-btn
          color="success"
          @click="saveAd"
          :loading="loading"
          :disabled="!isValid || loading"
        >
          Save
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
      editedTitle: "",
      editedDesc: ""
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    isValid() {
      return this.editedTitle && this.editedDesc
    }
  },
  watch: {
    ad: {
      immediate: true,
      handler() {
        if (this.ad) {
          this.editedTitle = this.ad.title
          this.editedDesc = this.ad.desc
        }
      }
    },
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
      if (this.ad) {
        this.editedTitle = this.ad.title
        this.editedDesc = this.ad.desc
      }
    },
    saveAd() {
      if (this.isValid) {
        const updatedAd = {
          id: this.ad.id,
          title: this.editedTitle,
          desc: this.editedDesc
        }
        
        this.$store.dispatch("updateAd", updatedAd)
          .then(() => {
            this.dialog = false
          })
          .catch(err => {
            console.log("Update error:", err)
          })
      }
    }
  }
}
</script>