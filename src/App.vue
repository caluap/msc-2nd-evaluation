<template>
  <div id="app">
    <router-view v-if="sharedState.author_id != '' || sharedState.offline_mode"/>
    <p v-else>Waiting for the servers to answer...</p>
  </div>
</template>

<script>
import "./assets/static/css/styles.scss";

import { ip_find_key } from "./assets/js/keys.js";
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

              // let xmlhttp = new XMLHttpRequest();
              // let ip_address = "179.159.57.90";

              // let url =
              //   "https://ipfind.co/?auth=" + ip_find_key + "&ip=" + ip_address;

              // xmlhttp.onreadystatechange = function() {
              //   if (this.readyState == 4 && this.status == 200) {
              //     var result = JSON.parse(this.responseText);
              //     db.collection("participants_data")
              //       .doc(user.user.uid)
              //       .set(result);
              //   }
              // };
              // xmlhttp.open("GET", url, true);
              // xmlhttp.send();
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
