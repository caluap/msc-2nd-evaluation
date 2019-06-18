<template>
  <div>
    <div v-if="completedChoices" id="choices">
      <div id="audio-container">
        <p id="audio-question">Qual imagem melhor corresponde ao&nbsp;áudio?</p>
        <audio
          id="audio-player"
          controls
          :src="audio"
        >Sentimos muito, mas seu navegador não é compatível com nosso tocador de áudio!</audio>
      </div>
      <div class="choice" id="first-choice">
        <a @click="selectChoice(hash1, 1)" class="img-choice">
          <transition name="fade">
            <img id="img1" :key="img1" :src="img1">
          </transition>
          <img class="shown-but-not-really" :src="img1">
        </a>
      </div>
      <div class="choice" id="second-choice">
        <a @click="selectChoice(hash2, 2)" class="img-choice">
          <transition name="fade">
            <img id="img2" :key="img2" :src="img2">
          </transition>
          <img class="shown-but-not-really" :src="img2">
        </a>
      </div>
      <div class="likert-scale" v-if="testData.likertLevels">
        <h3>Quão confiante você está com sua escolha?</h3>
        <div class="likert-item-label" :style="likertGrid">
          <p>Pouco</p>
          <p>Razoavelmente</p>
          <p>Muito</p>
        </div>
        <div class="likert-item" :style="likertGrid">
          <div class="radio" v-for="likIndex in testData.likertLevels" :key="'lik-label-'+likIndex">
            <input
              type="radio"
              :id="'likert-'+likIndex"
              :value="normalize(likIndex, testData.likertLevels)"
              v-model="likert"
            >
            <label class="radio-label" :for="'likert-'+likIndex"></label>
          </div>
        </div>
      </div>
      <div class="c-button">
        <button
          id="choice-confirmer"
          :disabled="!currentChoice || (play_counter == 0 && !play_has_started) || (testData.likertLevels && likert === '')"
          @click="submitChoice()"
        >Confirmar escolha</button>
      </div>
      <div class="choice-number">
        <p>
          <span class="choices-made">{{ choices_made}}</span> /
          <span class="choice-limit">{{choice_limit}}</span>
        </p>
        <div class="small-notice" v-if="currentChoice">
          <p
            v-if="play_counter == 0 && !play_has_started"
          >Para enviar sua escolha é preciso ouvir o áudio pelo menos uma vez.</p>
          <p
            v-if="likert === ''"
          >Para enviar sua escolha é preciso nos dizer qual o seu grau de certeza na escolha.</p>
        </div>
      </div>
    </div>
    <div class="main-container" v-else>
      <div class="text-container">
        <h1>Você concluiu o teste!</h1>
        <p>Estamos ainda em uma etapa preliminar de nossas explorações sobre como representar a voz na tipografia, mas acreditamos que este caminho tem bastante potencial e poderá futuramente desembocar em aplicações úteis para a sociedade como um todo.</p>
        <p>Esse longo processo depende de voluntários como você. Pelo seu tempo e disposição, somos muitissimamente gratos!</p>
        <hr>
        <p>
          Caso queira trocar impressões, ficar sabendo de novidades de nossa pesquisa ou mesmo receber convites para as etapas seguintes, mande uma mensagem para
          <a
            href="mailto:paula@fee.unicamp.br"
          >paula@fee.unicamp.br</a> que a gente entra em contato.
        </p>
        <div v-if="!comment_sent" class="comment-sender">
          <p>Você pode também nos enviar algum comentário (de maneira anônima) usando o campo abaixo:</p>
          <textarea v-model="comment"></textarea>
          <button @click="submitComments()">Enviar o comentário</button>
        </div>
        <div v-else class="comment-sent">
          <p>Comentário enviado!</p>
        </div>
        <p>
          Mais uma vez, obrigado pela ajuda e até a próxima!
          <br>
          <br>:-)
        </p>
      </div>
      <!-- <a @click="logOut()" href="#">Começar de novo?</a> -->
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
      testData: general_data.data[general_data.sharedState.data],
      possible_choices: [],
      img1: "",
      hash1: "",
      img2: "",
      hash2: "",
      audio: "",
      likert: "",
      i1: -1,
      i2: -1,
      phrase: -1,
      correct_choices: 0,
      choice_limit: general_data.sharedState.rounds,
      play_counter: 0,
      play_has_started: false,
      choices_made: 0,
      initial_time: -1,
      is_inverted: false,
      currentChoice: null,
      comment_sent: false,
      comment: ""
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

    // sets up audio play counter
    let audio = document.getElementById("audio-player");
    audio.onplay = () => {
      this.play_has_started = true;
    };
    audio.onended = () => {
      this.play_counter += 1;
      this.play_has_started = false;
    };
  },
  computed: {
    likertGrid: function() {
      return (
        "grid-template-columns: repeat(" + this.testData.likertLevels + ", 1fr)"
      );
    },
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
    normalize: function(v, levels) {
      let newMax = 1,
        newMin = -1,
        min = 1,
        max = levels;
      let normV = ((v - min) / (max - min)) * (newMax - newMin) + newMin;
      return normV;
    },
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
      // document.getElementById("choice-confirmer").disabled = true;
      this.currentChoice = null;
    },
    selectChoice: function(choice, i_choice) {
      let unselected_choice = i_choice == 1 ? 2 : 1;
      document
        .getElementById("img" + i_choice)
        .classList.add("selected-choice");
      if (this.currentChoice == null) {
        // document.getElementById("choice-confirmer").disabled = false;
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
      // i'll count a play even if the participant has started but not ended
      // the audio file (a more sofisticated way of doing this could be to)
      // define a treshold before which a “play” is discarded).
      if (this.play_has_started) {
        this.play_has_started = false;
        this.play_counter += 1;
      }
      let aux_choice = {
        author_id: this.sharedState.author_id,
        initial_time: this.initial_time,
        completion_time: new Date(),
        play_counter: this.play_counter
      };

      if (this.testData.likertLevels) {
        aux_choice.likert_certainty = this.likert;
      }

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

          aux_choice.hash1 = this.hash1;
          aux_choice.hash2 = this.hash2;
          aux_choice.choice = this.currentChoice;
          aux_choice.order = this.choices_made;
          aux_choice.correct = correct;
          aux_choice.phrase = this.phrase;
          aux_choice.correct_metadata = correct_metadata;
          aux_choice.incorrect_metadata = incorrect_metadata;
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

          aux_choice.chose_the_first = chose_the_first;
          aux_choice.order = this.choices_made;
          aux_choice.phrase = this.phrase;
          aux_choice.choice_metadata = choice_metadata;
          aux_choice.rejectee_metadata = rejectee_metada;
        }

        if (!this.sharedState.offline_mode) {
          db.collection(this.testData.name)
            .add(aux_choice)
            .then(() => {
              this.choices_made++;
              this.likert = 0;
              this.removeChoices();
              this.randomChoice();
              this.initial_time = aux_choice.completion_time;
              this.play_counter = 0;
            });
        } else {
          console.log("Would have saved: ");
          console.log(aux_choice);
          this.choices_made++;
          this.likert = "";
          this.removeChoices();
          this.randomChoice();
          this.initial_time = aux_choice.completion_time;
          this.play_counter = 0;
        }
      }
    },
    submitComments: function() {
      if (!this.sharedState.offline_mode) {
        let commentData = {
          author_id: this.sharedState.author_id,
          comment: this.comment,
          test_id: this.testData.name
        };
        db.collection("comments")
          .add(commentData)
          .then(() => {
            this.comment_sent = true;
          });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
body {
  padding-top: 3rem !important;
}

.img-choice {
  position: relative;
}

.shown-but-not-really {
  visibility: hidden;
}

@media screen and (max-width: 1440px) and (min-width: 992px) {
  .img-choice img {
    max-height: 180px;
    object-fit: contain;
    background: white;
  }
}

#img1,
#img2 {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transition: opacity 0.4s ease;
}

#choices {
  grid-gap: 1.5rem;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.likert-scale {
  grid-column: 1 / -1;

  display: grid;
  grid-template-columns: 1fr minmax(320px, 4fr) 1fr;
  & > * {
    grid-column: 2;
  }

  h3 {
    font-size: 18px;
    line-height: 22px;
    font-style: italic;
    text-align: center;
    margin-bottom: 1rem;
  }
  .likert-item {
    display: grid;
    grid-gap: 1rem;
    label {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .likert-item-label {
    display: grid;
    grid-gap: 1rem;
    margin-bottom: 1rem;
    p {
      &:nth-child(2) {
        grid-column: 2 / -2;
      }
      text-align: center;
      text-transform: uppercase;
      font-size: 15px;
      & + p {
        margin: 0;
      }
    }
  }
}

// from: https://codepen.io/triss90/pen/XNEdRe

$color1: white;
$color2: #206bf8;

.radio {
  margin: 0.5rem;
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    + .radio-label {
      &:before {
        content: "";
        background: $color1;
        border-radius: 100%;
        display: inline-block;
        width: 1.4em;
        height: 1.4em;
        position: relative;
        top: -0.2em;
        margin-right: 1em;
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          background-color: $color2;
          box-shadow: none;
        }
      }
    }
    &:focus {
      + .radio-label {
        &:before {
          outline: none;
          border-color: $color2;
          box-shadow: none;
        }
      }
    }
    &:disabled {
      + .radio-label {
        &:before {
          background: darken($color1, 25%);
        }
      }
    }
    + .radio-label {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
