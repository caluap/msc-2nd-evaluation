<template>
  <div>
    <div>
      <h2>Identification rate by hash</h2>
      <div v-for="(item, hash) in hashesList" :key="hash">
        <p>
          {{hash}} / {{item.phrase}} ({{item.emotion}}):
          <span
            v-bind:class="reasonablenesOfMarginOfError(item.stdErr)"
          >{{Number.parseFloat(item.correct/item.total).toFixed(2)}} ± {{Number.parseFloat(item.stdErr).toFixed(2)}}</span>
          [n={{item.total}}]
          <!-- <br> -->
          <!-- <span>possibly {{Number.parseFloat(item.min).toFixed(2)}}—{{Number.parseFloat(item.max).toFixed(2)}}</span> -->
        </p>
        <br>
      </div>
    </div>
    <hr>
    <div>
      <h2>Identification rate by emotion</h2>
      <div v-for="(item, emotion) in emotionsList" :key="emotion">
        <p>
          {{emotion}} :
          <span
            v-bind:class="reasonablenesOfMarginOfError(item.stdErr)"
          >{{Number.parseFloat(item.correct/item.total).toFixed(2)}} ± {{Number.parseFloat(item.stdErr).toFixed(2)}}</span>
          [n={{item.total}}]
          <!-- <br> -->
          <!-- <span>possibly {{Number.parseFloat(item.min).toFixed(2)}}—{{Number.parseFloat(item.max).toFixed(2)}}</span> -->
        </p>
        <br>
      </div>
    </div>
    <hr>
    <div>
      <h2>Identification rate by feature</h2>
      <div v-for="(item, feature) in featuresList" :key="feature">
        <p>
          {{feature}} :
          <span
            v-bind:class="reasonablenesOfMarginOfError(item.stdErr)"
          >{{Number.parseFloat(item.correct/item.total).toFixed(2)}} ± {{Number.parseFloat(item.stdErr).toFixed(2)}}</span>
          [n={{item.total}}]
          <!-- <br> -->
          <!-- <span>possibly {{Number.parseFloat(item.min).toFixed(2)}}—{{Number.parseFloat(item.max).toFixed(2)}}</span> -->
        </p>
        <br>
      </div>
    </div>
    <hr>
    <div>
      <h2>Identification rate by phrase</h2>
      <div v-for="(item, phrase) in phrasesList" :key="phrase">
        <p>
          {{phrase}} :
          <span
            v-bind:class="reasonablenesOfMarginOfError(item.stdErr)"
          >{{Number.parseFloat(item.correct/item.total).toFixed(2)}} ± {{Number.parseFloat(item.stdErr).toFixed(2)}}</span>
          [n={{item.total}}]
          <!-- <br> -->
          <!-- <span>possibly {{Number.parseFloat(item.min).toFixed(2)}}—{{Number.parseFloat(item.max).toFixed(2)}}</span> -->
        </p>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import data from "../assets/static/data/dummy_data.json";
export default {
  name: "summarizer",
  data() {
    return {};
  },
  mounted() {
    // console.log(data[0]);
  },
  methods: {
    stdErr: function(effect, n) {
      let z = 1.96; // +/- 2,5%
      // let z = 1.64;
      return z * Math.sqrt((effect * (1 - effect)) / n);
    },
    reasonablenesOfMarginOfError: function(m) {
      if (m <= 0.04) {
        return "great-margin";
      } else if (m <= 0.08) {
        return "ok-margin";
      }
      return "bad-margin";
    }
  },
  computed: {
    hashesList: function() {
      let hashes = {};
      data.forEach(e => {
        if (!(e.choice in hashes)) {
          let em;
          if (e.correct) {
            em = e.correct_metadata.emotion;
          } else {
            em = e.incorrect_metadata.emotion;
          }
          hashes[e.choice] = {
            correct: 0,
            total: 0,
            phrase: e.phrase,
            emotion: em
          };
        }
        if (e.correct) {
          hashes[e.choice].correct += 1;
        }
        hashes[e.choice].total += 1;
      });

      for (let hash in hashes) {
        let item = hashes[hash];
        let measured_effect = item.correct / item.total;
        let error = this.stdErr(measured_effect, item.total);
        item.min = measured_effect - error;
        item.max = measured_effect + error;
        item.stdErr = error;
      }

      return hashes;
    },
    emotionsList: function() {
      let emotions = {};
      data.forEach(e => {
        let em;
        if (e.correct) {
          em = e.correct_metadata.emotion;
        } else {
          em = e.incorrect_metadata.emotion;
        }
        if (!(em in emotions)) {
          emotions[em] = {
            correct: 0,
            total: 0
          };
        }
        if (e.correct) {
          emotions[em].correct += 1;
        }
        emotions[em].total += 1;
      });

      for (let emotion in emotions) {
        let item = emotions[emotion];
        let measured_effect = item.correct / item.total;
        let error = this.stdErr(measured_effect, item.total);
        item.min = measured_effect - error;
        item.max = measured_effect + error;
        item.stdErr = error;
      }
      return emotions;
    },

    featuresList: function() {
      let features = {};
      data.forEach(e => {
        let feat;
        if (e.correct) {
          feat = e.correct_metadata.feature;
        } else {
          feat = e.incorrect_metadata.feature;
        }
        if (!(feat in features)) {
          features[feat] = {
            correct: 0,
            total: 0
          };
        }
        if (e.correct) {
          features[feat].correct += 1;
        }
        features[feat].total += 1;
      });

      for (let feature in features) {
        let item = features[feature];
        let measured_effect = item.correct / item.total;
        let error = this.stdErr(measured_effect, item.total);
        item.min = measured_effect - error;
        item.max = measured_effect + error;
        item.stdErr = error;
      }
      return features;
    },
    phrasesList: function() {
      let phrases = {};
      data.forEach(e => {
        if (!(e.phrase in phrases)) {
          phrases[e.phrase] = {
            correct: 0,
            total: 0
          };
        }
        if (e.correct) {
          phrases[e.phrase].correct += 1;
        }
        phrases[e.phrase].total += 1;
      });

      for (let phrase in phrases) {
        let item = phrases[phrase];
        let measured_effect = item.correct / item.total;
        let error = this.stdErr(measured_effect, item.total);
        item.min = measured_effect - error;
        item.max = measured_effect + error;
        item.stdErr = error;
      }

      return phrases;
    }
  }
};
</script>
