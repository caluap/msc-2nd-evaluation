<template>
  <div>
    <h1>Data 3, summary</h1>
    <p>{{axisByEmotion}}</p>
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
  methods: {},
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

<style lang="sass" scoped>

</style>

