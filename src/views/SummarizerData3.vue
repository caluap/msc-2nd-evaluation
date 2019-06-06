<template>
  <div class="main-container">
    <div class="text-container">
      <h1>Data 3, summary</h1>

      <h2 class="graph-name">Axis, by emotion</h2>
      <div
        class="graph-grid"
        v-for="(axis_list, emotion_name, index) in axisByEmotion"
        :key="'em-'+index"
      >
        <h3 class="emotion">
          {{emotion_name}}
          <span class="norm">{{sumAxis(axis_list)}}</span>
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
          class="graph-grid"
          v-for="(axis_list, emotion_name, index) in phrase_list"
          :key="'ph-'+index_phrase+'-em-'+index"
        >
          <h3 class="emotion">
            {{emotion_name}}
            <span class="norm">{{sumAxis(axis_list)}}</span>
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

      <h2 class="graph-name">Performance, por eixo</h2>
      <p>{{axisPerformance}}</p>
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

      this.filteredData.forEach(e => {
        let phrase = e.phrase;
        let emotion = e.choice_metadata.emotion;
        let chosen_axis = e.choice_metadata.axis;
        results[phrase][emotion][this.axes_key[chosen_axis]] += 1;
      });

      return results;
    },
    axisPerformance: function() {
      let results = {
        rounds: 0,
        byAxis: {
          Wei: {
            absolute: 0,
            Wid: 0,
            Ita: 0,
            _b_: 0
          },
          Wid: {
            absolute: 0,
            Wei: 0,
            Ita: 0,
            _b_: 0
          },
          Ita: {
            absolute: 0,
            Wei: 0,
            Wid: 0,
            _b_: 0
          },
          _b_: {
            absolute: 0,
            Wei: 0,
            Wid: 0,
            Ita: 0
          }
        },
        byEmotions: {
          Anger: {
            Wei: 0,
            Wid: 0,
            Ita: 0,
            _b_: 0
          },
          Happy: {
            Wei: 0,
            Wid: 0,
            Ita: 0,
            _b_: 0
          },
          Neutral: {
            Wei: 0,
            Wid: 0,
            Ita: 0,
            _b_: 0
          },
          Sad: {
            Wei: 0,
            Wid: 0,
            Ita: 0,
            _b_: 0
          },
          Surprise: {
            Wei: 0,
            Wid: 0,
            Ita: 0,
            _b_: 0
          }
        }
      };

      this.filteredData.forEach(e => {
        let winner = e.choice_metadata.axis,
          loser = e.rejectee_metadata.axis,
          emotion = e.choice_metadata.emotion;

        results.byAxis[winner].absolute += 1;
        results.byAxis[winner][loser] += 1;
        results.byEmotions[emotion][winner] += 1;
        results.rounds += 1;
      });

      return results;
    }
  }
};
</script>

<style lang="scss" scoped>
h2.graph-name {
  margin-top: 5rem;
  @at-root h1 + & {
    margin-top: 2rem;
  }
}

h3.phrase {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
h3.emotion {
  font-size: 12px;
  .norm {
    float: right;
    padding-right: 0.5rem;
    opacity: 0.6;
  }
}

.graph-grid {
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: 1fr 5fr;
  margin-top: 2px;
  align-items: center;
}
.axis-by-emotion {
  display: flex;
  width: 100%;
  li {
    text-align: right;
    font-size: 9px;
    line-height: 12px;
    flex-grow: 1;

    box-sizing: border-box;
    padding: 0.2rem 0.5rem;
    border-radius: 0.4rem;

    &.Wei {
      background: #e3d7bd;
    }
    &.Wid {
      background: #b4c1a3;
    }
    &.Ita {
      background: #89b396;
    }
    &._b_ {
      background: #84a89d;
    }
    & + li {
      margin-left: 2px;
    }
  }
}
</style>

