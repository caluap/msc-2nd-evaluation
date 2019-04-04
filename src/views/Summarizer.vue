<template>
  <div>
    <div>
      <h2>Correct answers by Hash</h2>
      <div v-for="(item, hash) in hashes_list" :key="hash">
        <p>{{hash}} --> {{Number.parseFloat(item.correct/item.total).toFixed(2)}}</p>
      </div>
    </div>
    <hr>
    <div>
      <h2>Correct answers by emotion</h2>
      <div v-for="(item, emotion) in emotions_list" :key="emotion">
        <p>{{emotion}} {{Number.parseFloat(item.correct/item.total).toFixed(2)}}</p>
      </div>
    </div>
    <hr>
    <div>
      <h2>Correct answers by feature</h2>
      <div v-for="(item, feature) in features_list" :key="feature">
        <p>{{feature}} {{Number.parseFloat(item.correct/item.total).toFixed(2)}}</p>
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
  computed: {
    hashes_list: function() {
      let hashes = {};
      data.forEach(e => {
        if (!(e.choice in hashes)) {
          hashes[e.choice] = {
            correct: 0,
            total: 0
          };
        }
        if (e.correct) {
          hashes[e.choice].correct += 1;
        }
        hashes[e.choice].total += 1;
      });

      return hashes;
    },
    emotions_list: function() {
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
      return emotions;
    },

    features_list: function() {
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
      return features;
    }
  }
};
</script>
