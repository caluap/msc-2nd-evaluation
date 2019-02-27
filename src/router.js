import Vue from "vue";
import Router from "vue-router";
import Intro from "./views/Intro.vue";
import Evaluation from "./components/Evaluation.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/eval",
      name: "evaluation",
      component: Evaluation
    },
    {
      path: "/",
      name: "intro",
      component: Intro
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("./views/Terms.vue")
    },
    {
      path: "/quest",
      name: "questionnaire",
      component: () => import("./views/Questionnaire.vue")
    }
  ]
});
