<template>
  <div>
    <h1>Data 3, summary</h1>
    <h2>Axis by emotion</h2>
    <div v-for="(emotion_list, emotion_name, index) in axisByEmotion" :key="'em-'+index">
      <h3>{{emotion_name}}</h3>
      <ul class="axis-by-emotion">
        <li
          v-for="(axis_count, axis_name, index2) in emotion_list"
          :key="'em-'+index+'-ax-'+index2"
        >{{axis_name}} / {{Math.round(100*parseInt(axis_count)/sumAxis(emotion_list))}}%</li>
      </ul>
      <!-- <p>{{emotion_list}}</p>
      <p>{{emotion_name}}</p>-->
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import data3 from "../assets/static/data/simulated_data3.json";
export default {
  name: "summarizer-data3",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    sumAxis: function(axis_list) {
      let total = 0;
      for (let key in axis_list) {
        total += parseInt(axis_list[key]);
      }
      return total;
    }
  },
  computed: {
    axisByEmotion: function() {
      let results = {
        Anger: {},
        Happy: {},
        Neutral: {},
        Sad: {},
        Surprise: {}
      };
      data3.simulated_data.forEach(e => {
        let emotion = e.choice_metadata.emotion;
        let chosen_axis = e.choice_metadata.axis;
        if (!(chosen_axis in results[emotion])) {
          results[emotion][chosen_axis] = 0;
        }
        results[emotion][chosen_axis] += 1;
      });
      return results;
    },
    axisByPhrase: function() {}
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.axis-by-emotion {
  margin-bottom: 2rem;
  li + li {
    margin-top: 0.25rem;
  }
}
</style>

