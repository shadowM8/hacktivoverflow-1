<template>
  <v-container>
    <v-layout justify-content-start row wrap>
      <v-flex my-2 class="elevation-12" xs12 v-for="(question,index) in questions" :key="index">
        <v-card>
          <v-layout>
            <v-flex xs1>
              <v-layout fill-height align-center justify-content-start row wrap>
                <v-btn flat color="blue">Vote<br><br>{{question.upvotes.length - question.downvotes.length}}</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs1>
              <v-layout fill-height align-center justify-content-start row wrap>
                <v-btn flat color="blue">Answer<br><br>{{question.answers.length}}</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout fill-height align-center justify-content-start row wrap>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">
                      <a @click="goToQuestion(question._id)">
                        <b>{{question.title}}</b>
                      </a>
                    </h3>
                    <span class="grey--text">{{question.createdBy.name}}</span>
                  </div>
                </v-card-title>
              </v-layout>
            </v-flex>
            <v-flex xs3>
              <v-layout fill-height align-center justify-content-start row wrap >
                <v-btn round class="success" v-for="tag in question.tags" :key="tag._id">
                  {{tag.name}}
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs1>
              <v-layout fill-height align-center>
                <div v-if="userId === question.createdBy._id">
                  <a @click="deleteQuestion(question._id)">
                    <v-icon>delete</v-icon>
                  </a>
                </div>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from "@/api/axios.js";
import editform from "@/components/EditForm.vue"
export default {
  components: {
    editform
  },
  data() {
    return {
      // upvotes: 0,
      // downvotes: 0
      userId: localStorage.getItem("id"),
      dialog: false
    };
  },
  methods: {
    goToQuestion(id) {
      this.$store.dispatch("goToQuestion", id);
      this.redirectQuestion(id);
    },
    redirectQuestion(id) {
      this.$router.push({ path: `/question/${id}` });
    },
    editQuestion(id) {
      console.log("edit nih");
    },
    deleteQuestion(id) {
      swal({
        title: "Warning",
        text: "Are you sure you want to delete your question?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            swal("Poof! your question is gone!", {
              icon: "success"
            });
            this.$store.dispatch("deleteQuestion", id);
          } else {
            swal("Phew, that was close one");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  }
};
</script>
