import Vue from "vue";
import Router from "vue-router";
import Intro from "./views/Intro.vue";
import Evaluation from "./components/Evaluation.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "evaluation",
      component: Evaluation
    },
    {
      path: "/intro",
      name: "intro",
      component: Intro
    },
    {
      path: "/questionario",
      name: "questionnaire",
      component: () => import("./views/Questionnaire.vue")
    }
  ]
});
