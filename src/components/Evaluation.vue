<template>
  <div>
    <div v-if="completedChoices" id="choices">
      <div id="audio-container">
        <p id="audio-question">Quem sou eu que vos fala?</p>
        <audio id="audio-player" controls :src="audio">Your browser does not support the audio tag.</audio>
      </div>
      <div class="choice" id="first-choice">
        <a @click="makeChoice(hash1)" class="img-choice">
          <img id="img1" :src="img1">
        </a>
      </div>
      <div class="choice" id="second-choice">
        <a @click="makeChoice(hash2)" class="img-choice">
          <img id="img2" :src="img2">
        </a>
      </div>
      <div class="choice-number">
        <p>
          <span class="choices-made">{{ choices_made}}</span> /
          <span class="choice-limit">{{choice_limit}}</span>
        </p>
      </div>
    </div>
    <div v-else>
      <p>Teste concluído.</p>
      <p>Você acertou {{correct_choices}} de {{choices_made}}.</p>
      <button @click="resetTest()">Reiniciar</button>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import { general_data } from "../data";
import { db } from "../firebase";

export default {
  name: "evaluation",
  data() {
    return {
      sharedState: general_data.sharedState,
      options: [
        {
          hash: "7a8d9b",
          img: require("../assets/static/imgs/animals/cat.jpg"),
          audio: require("../assets/static/sounds/cat.mp3")
        },
        {
          hash: "94dc70",
          img: require("../assets/static/imgs/animals/cow.jpg"),
          audio: require("../assets/static/sounds/cow.mp3")
        },
        {
          hash: "fc7dfe",
          img: require("../assets/static/imgs/animals/dog.jpg"),
          audio: require("../assets/static/sounds/dog.mp3")
        },
        {
          hash: "af9377",
          img: require("../assets/static/imgs/animals/duck.jpg"),
          audio: require("../assets/static/sounds/duck.mp3")
        },
        {
          hash: "4d0db8",
          img: require("../assets/static/imgs/animals/goose.jpg"),
          audio: require("../assets/static/sounds/goose.mp3")
        },
        {
          hash: "b4a4f6",
          img: require("../assets/static/imgs/animals/pig.jpg"),
          audio: require("../assets/static/sounds/pig.mp3")
        },
        {
          hash: "3cfff0",
          img: require("../assets/static/imgs/animals/rooster.jpg"),
          audio: require("../assets/static/sounds/rooster.mp3")
        },
        {
          hash: "a086f6",
          img: require("../assets/static/imgs/animals/turkey.jpg"),
          audio: require("../assets/static/sounds/turkey.mp3")
        }
      ],
      possible_choices: [],
      img1: "",
      hash1: "",
      img2: "",
      hash2: "",
      audio: "",
      correct_choices: 0,
      choice_limit: 20,
      choices_made: 0,
      initial_time: -1
    };
  },
  mounted() {
    if (this.sharedState.author_id == "") {
      console.log("Should be logged in and isn't");
    } else {
      console.log("Starting evaluation...");
      this.calculatePossibleChoices();
      this.choices_made = 0;
      this.correct_choices = 0;
      this.randomChoice();
      this.initial_time = new Date();

      // has this user been here before?
      db.collection("dog_answers")
        .where("author_id", "==", this.sharedState.author_id)
        .get()
        .then(querySnapshot => {
          // this won't exclude random options already shown!
          this.choices_made += querySnapshot.size;
        });
    }
  },
  computed: {
    completedChoices: function() {
      if (
        this.choices_made < this.choice_limit ||
        this.possible_choices.length == 0
      ) {
        return true;
      }
      if (this.sharedState.author_id != "") {
        this.logOut();
      }
      return false;
    }
  },
  methods: {
    calculatePossibleChoices: function() {
      this.possible_choices = [];
      for (let i = 0; i < this.options.length; i++) {
        for (let j = 0; j < this.options.length; j++) {
          if (i != j) {
            this.possible_choices.push({ i1: i, i2: j });
          }
        }
      }
    },
    randomChoice: function() {
      // shuffles the options 50% of the time
      let r = Math.random();
      var choices_div = document.getElementById("choices");

      if (choices_div) {
        if (r >= 0.5) {
          choices_div.classList.add("reverse-order");
        } else {
          choices_div.classList.remove("reverse-order");
        }
      }

      let i = Math.floor(Math.random() * this.possible_choices.length);

      this.hash1 = this.options[this.possible_choices[i].i1].hash;
      this.hash2 = this.options[this.possible_choices[i].i2].hash;

      this.img1 = this.options[this.possible_choices[i].i1].img;
      this.img2 = this.options[this.possible_choices[i].i2].img;

      this.audio = this.options[this.possible_choices[i].i1].audio;
      let audio = document.getElementById("audio-player");

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      this.possible_choices.splice(i, 1);
    },
    makeChoice: function(choice) {
      let correct = choice == this.hash1;
      if (correct) {
        this.correct_choices++;
      }
      let aux_choice = {
        author_id: this.sharedState.author_id,
        hash1: this.hash1,
        hash2: this.hash2,
        choice: choice,
        order: this.choices_made,
        initial_time: this.initial_time,
        completion_time: new Date(),
        correct: correct
      };
      db.collection("dog_answers")
        .add(aux_choice)
        .then(() => {
          this.choices_made++;
          this.randomChoice();
          this.initial_time = aux_choice.completion_time;
        });
    }
  }
};
</script>
