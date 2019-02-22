<template>
  <div id="app">
    <p>Hello, my dear {{ author_id }}</p>
    <div id="choices">
      <div class="choice">
        <img :src="img1">
        <button @click="makeChoice(hash1)">Este</button>
      </div>
      <div class="choice">
        <img :src="img2">
        <button @click="makeChoice(hash2)">Este</button>
      </div>
    </div>
    <!-- <div v-if="n_choices < choices.length">
      <button @click="makeChoice(0)">{{choices[choice_id].op_a}}</button>
      <button @click="makeChoice(1)">{{choices[choice_id].op_b}}</button>
    </div>
    <div v-else>
      <p>Oi!</p>
    </div>-->
  </div>
</template>

<script>
import { db } from "./firebase";
import { firebaseApp } from "./firebase";

export default {
  name: "app",
  data() {
    return {
      options: [
        {
          hash: "7a8d9b",
          img: require("./assets/static/imgs/dogs/7a8d9b.jpg"),
          audio: ""
        },
        {
          hash: "94dc70",
          img: require("./assets/static/imgs/dogs/94dc70.jpg"),
          audio: ""
        },
        {
          hash: "fc7dfe",
          img: require("./assets/static/imgs/dogs/fc7dfe.jpg"),
          audio: ""
        },
        {
          hash: "af9377",
          img: require("./assets/static/imgs/dogs/af9377.jpg"),
          audio: ""
        },
        {
          hash: "4d0db8",
          img: require("./assets/static/imgs/dogs/4d0db8.jpg"),
          audio: ""
        },
        {
          hash: "b4a4f6",
          img: require("./assets/static/imgs/dogs/b4a4f6.jpg"),
          audio: ""
        },
        {
          hash: "3cfff0",
          img: require("./assets/static/imgs/dogs/3cfff0.jpg"),
          audio: ""
        },
        {
          hash: "a086f6",
          img: require("./assets/static/imgs/dogs/a086f6.jpg"),
          audio: ""
        }
      ],
      img1: "",
      hash1: "",
      img2: "",
      hash2: "",
      choices: [],

      people: [],
      newPerson: "",
      author_id: ""
    };
  },
  firestore() {
    return {
      people: db.collection("people")
    };
  },
  created() {
    firebaseApp
      .auth()
      .signInAnonymously()
      .then(
        user => {
          this.author_id = user.user.uid;
        },
        err => {
          console.log(err);
        }
      );
    this.randomChoice();
  },
  methods: {
    addPerson: function() {
      this.$firestore.people.add({
        name: this.newPerson,
        timestamp: new Date()
      });
      this.newPerson = "";
    },
    deletePerson: function(person) {
      this.$firestore.people.doc(person[".key"]).delete();
    },
    randomChoice: function() {
      let found_combination;
      let i1 = Math.floor(Math.random() * this.options.length);
      let i2 = i1;
      do {
        found_combination = true;
        do {
          i2 = Math.floor(Math.random() * this.options.length);
        } while (i1 == i2);
        // has this random combination been used before?
        for (let i = 0; i < this.choices.length; i++) {
          // I'll assume for now that the first hash would always be the right one,
          // so A+B options is different than B+A — which in the future might not
          // still be the case
          if (
            this.options[i1].hash == this.choices[i].hash1 &&
            this.options[i2].hash == this.choices[i].hash2
          ) {
            found_combination = false;
          }
        }
      } while (!found_combination);

      this.hash1 = this.options[i1].hash;
      this.hash2 = this.options[i2].hash;

      this.img1 = this.options[i1].img;
      this.img2 = this.options[i2].img;
    },
    makeChoice: function(i) {
      // this.choices[this.choice_id].choice = i;
      // this.n_choices += 1;
      // this.randomChoice();
    }
  }
};
</script>

<style>
</style>
