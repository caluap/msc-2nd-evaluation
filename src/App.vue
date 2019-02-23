<template>
  <div id="app">
    <p>Hello, my dear {{ author_id }}</p>
    <div v-if="completedChoices" id="choices">
      <div class="choice">
        <img :src="img1">
        <button @click="makeChoice(hash1)">Este</button>
      </div>
      <div class="choice">
        <img :src="img2">
        <button @click="makeChoice(hash2)">Este</button>
      </div>
    </div>
    <div v-else>
      <p>Uau! Já foram {{choice_limit}}</p>
    </div>
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
      possible_choices: [],
      img1: "",
      hash1: "",
      img2: "",
      hash2: "",
      choices: [],
      people: [],
      newPerson: "",
      author_id: "",
      choice_limit: 20,
      initial_time: -1
    };
  },
  firestore() {
    return {
      choices: db.collection("dog_answers")
    };
  },
  computed: {
    completedChoices: function() {
      return (
        this.choices.length < this.choice_limit ||
        this.possible_choices.length == 0
      );
    }
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
    this.calculatePossibleChoices();
    this.randomChoice();
    this.initial_time = new Date();
  },
  methods: {
    calculatePossibleChoices: function() {
      for (let i = 0; i < this.options.length; i++) {
        for (let j = 0; j < this.options.length; j++) {
          if (i != j) {
            this.possible_choices.push({ i1: i, i2: j });
          }
        }
      }
    },
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
      let i = Math.floor(Math.random() * this.possible_choices.length);

      this.hash1 = this.options[this.possible_choices[i].i1].hash;
      this.hash2 = this.options[this.possible_choices[i].i2].hash;

      this.img1 = this.options[this.possible_choices[i].i1].img;
      this.img2 = this.options[this.possible_choices[i].i2].img;

      this.possible_choices.splice(i, 1);
    },
    makeChoice: function(choice) {
      let aux_choice = {
        author_id: this.author_id,
        hash1: this.hash1,
        hash2: this.hash2,
        choice: choice,
        order: this.choices.length + 1,
        initial_time: this.initial_time,
        completion_time: new Date()
      };
      this.$firestore.choices.add(aux_choice);
      this.randomChoice();
      this.initial_time = aux_choice.completion_time;
    }
  }
};
</script>

<style lang="scss">
body {
  text-align: center;
}
#choices {
  margin: 0 auto;
  max-width: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  .choice {
    display: flex;
    flex-direction: column;
    img {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
