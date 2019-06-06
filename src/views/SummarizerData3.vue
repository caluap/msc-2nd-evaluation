<template>
  <div class="main-container">
    <div class="text-container">
      <h1>Data 3, summary</h1>
      <h2 class="graph-name">Axis, by emotion</h2>
      <div v-for="(axis_list, emotion_name, index) in axisByEmotion" :key="'em-'+index">
        <h3 class="emotion">
          {{emotion_name}}
          <span class="norm">/ {{sumAxis(axis_list)}}</span>
        </h3>
        <ul class="axis-by-emotion">
          <li
            v-for="(axis, i_axis) in axis_list"
            :key="emotion_name+'-ax-'+i_axis"
            :style="{flexGrow: calcFlexGrow(axis, sumAxis(axis_list))}"
            :class="axes_names[i_axis]"
          >
            {{axes_names[i_axis]}}
            <br>
            {{calcFlexGrow(axis, sumAxis(axis_list))/100}}
          </li>
        </ul>
      </div>

      <h2 class="graph-name">Axis, by emotion, by phrase</h2>
      <div
        v-for="(phrase_list, phrase_name, index_phrase) in axisByPhrase"
        :key="'ph-'+index_phrase"
      >
        <h3 class="phrase">{{phrase_name}}</h3>
        <div
          v-for="(axis_list, emotion_name, index) in phrase_list"
          :key="'ph-'+index_phrase+'-em-'+index"
        >
          <h3 class="emotion">
            {{emotion_name}}
            <span class="norm">/ {{sumAxis(axis_list)}}</span>
          </h3>
          <ul class="axis-by-emotion">
            <li
              v-for="(axis, i_axis) in axis_list"
              :key="emotion_name+'-ax-'+i_axis"
              :style="{flexGrow: calcFlexGrow(axis, sumAxis(axis_list))}"
              :class="axes_names[i_axis]"
            >
              {{axes_names[i_axis]}}
              <br>
              <template v-if="sumAxis(axis_list) > 0">{{calcFlexGrow(axis, sumAxis(axis_list))/100}}</template>
              <template v-else>0</template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import data3 from "../assets/static/data/simulated_data3.json";
export default {
  name: "summarizer-data3",
  data() {
    return {
      raw_data: null,
      blacklist: [],
      axes_key: {
        Wei: 0,
        Wid: 1,
        Ita: 2,
        _b_: 3
      },
      axes_names: ["Wei", "Wid", "Ita", "_b_"]
    };
  },
  created() {
    this.setData(data3.simulated_data);
  },
  methods: {
    setData: function(fetchedData) {
      this.raw_data = fetchedData;
    },
    calcFlexGrow: function(axis, total) {
      let p = Math.round(100 * (parseInt(axis) / total));
      return p;
    },
    sumAxis: function(axis_list) {
      let total = 0;
      for (let i = 0; i < axis_list.length; i++) {
        total += axis_list[i];
      }
      return total;
    }
  },
  computed: {
    // here I'll return valid data. This'll exclude blacklisted
    // users, but in time I can add other criteria.
    filteredData: function() {
      let filtered_data = [];
      this.raw_data.forEach(d => {
        if (!this.blacklist.includes(d.author_id)) {
          filtered_data.push(d);
        }
      });
      return filtered_data;
    },
    axisByEmotion: function() {
      let results = {
        Anger: [0, 0, 0, 0],
        Happy: [0, 0, 0, 0],
        Neutral: [0, 0, 0, 0],
        Sad: [0, 0, 0, 0],
        Surprise: [0, 0, 0, 0]
      };
      this.filteredData.forEach(e => {
        let emotion = e.choice_metadata.emotion;
        let chosen_axis = e.choice_metadata.axis;
        results[emotion][this.axes_key[chosen_axis]] += 1;
      });
      return results;
    },
    axisByPhrase: function() {
      let results = {
        Filha: {
          Anger: [0, 0, 0, 0],
          Happy: [0, 0, 0, 0],
          Neutral: [0, 0, 0, 0],
          Sad: [0, 0, 0, 0],
          Surprise: [0, 0, 0, 0]
        },
        Passarinho: {
          Anger: [0, 0, 0, 0],
          Happy: [0, 0, 0, 0],
          Neutral: [0, 0, 0, 0],
          Sad: [0, 0, 0, 0],
          Surprise: [0, 0, 0, 0]
        }
      };
      return results;
    }
  }
};
</script>

<style lang="scss" scoped>
h2.graph-name {
  margin-top: 9rem;
  @at-root h1 + & {
    margin-top: 3rem;
  }
}

h3.phrase {
  margin-top: 2rem;
}
h3.emotion {
  font-size: 12px;
  margin: 0.6rem 0;
  .norm {
    opacity: 0.6;
  }
}
.axis-by-emotion {
  margin-bottom: 1rem;
  display: flex;
  width: 100%;
  li {
    text-align: center;
    font-size: 11px;
    line-height: 15px;
    flex-grow: 1;

    box-sizing: border-box;
    padding: 0.5rem 0;
    border-radius: 0.4rem;

    &.Wei {
      background: #e3d7bd;
    }
    &.Wid {
      background: #b4c1a3;
    }
    &.Ita {
      background: #90b389;
    }
    &._b_ {
      background: #7b8e70;
    }
    & + li {
      margin-left: 2px;
    }
  }
}
</style>

