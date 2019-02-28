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
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import { general_data } from "../data";
import { dataRef } from "../data";
import { db } from "../firebase";

export default {
  name: "evaluation",
  data() {
    return {
      sharedState: general_data.sharedState,
      cardsData: general_data.cardsData,
      possible_choices: [],
      img1: "",
      hash1: "",
      img2: "",
      hash2: "",
      audio: "",
      i1: -1,
      i2: -1,
      phrase: -1,
      correct_choices: 0,
      choice_limit: 20,
      choices_made: 0,
      initial_time: -1
    };
  },
  mounted() {
    // there's no XOR!
    if (
      (this.sharedState.author_id == "" || this.sharedState.offline_mode) &&
      !(this.sharedState.author_id == "" && this.sharedState.offline_mode)
    ) {
      console.log("Should be logged in and isn't");
    } else {
      console.log("Starting evaluation...");
      this.calculatePossibleChoices();
      this.choices_made = 0;
      this.correct_choices = 0;
      this.randomChoice();
      this.initial_time = new Date();

      // has this user been here before?
      if (!this.sharedState.offline_mode) {
        db.collection("card_answers")
          .where("author_id", "==", this.sharedState.author_id)
          .get()
          .then(querySnapshot => {
            // this won't exclude random options already shown!
            this.choices_made += querySnapshot.size;
          });
      }
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
      for (let phr = 0; phr < this.cardsData.length; phr++) {
        for (let i = 0; i < this.cardsData[phr].data.length; i++) {
          for (let j = 0; j < this.cardsData[phr].data.length; j++) {
            if (i != j) {
              let pc = {
                phrase: phr,
                i1: i,
                i2: j
              };
              this.possible_choices.push(pc);
            }
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

      let opt1 = this.cardsData[this.possible_choices[i].phrase].data[
        this.possible_choices[i].i1
      ];
      let opt2 = this.cardsData[this.possible_choices[i].phrase].data[
        this.possible_choices[i].i2
      ];

      // save the indices to retriev the metadata later...
      this.i1 = this.possible_choices[i].i1;
      this.i2 = this.possible_choices[i].i2;
      this.phrase = this.possible_choices[i].phrase;

      this.hash1 = opt1.hash;
      this.hash2 = opt2.hash;

      this.img1 = opt1.img;
      this.img2 = opt2.img;

      this.audio = opt1.audio;
      let audio = document.getElementById("audio-player");

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      this.possible_choices.splice(i, 1);
    },
    makeChoice: function(choice) {
      let correct = choice == this.hash1;
      let correct_metadata, incorrect_metadata;
      let i_right, i_wrong;

      if (correct) {
        this.correct_choices++;
        i_right = this.i1;
        i_wrong = this.i2;
      } else {
        i_right = this.i2;
        i_wrong = this.i1;
      }

      correct_metadata = {
        feature: this.cardsData[this.phrase].data[i_right].feature,
        emotion: this.cardsData[this.phrase].data[i_right].emotion
      };
      incorrect_metadata = {
        feature: this.cardsData[this.phrase].data[i_wrong].feature,
        emotion: this.cardsData[this.phrase].data[i_wrong].emotion
      };

      let aux_choice = {
        author_id: this.sharedState.author_id,
        hash1: this.hash1,
        hash2: this.hash2,
        choice: choice,
        order: this.choices_made,
        initial_time: this.initial_time,
        completion_time: new Date(),
        correct: correct,
        phrase: this.cardsData[this.phrase].phrase,
        correct_metadata: correct_metadata,
        incorrect_metadata: incorrect_metadata
      };
      if (!this.sharedState.offline_mode) {
        db.collection("card_answers")
          .add(aux_choice)
          .then(() => {
            this.choices_made++;
            this.randomChoice();
            this.initial_time = aux_choice.completion_time;
          });
      } else {
        this.choices_made++;
        this.randomChoice();
        this.initial_time = aux_choice.completion_time;
      }
    }
  }
};
</script>
