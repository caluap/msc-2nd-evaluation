<template>
  <div>
    <div v-for="(item, hash) in hashes_list" :key="hash">
      <p>{{hash}} --> {{Number.parseFloat(item.correct/item.total).toFixed(2)}}</p>
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
            incorrect: 0,
            total: 0
          };
        }
        if (e.correct) {
          hashes[e.choice].correct += 1;
        } else {
          hashes[e.choice].incorrect += 1;
        }
        hashes[e.choice].total += 1;
      });

      return hashes;
    }
  }
};
</script>
