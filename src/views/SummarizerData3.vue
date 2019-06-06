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
        <h4>
          {{emotion_name}}
          <span class="norm">{{sumAxis(axis_list)}}</span>
        </h4>
        <ul class="axis-distribution-graph">
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
        <h3>{{phrase_name}}</h3>
        <div
          class="graph-grid"
          v-for="(axis_list, emotion_name, index) in phrase_list"
          :key="'ph-'+index_phrase+'-em-'+index"
        >
          <h4>
            {{emotion_name}}
            <span class="norm">{{sumAxis(axis_list)}}</span>
          </h4>
          <ul class="axis-distribution-graph">
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

      <h2 class="graph-name">Performance</h2>
      <h3>Por eixo</h3>
      <div
        class="graph-grid"
        v-for="(axis_obj, axis_name, axis_index) in axisPerformance.byAxis"
        :key="'perf-ax-'+axis_index"
      >
        <h4>
          {{axis_name}}
          <span class="norm">{{axis_obj.totalAppearances}}</span>
        </h4>
        <div class="graph-joiner">
          <ul class="axis-distribution-graph">
            <li :class="'main-axis'">
              <em>{{axis_name}}</em>
              : {{axis_obj.absolute}} ({{calcFlexGrow(axis_obj.absolute, axis_obj.totalAppearances)/100}})
              / {{axis_obj.totalAppearances - axis_obj.absolute}} ({{calcFlexGrow(axis_obj.totalAppearances-axis_obj.absolute, axis_obj.totalAppearances)/100}})
            </li>
          </ul>
          <ul class="axis-distribution-graph">
            <li
              v-for="(sub_ax, sub_ax_name, sub_ax_index) in axis_obj.againstOtherAxes"
              :key="'perf-ax-'+axis_name+'-sub-'+sub_ax_name+'-'+sub_ax_index"
              :style="{flexGrow: calcFlexGrow(sub_ax, axis_obj.absolute)}"
              :class="sub_ax_name"
            >
              vs
              <em>{{sub_ax_name}}</em>
              :
              {{sub_ax}}
              ({{calcFlexGrow(sub_ax, axis_obj.absolute)/100}})
            </li>
          </ul>
        </div>
      </div>

      <h3>Por emoção</h3>
      <div
        class="graph-grid"
        v-for="(emo_obj, emo_name, emo_index) in axisPerformance.byEmotion"
        :key="'perf-emo-'+emo_index"
      >
        <h4>
          {{emo_name}}
          <span class="norm">{{emo_obj.totalAppearances}}</span>
        </h4>
        <ul class="axis-distribution-graph">
          <li
            v-for="(ax, ax_name, ax_index) in emo_obj.axes"
            :key="'perf-em-'+emo_name+'-'+ax_name+'-'+ax_index"
            :style="{flexGrow: calcFlexGrow(ax, emo_obj.totalAppearances)}"
            :class="ax_name"
          >
            {{ax_name}}
            <br>
            {{calcFlexGrow(ax, emo_obj.totalAppearances)/100}}
          </li>
        </ul>
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
            totalAppearances: 0,
            absolute: 0,
            againstOtherAxes: {
              Wid: 0,
              Ita: 0,
              _b_: 0
            }
          },
          Wid: {
            totalAppearances: 0,
            absolute: 0,
            againstOtherAxes: {
              Wei: 0,
              Ita: 0,
              _b_: 0
            }
          },
          Ita: {
            totalAppearances: 0,
            absolute: 0,
            againstOtherAxes: {
              Wei: 0,
              Wid: 0,
              _b_: 0
            }
          },
          _b_: {
            totalAppearances: 0,
            absolute: 0,
            againstOtherAxes: {
              Wei: 0,
              Wid: 0,
              Ita: 0
            }
          }
        },
        byEmotion: {
          Anger: {
            totalAppearances: 0,
            axes: {
              Wei: 0,
              Wid: 0,
              Ita: 0,
              _b_: 0
            }
          },
          Happy: {
            totalAppearances: 0,
            axes: {
              Wei: 0,
              Wid: 0,
              Ita: 0,
              _b_: 0
            }
          },
          Neutral: {
            totalAppearances: 0,
            axes: {
              Wei: 0,
              Wid: 0,
              Ita: 0,
              _b_: 0
            }
          },
          Sad: {
            totalAppearances: 0,
            axes: {
              Wei: 0,
              Wid: 0,
              Ita: 0,
              _b_: 0
            }
          },
          Surprise: {
            totalAppearances: 0,
            axes: {
              Wei: 0,
              Wid: 0,
              Ita: 0,
              _b_: 0
            }
          }
        }
      };

      this.filteredData.forEach(e => {
        let winner = e.choice_metadata.axis,
          loser = e.rejectee_metadata.axis,
          emotion = e.choice_metadata.emotion;

        // axes
        results.byAxis[winner].absolute += 1;
        results.byAxis[winner].againstOtherAxes[loser] += 1;

        results.byAxis[winner].totalAppearances += 1;
        results.byAxis[loser].totalAppearances += 1;

        // emotions
        results.byEmotion[emotion].axes[winner] += 1;
        results.byEmotion[emotion].totalAppearances += 1;

        results.rounds += 1;
      });

      return results;
    }
  }
};
</script>

<style lang="scss" scoped>
$mar_g: 2px;

em {
  font-style: italic;
}

h2.graph-name {
  margin-top: 5rem;
  @at-root h1 + & {
    margin-top: 2rem;
  }
}

h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
h4 {
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
  margin-top: $mar_g;
  align-items: center;
}

.axis-distribution-graph {
  & + .axis-distribution-graph {
    margin-top: $mar_g;
    padding-bottom: $mar_g * 3;
  }
  display: flex;
  width: 100%;
  li {
    text-align: right;
    font-size: 9px;
    line-height: 12px;
    flex-grow: 1;

    box-sizing: border-box;
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      border: 1px solid black;
      mix-blend-mode: multiply;
      opacity: 0.1;
      border-radius: 0.2rem;
    }

    &.main-axis {
      background: #ccc;
    }

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
      margin-left: $mar_g;
    }
  }
}
</style>

