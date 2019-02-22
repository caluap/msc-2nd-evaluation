<template>
  <div id="app">
    <p>OI!</p>
    <article v-for="(person, idx) in people" :key="idx">
      <p>{{ person.name }}</p>
      <p>{{ idx }}</p>
    </article>
  </div>
</template>

<script>
import { db } from "./firebase";

export default {
  name: "app",
  data() {
    return {
      people: []
    };
  },
  firestore() {
    return {
      people: db.collection("people")
    };
  }
};
</script>

<style>
</style>
