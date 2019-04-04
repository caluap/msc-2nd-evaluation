<template>
  <div>
    <p>Freinds</p>
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
    console.log(data[0]);
  }
};
</script>
