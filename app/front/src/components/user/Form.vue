<template>
  <div>
    <v-layout row right>
      <v-btn  fab top right color="secondary" dark fixed k @click="show()">
        <v-icon>add</v-icon>
      </v-btn>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click="close">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="save(user)">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm6 md4 v-if="editedIndex!==-1">
                <v-text-field v-model="user.id" label="Id" readonly ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="user.name" label="Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="user.age" label="Age"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="user.isActive" label="Is Active"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="user.birthDate" label="Birth Date"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import User from "./models/User";
const _user = new User();

export default {
  name: "formUser",
  data() {
    return {
      editedIndex: -1,
      dialog: false
    };
  },
  props: {
    user: Object
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    }
  },
  methods:{
    close () {
      this.dialog = false
      this.user = {}
      this.editedIndex = -1
    },
    show(){
      this.dialog = true
    },
    setEditedIndex(newIndex){
      this.editedIndex = newIndex
    },
    save(user){
      _user.save(this.$api, user, this.editedIndex)
      this.$emit('saved-user', {'index': this.editedIndex, 'user': user })
      this.close()
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
};
</script>

<style>
</style>
