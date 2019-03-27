<template>
  <div class="vh-90" style="overflow-y: scroll;">
    <h3>Questions that you tagged.</h3>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
      class="form-group vw-100"
    />
    <button @click="editTags" style="text-align: left;" class="btn btn-success">Edit Tags</button>
    <div v-if="loading">
      <hr>
      <img src="https://static.wubook.net/shstatic/imgs/cloading.gif" alt>
    </div>
    <div v-else class="mt-3" v-for="q in watchedQuestion" :key="q.id">
      <v-card>
        <v-layout>
          <v-flex xs1>
            <v-layout fill-height align-center justify-content-start row wrap>
              <v-btn flat color="blue">
                Vote
                <br>
                <br>
                {{q.upvotes.length - q.downvotes.length}}
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs1>
            <v-layout fill-height align-center justify-content-start row wrap>
              <v-btn flat color="blue">
                Answer
                <br>
                <br>
                {{q.answers.length}}
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout fill-height align-center justify-content-start row wrap>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">
                    <a @click="goToQuestion(q._id)">
                      <b>{{q.title}}</b>
                    </a>
                  </h3>
                  <span class="grey--text">{{q.createdBy.name}}</span>
                </div>
              </v-card-title>
            </v-layout>
          </v-flex>
          <v-flex xs3>
            <v-layout fill-height align-center justify-content-start row wrap>
              <v-btn v-for="tag in q.tags" :key="tag._id">{{tag.name}}</v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs1>
            <v-layout fill-height align-center>
              <div v-if="userId === q.createdBy._id">
                <a @click="deleteQuestion(q._id)">
                  <v-icon>delete</v-icon>
                </a>
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import QuestionList from "@/components/QuestionList.vue";
import VueTagsInput from "@johmun/vue-tags-input";
import server from "@/api/axios.js";
export default {
  name: "watched-tags",
  components: {
    VueTagsInput
  },
  created() {
    this.$store.dispatch("getUserInfo");
    this.$store.dispatch("getWatchedQuestion");
    this.populateTags();
  },
  data() {
    return {
      tag: "",
      tags: [],
      loading: false,
      add: [],
      reduce: [],
      userId: localStorage.getItem("id"),
    };
  },
  computed: mapState(["watchedQuestion"]),
  watch: {},
  methods: {
    populateTags() {
      console.log("ini", this.$store.state.userLogin.watchedTags.length);
      if (this.$store.state.userLogin.watchedTags.length > 0) {
        this.tags = [];
        this.loading = true;
        let meTags = this.$store.state.userLogin.watchedTags;
        meTags.forEach(tag => {
          this.tag = tag;
          this.tags.push({
            text: this.tag,
            tiClasses: ["ti-valid"]
          });
          this.tag = "";
        });
        this.loading = false;
      }
    },
    editTags() {
      server({
        url: `/users/edit-tags`,
        method: "patch",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          tags: this.tags
        }
      })
        .then(({ data }) => {
          this.$store.dispatch("getUserInfo");
          this.$store.dispatch("getWatchedQuestion");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>