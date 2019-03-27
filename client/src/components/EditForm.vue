<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          
          <v-toolbar dark color="primary">
            <v-toolbar-title>Edit Form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form v-on:submit.prevent="editQuestion">
              <v-text-field
                prepend-icon="create"
                label="question title"
                type="text"
                v-model="question.title"
              ></v-text-field>
              <!-- <v-textarea
                prepend-icon="tag_faces"
                label="description"
                type="text"
                v-model="question.description"
              ></v-textarea>-->
              <template>
  <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
    />
  </div>
</template>

              <div>
                <wysiwyg v-model="question.description"/>
              </div>
              <v-btn type="submit" color="primary">Submit</v-btn>
            </form>
            <!-- <v-btn color="primary" flat @click="closeDialog">I accept</v-btn> -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  name: "editQuestionForm",
  data() {
    return {
      userId: localStorage.getItem("id"),
      // question: null,
      tag: "",
      tags: []
    };
  },
  components: {
    VueTagsInput
  },
  created(){
    this.populateTag()
  },
  methods: {
    closeDialog() {
      this.$emit("closedialog", false);
    },
    editQuestion() {
      let dePayload = {
        title: this.question.title,
        description: this.question.description,
        id: this.question._id,
        tags: this.tags
      };
      console.log('ini dikirim ke server',dePayload);
      this.$emit("closedialog", false);
      this.$store.dispatch("editQuestion", dePayload);
    },
    populateTag() {
      // payload.tags.forEach(e => {
      //       console.log('eeee',e)
      //       tag = e
      //       satuPertanyaan.tags.push({
      //         text: tag,
      //         tiClasses: ['ti-valid']
      //       })
      //       tag = ''
      //     })
      this.question.tags.forEach(tag => {
        this.tags.push({
          text : tag.text,
          tiClasses: ['ti-valid']
        })
        tag = ''
      })
    }
  },
  computed: {
    question() {
      return this.$store.state.oneQuestion;
    },
    
    }
    // tag() {
    //   this.$store.state.oneQuestion.tags.map(tag => {
    //     return tag.name
    //   })
    // }
  
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
