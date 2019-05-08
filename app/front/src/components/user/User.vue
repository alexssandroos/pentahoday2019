<template>
  <div>
    <formUser @saved-user="refreshList" :user="selectedUser" ref="formUser"/>
    <v-spacer></v-spacer>
    <v-card>
      <v-card-title>
        Users
        <v-btn flat @click="init">
          <v-icon>refresh</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchText"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table :headers="columnNames" :items="users" :search="searchText">
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.age }}</td>
          <td class="text-xs-right">{{ props.item.isActive }}</td>
          <td class="text-xs-right">{{ props.item.birthDate }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="update(props.item)">edit</v-icon>
            <v-icon small @click="remove(props.item)">delete</v-icon>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="info"
            icon="warning"
          >Your search for "{{ searchText }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import formUser from "./Form";
import User from "./models/User";

const _user = new User();

export default {
  name: "user",

  components: {
    formUser
  },

  data() {
    return {
      columnNames: _user.columnNames,
      users: [],
      searchText: "",
      selectedUser: []
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      _user.read(this.$api).then(r => {
        this.users = r;
      });
    },
    update(user) {
      this.selectedUser = Object.assign({}, user);
      this.$refs.formUser.setEditedIndex(this.users.indexOf(user));
      this.$refs.formUser.show();
    },
    remove(user) {
      _user.delete(this.$api, user.id);
      this.users.splice(this.users.indexOf(user), 1);
    },
    refreshList(userObject) {
      userObject["index"] > -1
        ? Object.assign(this.users[userObject["index"]], this.selectedUser)
        : this.users.push(userObject["user"]);
    }
  }
};
</script>