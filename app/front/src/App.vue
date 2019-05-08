<template>
<v-app>
<div class="pa-2" style="position:relative;top:55px;">
    <v-toolbar app flat dark color="light-blue" class="mb-1">
       <v-toolbar-title class="headline text-uppercase mr-4">
           <span>Vuejs + Sparkl</span>
       </v-toolbar-title>
    </v-toolbar>
 <v-spacer></v-spacer>
  <router-view></router-view>
</div>
</v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>
