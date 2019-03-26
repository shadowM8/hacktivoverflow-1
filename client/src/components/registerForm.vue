<template>
  <v-layout align-center justify-center>
    <v-flex xs7>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Register Form</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <form v-on:submit.prevent="registerNow">
          <v-text-field prepend-icon="create" label="Email" type="text" v-model="email"></v-text-field>
          <v-text-field prepend-icon="tag_faces" label="Full Name" type="text" v-model="name"></v-text-field>
          <v-text-field
            prepend-icon="not_listed_location"
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field>
          <v-btn type="submit" color="primary">Submit</v-btn>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import router from '@/router.js'
export default {
  data: function() {
    return {
      email: "",
      name: "",
      password: ""
    };
  },
  methods: {
    registerNow() {
      let dePayLoad = {
        email: this.email,
        name: this.name,
        password: this.password
      };
      this.$store.dispatch("register", dePayLoad);
      // this.redirect()
    },
    redirect() {
      this.$router.push({ path: "/dashboard/" });
    }
  }
};
</script>

<style>
</style>
