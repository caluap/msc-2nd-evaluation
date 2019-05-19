<template>
  <div>
    <div v-if="completedChoices" id="choices">
      <div id="audio-container">
        <p id="audio-question">Qual frase corresponde ao&nbsp;áudio?</p>
        <audio id="audio-player" controls :src="audio">Your browser does not support the audio tag.</audio>
      </div>
      <div class="choice" id="first-choice">
        <a @click="selectChoice(hash1, 1)" class="img-choice">
          <img id="img1" :src="img1">
        </a>
      </div>
      <div class="choice" id="second-choice">
        <a @click="selectChoice(hash2, 2)" class="img-choice">
          <img id="img2" :src="img2">
        </a>
      </div>
      <div class="c-button">
        <button id="choice-confirmer" disabled @click="submitChoice()">Confirmar escolha</button>
      </div>
      <div class="choice-number">
        <p>
          <span class="choices-made">{{ choices_made}}</span> /
          <span class="choice-limit">{{choice_limit}}</span>
        </p>
      </div>
    </div>
    <div v-else>
      <h1>Teste concluído.</h1>
      <p>Você acertou {{correct_choices}} de {{choices_made}}.</p>
      <br>
      <a @click="logOut()" href="#">Começar de novo?</a>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import { general_data } from "../data";
import { dataRef } from "../data";
import { db } from "../firebase";
import { firebaseApp } from "../firebase";
import { router } from "../router";

export default {
  name: "evaluation",
  data() {
    return {
      sharedState: general_data.sharedState,
      eval2Data: general_data.eval2Data,
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
      initial_time: -1,
      currentChoice: null
    };
  },
  mounted() {
    // can't be here unless terms were accepted
    if (this.sharedState.accepted_terms == false) {
      this.$router.push("terms");
    }

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
      // if (this.sharedState.author_id != "") {
      //   this.logOut();
      // }
      return false;
    }
  },
  methods: {
    logOut: function() {
      if (!this.sharedState.offline_mode) {
        console.log("Goodbye, dear friend.");
        firebaseApp
          .auth()
          .signOut()
          .then(() => {
            this.sharedState.author_id = "";
            this.sharedState.accepted_terms = false;
            window.location.href = "/";
          });
      }
    },
    /* 
      Creates an array (this.possible_choices) with indexes pointing
      to pairs of cards where the phrase is the same but that were 
      created with different audio files.

      It doesn't forbid there to be cards with the same feature, so
      it is possible to have a pair or RMSs or Pitches.
    */
    calculatePossibleChoices: function() {
      this.possible_choices = [];
      for (let phr = 0; phr < this.eval2Data.length; phr++) {
        for (let i = 0; i < this.eval2Data[phr].data.length; i++) {
          for (let j = 0; j < this.eval2Data[phr].data.length; j++) {
            let card1 = this.eval2Data[phr].data[i];
            let card2 = this.eval2Data[phr].data[j];

            // it can't be paired with itself (obviously), but also it
            // can't be paired with a card created after the same sound
            // file (for instance: if i'm comparing different features
            // of the same audio, there isn't a wrong answer, which can't be!)
            if (card1.audio != card2.audio) {
              // To make selection easier, I'll only allow options where one of
              // the choices is “Neutral”, but not the other.
              if (
                (card1.emotion == "Neutral" || card2.emotion == "Neutral") &&
                !(card1.emotion == "Neutral" && card2.emotion == "Neutral")
              ) {
                // if (card1.feature == card2.feature) {
                let pc = {
                  phrase: phr,
                  i1: i,
                  i2: j
                };
                this.possible_choices.push(pc);
                // }
              }
            }
          }
        }
      }
    },
    /* 
      This function picks a random option from the possible_choices
      array of indexes. Sometimes the correct answer (meaning the card
      whose origin audio is the one being played) will be the one the 
      left, sometimes the one on the right.
    */
    randomChoice: function() {
      // shuffles the position of options 50% of the time
      let r = Math.random();
      var choices_div = document.getElementById("choices");

      // the shuffling is done by css. I believe there isn't
      // a perceptible lag, but I should test this.
      if (choices_div) {
        if (r >= 0.5) {
          choices_div.classList.add("reverse-order");
        } else {
          choices_div.classList.remove("reverse-order");
        }
      }

      let i = Math.floor(Math.random() * this.possible_choices.length);

      let phrase = this.possible_choices[i].phrase;
      let choice = this.possible_choices[i];

      let opt1 = this.eval2Data[phrase].data[choice.i1];
      let opt2 = this.eval2Data[phrase].data[choice.i2];

      // save the indices to retrieve the metadata later...
      this.i1 = choice.i1;
      this.i2 = choice.i2;
      this.phrase = phrase;

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

      if (this.sharedState.debug) {
        console.log(opt1.feature + " / " + opt1.emotion);
      }

      // removes used choice from future possibilities
      this.possible_choices.splice(i, 1);
    },
    removeChoices: function() {
      document.getElementById("img1").classList.remove("selected-choice");
      document.getElementById("img2").classList.remove("selected-choice");
      document.getElementById("choice-confirmer").disabled = true;
      this.currentChoice = null;
    },
    selectChoice: function(choice, i_choice) {
      let unselected_choice = i_choice == 1 ? 2 : 1;
      document
        .getElementById("img" + i_choice)
        .classList.add("selected-choice");
      if (this.currentChoice == null) {
        document.getElementById("choice-confirmer").disabled = false;
      }
      document
        .getElementById("img" + unselected_choice)
        .classList.remove("selected-choice");
      this.currentChoice = choice;
      if (this.sharedState.debug) {
        if (this.currentChoice == this.hash1) {
          console.log("Right answer");
        } else {
          console.log("Wrong answer");
        }
      }
    },
    submitChoice: function() {
      if (this.currentChoice) {
        let correct = this.currentChoice == this.hash1;
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
          feature: this.eval2Data[this.phrase].data[i_right].feature,
          emotion: this.eval2Data[this.phrase].data[i_right].emotion
        };
        incorrect_metadata = {
          feature: this.eval2Data[this.phrase].data[i_wrong].feature,
          emotion: this.eval2Data[this.phrase].data[i_wrong].emotion
        };

        let aux_choice = {
          author_id: this.sharedState.author_id,
          hash1: this.hash1,
          hash2: this.hash2,
          choice: this.currentChoice,
          order: this.choices_made,
          initial_time: this.initial_time,
          completion_time: new Date(),
          correct: correct,
          phrase: this.eval2Data[this.phrase].phrase,
          correct_metadata: correct_metadata,
          incorrect_metadata: incorrect_metadata
        };
        if (!this.sharedState.offline_mode) {
          db.collection("card_answers")
            .add(aux_choice)
            .then(() => {
              this.choices_made++;
              this.removeChoices();
              this.randomChoice();
              this.initial_time = aux_choice.completion_time;
            });
        } else {
          this.choices_made++;
          this.removeChoices();
          this.randomChoice();
          this.initial_time = aux_choice.completion_time;
        }
      }
    }
  }
};
</script>
