<template>
  <div>
    <div v-if="completedChoices" id="choices">
      <div id="audio-container">
        <p id="audio-question">Qual imagem melhor corresponde ao&nbsp;áudio?</p>
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
      testData: general_data.data3,
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
      is_inverted: false,
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
      // TODO: decide if this really makes sense. maybe upon repeat
      // visits you should either reset the test or, in case the
      // person has already finished it, quit it or give the option
      // to take it again.
      if (!this.sharedState.offline_mode) {
        db.collection(this.testData.name)
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
      for (let i = 0; i < this.testData.combinations.length; i++) {
        let i1 = this.testData.combinations[i][0];
        let pc = {
          phrase: this.testData.cards[i1].phrase,
          i1: i1,
          i2: this.testData.combinations[i][1]
        };
        this.possible_choices.push(pc);
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
          this.is_inverted = true;
        } else {
          choices_div.classList.remove("reverse-order");
          this.is_inverted = false;
        }
      }

      let i = Math.floor(Math.random() * this.possible_choices.length);

      let phrase = this.possible_choices[i].phrase;
      let choice = this.possible_choices[i];

      let opt1 = this.testData.cards[choice.i1];
      let opt2 = this.testData.cards[choice.i2];

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
      if (this.sharedState.debug && this.testData.should_hits_be_measured) {
        if (this.currentChoice == this.hash1) {
          console.log("Right answer");
        } else {
          console.log("Wrong answer");
        }
      }
    },
    submitChoice: function() {
      let aux_choice;
      if (this.currentChoice) {
        // in this case, there is a right answer (meaning the participant
        // was able to correctly find which card was generated using the
        // audio file)
        if (this.testData.should_hits_be_measured) {
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
            feature: this.testData.cards[i_right].feature,
            emotion: this.testData.cards[i_right].emotion
          };
          incorrect_metadata = {
            feature: this.testData.cards[i_wrong].feature,
            emotion: this.testData.cards[i_wrong].emotion
          };

          aux_choice = {
            author_id: this.sharedState.author_id,
            hash1: this.hash1,
            hash2: this.hash2,
            choice: this.currentChoice,
            order: this.choices_made,
            initial_time: this.initial_time,
            completion_time: new Date(),
            correct: correct,
            phrase: this.phrase,
            correct_metadata: correct_metadata,
            incorrect_metadata: incorrect_metadata
          };
        } else {
          let choice_i, rejectee_i, chose_the_first, choice_hash, rejectee_hash;
          if (this.currentChoice == this.hash1) {
            // has the participant clicked on the left card?
            // (which may or not be hash1 if the positions have
            // been reversed!)
            chose_the_first = true && !this.is_inverted;

            choice_i = this.i1;
            rejectee_i = this.i2;

            choice_hash = this.hash1;
            rejectee_hash = this.hash2;
          } else {
            chose_the_first = false || this.is_inverted;
            choice_i = this.i2;
            rejectee_i = this.i1;
            choice_hash = this.hash2;
            rejectee_hash = this.hash1;
          }
          let choice_metadata = {
              feature: this.testData.cards[choice_i].feature,
              emotion: this.testData.cards[choice_i].emotion,
              axis: this.testData.cards[choice_i].axis,
              hash: choice_hash
            },
            rejectee_metada = {
              feature: this.testData.cards[rejectee_i].feature,
              emotion: this.testData.cards[rejectee_i].emotion,
              axis: this.testData.cards[rejectee_i].axis,
              hash: rejectee_hash
            };

          aux_choice = {
            author_id: this.sharedState.author_id,
            chose_the_first: chose_the_first,
            choice: this.currentChoice,
            order: this.choices_made,
            initial_time: this.initial_time,
            completion_time: new Date(),
            phrase: this.phrase,
            choice_metadata: choice_metadata,
            rejectee_metadata: rejectee_metada
          };
        }

        if (!this.sharedState.offline_mode) {
          db.collection(this.testData.name)
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
