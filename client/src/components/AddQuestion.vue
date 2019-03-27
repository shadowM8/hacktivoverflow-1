<template>
  <v-layout align-center justify-center>
    <v-flex xs9 >
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Ask A Question</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <form v-on:submit.prevent="addQuestion">
            <v-text-field prepend-icon="create" label="question title" type="text" v-model="title"></v-text-field>
            <div class="ma-2">
              <vue-tags-input
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"
              />
            </div>
            <div><wysiwyg  v-model="description" /></div>
            <v-btn type="submit" color="primary">Submit</v-btn>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: "AddQuestion",
  components: {
    VueTagsInput,
  },
  data: function() {
    return {
      title: "",
      description: "",
      tag: "",
      tags: []
    };
  },
  methods: {
    addQuestion() {
      let dePayLoad = {
        title: this.title,
        description: this.description,
        tags: this.tags
      };
      this.$store.dispatch("addQuestion", dePayLoad);
      this.redirect()
    },
    redirect() {
      this.$router.push({ path: "/" })
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
