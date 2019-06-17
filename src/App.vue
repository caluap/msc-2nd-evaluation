<template>
  <div id="app">
    <router-view v-if="sharedState.author_id != '' || sharedState.offline_mode"/>
    <p v-else>Waiting for the servers to answer...</p>
  </div>
</template>

<script>
import "./assets/static/css/styles.scss";
import { db } from "./firebase";
import { firebaseApp } from "./firebase";
import { general_data } from "./data";

export default {
  name: "app",
  data() {
    return {
      sharedState: general_data.sharedState
    };
  },
  computed: {},
  created() {
    this.logIn();
  },
  methods: {
    logIn: function() {
      if (!this.sharedState.offline_mode) {
        firebaseApp
          .auth()
          .signInAnonymously()
          .then(
            user => {
              // this.author_id = user.user.uid;
              general_data.setAuthorId(user.user.uid);
              console.log("Hello, " + this.sharedState.author_id);
            },
            err => {
              console.log(err);
            }
          );
      } else {
        console.log("Beggining in offline mode.");
      }
    }
  }
};
</script>

<style lang="scss">
</style>
