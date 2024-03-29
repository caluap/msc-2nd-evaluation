<template>
  <div class="main-container" v-if="raw_data != null">
    <div class="text-container">
      <h1>{{dataName}}, summary</h1>

      <div v-if="dataName == 'data4'" id="likert-weights">
        <label>
          When “Pouco”, winner gets
          <input
            min="0.51"
            max="1"
            type="number"
            step="0.1"
            v-model="likertWeights[0]"
          />
          and&nbsp;loser&nbsp;gets
          <strong>{{likertLoser(likertWeights[0])}}</strong>.
        </label>
        <label>
          When “Razoavelmente”, winner gets
          <input
            min="0.51"
            max="1"
            type="number"
            step="0.1"
            v-model="likertWeights[1]"
          />
          and&nbsp;loser&nbsp;gets
          <strong>{{likertLoser(likertWeights[1])}}</strong>.
        </label>
        <label>
          When “Muito”, winner gets
          <input
            min="0.51"
            max="1"
            type="number"
            step="0.1"
            v-model="likertWeights[2]"
          />
          and&nbsp;loser&nbsp;gets
          <strong>{{likertLoser(likertWeights[2])}}</strong>.
        </label>
      </div>

      <div id="axes-perf-controls">
        <label for="axes-perf">
          Show axes' performance:
          <input type="checkbox" id="axes-perf" v-model="showSubAxes" />
        </label>
      </div>

      <div id="filter-container" v-if="!readFromServer">
        <div>
          <label for="data-name">ID da avaliação</label>
          <select name="data-name" v-model="dataName">
            <option v-for="(d, index) in dataRounds" :key="'d-'+index">{{d}}</option>
          </select>
        </div>
        <div>
          <label for="education">Educação</label>
          <select name="education" v-model="filters.education">
            <option selected :value="emptyFilterString">{{emptyFilterString}}</option>
            <option
              v-for="(ed, index) in filterValues.education"
              :key="'filt-education-'+index"
            >{{ed}}</option>
          </select>
        </div>
        <div>
          <label for="age">Idade</label>
          <select name="age" v-model="filters.ageGroup">
            <option selected :value="emptyFilterString">{{emptyFilterString}}</option>
            <option v-for="(ageG, index) in filterValues.ageGroup" :key="'filt-age-'+index">{{ageG}}</option>
          </select>
        </div>
        <div>
          <label for="sex">Sexo</label>
          <select name="sex" v-model="filters.sex">
            <option selected :value="emptyFilterString">{{emptyFilterString}}</option>
            <option v-for="(sex, index) in filterValues.sexes" :key="'filt-sex-'+index">{{sex}}</option>
          </select>
        </div>
        <header>
          <p>
            <span>{{n_participants}}</span>
            <br />participants
          </p>
        </header>
      </div>

      <div v-else id="filter-container" class="just-participants">
        <header>
          <p>
            <span>{{n_participants}}</span>
            <br />participants
          </p>
        </header>
      </div>

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
            :style="{width: calcPerc(axis, sumAxis(axis_list))+'%'}"
            :class="axes_names[i_axis]"
          >
            <div class="axis-percentage" v-if="sumAxis(axis_list) > 0">
              {{axes_names[i_axis]}}
              <template v-if="showSubAxes">/</template>
              <template v-else>
                <br />
              </template>
              {{String(calcPerc(axis, sumAxis(axis_list))/100).substring(1,4)}}
            </div>

            <div class="sub-axis-performance" v-if="showSubAxes">
              <div
                v-for="(subAxisPerformance, subAxisName, subAxisIndex) in axisPerformance.byEmotion[emotion_name][axes_names[i_axis]].winsAgainstOtherAxes"
                :key="emotion_name+'-ax-'+i_axis+'-'+subAxisIndex"
                class="sub-axis-comparison"
                :set="losses = axisPerformance.byEmotion[emotion_name][axes_names[i_axis]].lossesAgainsOtherAxes[subAxisName]"
              >
                <div
                  :style="{width: calcPerc(subAxisPerformance, subAxisPerformance + losses) + '%'}"
                >{{subAxisPerformance}}</div>
                <div
                  :style="{width: calcPerc(losses, subAxisPerformance + losses) + '%'}"
                  :class="subAxisName"
                >{{losses}}</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="p-value">
          <template v-if="pLessThan005(axis_list).canUseChi">
            <p v-if="pLessThan005(axis_list).pLessThan005">
              p &lt; 0.05
              <br />
              <span class="curve-position">{{(pLessThan005(axis_list).err).toPrecision(4)}}</span>
            </p>
            <p class="ops" v-else>
              <span class="emoji">💩</span>
              <br />
              <span class="curve-position">{{(pLessThan005(axis_list).err).toPrecision(4)}}</span>
            </p>
          </template>
          <template v-else>
            <p>n/a</p>
          </template>
        </div>
      </div>

      <h2 class="graph-name">Axis, by emotion, by phrase</h2>
      <div
        v-for="(phrase_list, phrase_name, index_phrase) in axisByPhrase"
        :key="'ph-'+index_phrase"
      >
        <h3>{{phrase_name}}</h3>
        <!-- <p>{{axisPerformance.byPhrase[phrase_name]}}</p> -->
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
              :style="{width: calcPerc(axis, sumAxis(axis_list))+'%'}"
              :class="axes_names[i_axis]"
            >
              <div class="axis-percentage" v-if="sumAxis(axis_list) > 0">
                {{axes_names[i_axis]}}
                <template v-if="showSubAxes">/</template>
                <template v-else>
                  <br />
                </template>
                <template
                  v-if="sumAxis(axis_list) > 0"
                >{{String(calcPerc(axis, sumAxis(axis_list))/100).substring(1,4)}}</template>
                <template v-else>0</template>
              </div>
              <div class="sub-axis-performance" v-if="showSubAxes">
                <div
                  v-for="(subAxisPerformance, subAxisName, subAxisIndex) in axisPerformance.byPhrase[phrase_name][emotion_name][axes_names[i_axis]].winsAgainstOtherAxes"
                  :key="emotion_name+'-ax-'+i_axis+'-'+subAxisIndex"
                  class="sub-axis-comparison"
                  :set="losses = axisPerformance.byPhrase[phrase_name][emotion_name][axes_names[i_axis]].lossesAgainsOtherAxes[subAxisName]"
                >
                  <div
                    :style="{width: calcPerc(subAxisPerformance, subAxisPerformance + losses) + '%'}"
                  >{{subAxisPerformance}}</div>
                  <div
                    :style="{width: calcPerc(losses, subAxisPerformance + losses) + '%'}"
                    :class="subAxisName"
                  >{{losses}}</div>
                </div>
              </div>
            </li>
          </ul>
          <div class="p-value">
            <template v-if="pLessThan005(axis_list).canUseChi">
              <p v-if="pLessThan005(axis_list).pLessThan005">
                p &lt; 0.05
                <br />
                <span class="curve-position">{{(pLessThan005(axis_list).err).toPrecision(4)}}</span>
              </p>
              <p class="ops" v-else>
                <span class="emoji">💩</span>
                <br />
                <span class="curve-position">{{(pLessThan005(axis_list).err).toPrecision(4)}}</span>
              </p>
            </template>
            <template v-else>
              <p>n/a</p>
            </template>
          </div>
        </div>
      </div>

      <h2 class="graph-name">Performance</h2>
      <h3>By axis</h3>
      <div
        class="graph-grid performance-grid"
        v-for="(axis_obj, axis_name, axis_index) in axisPerformance.generic"
        :key="'perf-ax-'+axis_index"
      >
        <h4>
          {{axis_name}}
          <span class="norm">{{axis_obj.totalAppearances}}</span>
        </h4>
        <div class="graph-joiner">
          <ul
            v-for="(sub_ax, sub_ax_name, sub_ax_index) in axis_obj.winsAgainstOtherAxes"
            class="axis-distribution-graph"
            :key="'perf-ax-'+axis_name+'-vs-'+sub_ax_name"
          >
            <li
              :style="{width: calcPerc(sub_ax, sub_ax + axisPerformance.generic[sub_ax_name].winsAgainstOtherAxes[axis_name])+'%'}"
              class="main-axis"
            >
              <template
                v-if="sub_ax>0"
              >{{String(calcPerc(sub_ax, sub_ax + axisPerformance.generic[sub_ax_name].winsAgainstOtherAxes[axis_name])/100).substring(1,4)}}</template>
            </li>
            <li
              :style="{width: calcPerc(axisPerformance.generic[sub_ax_name].winsAgainstOtherAxes[axis_name], sub_ax + axisPerformance.generic[sub_ax_name].winsAgainstOtherAxes[axis_name])+'%'}"
              :class="sub_ax_name"
            >
              <template
                v-if="sub_ax>0"
              >{{sub_ax_name}} / {{String(1-calcPerc(sub_ax, sub_ax + axisPerformance.generic[sub_ax_name].winsAgainstOtherAxes[axis_name])/100).substring(0,4)}}</template>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import { general_data } from "../data";
import { db } from "../firebase";
import real_data3 from "../assets/static/data/firebase_dump.data3.json";
import real_data4 from "../assets/static/data/firebase_dump.data4.json";
import real_partipants from "../assets/static/data/firebase_dump.participants.json";

let __readFromServer = false;
let __emptyFilterString = "---";

export default {
  name: "summarizer-data3",
  data() {
    return {
      n_participants: 0,
      raw_data: null,
      sharedState: general_data.sharedState,
      dataName: general_data.sharedState.data,
      dataRounds: ["data3", "data4"],
      participants: {},
      blacklist: [
        "WhKE8JPEKgfi9vt2Wb1yKSijJ762",
        "emW3JMw9AGXje40TaFhk3Cj0BXp1",
        "bs2n4jBcBSRp5eNCaoat2YXOZRt2",
        "snEqVOFjJ2Pyud9pYkkk6M45lGk1",
        "FHShKwoMZChTupayk68X9R5gknX2",
        "wuhl2HXAU2bvpHDK6zWAhPi2GwE3",
        "SPB8B3dLXfg5FLiejwEdkrjVYC82",
        "JosIpk8p2NfNmI6uPyIR9OS7m3F3",
        "bs2n4jBcBSRp5eNCaoat2YXOZRt2",
        "7JhTbvDgbQX5Gpn7liXm3IYM3P83",
        "bs2n4jBcBSRp5eNCaoat2YXOZRt2",
        "FatbNGn7OKfBA9m9ocbdtcX8vM42",
        "sgejOuhBwJWdSumWN2JjnsUkpX42", // me, on opera.
        "84XBLnkAdsVODfO31Erh1jDOyX63" // also me, also on opera
      ],
      // likertWeights: [0.81, 0.9, 1.0],
      likertWeights: [1.0, 1.0, 1.0],
      showSubAxes: true,
      axes_key: {
        Wei: 0,
        Wid: 1,
        Ita: 2,
        _b_: 3
      },
      readFromServer: __readFromServer,
      axes_names: ["Wei", "Wid", "Ita", "_b_"],
      emptyFilterString: __emptyFilterString,
      filters: {
        education: __emptyFilterString,
        ageGroup: __emptyFilterString,
        sex: __emptyFilterString
      },
      filterValues: {
        education: [
          "Ensino Fundamental (1º grau)",
          "Ensino Médio (2º grau)",
          "Ensino superior",
          "Pós-graduação / Mestrado",
          "Pós-graduação / Doutorado",
          "Prefiro não responder"
        ],
        ageGroup: [
          "18 a 24 anos",
          "25 a 39 anos",
          "40 a 59 anos",
          "60 anos ou mais",
          "Prefiro não responder"
        ],
        sexes: ["Masculino", "Feminino", "Prefiro não responder"]
      }
    };
  },
  beforeRouteEnter: function(to, from, next) {
    if (__readFromServer) {
      console.log("will attempt to read the results");
      // db.collection(general_data.sharedState.data)
      db.collection("data4")
        .get()
        .then(querySnapshot => {
          console.log("has read. will create array of data.");
          let retrievedData = [];
          querySnapshot.forEach(function(doc) {
            // console.log(doc.id, " => ", doc.data());
            retrievedData.push(doc.data());
          });
          console.log(JSON.stringify(retrievedData));
          console.log(
            "and, also, will now attempt to read the participants' data"
          );
          db.collection("participants_data")
            .get()
            .then(querySnapshot => {
              console.log("has read participants. will create array of data.");
              let retrievedParticipantsData = {};
              querySnapshot.forEach(function(doc) {
                retrievedParticipantsData[doc.id] = doc.data();
              });
              console.log(JSON.stringify(retrievedParticipantsData));

              let input = { data: {} };
              input["data"][general_data.sharedState.data] = retrievedData;
              input["participants"] = retrievedParticipantsData;
              next(vm => vm.setData(input));
            });
        });
    } else {
      let input = {};
      input["data"] = { data3: real_data3.data, data4: real_data4.data };
      input["participants"] = real_partipants;
      next(vm => vm.setData(input));
    }
  },
  methods: {
    likertLoser: function(winner) {
      if (isNaN(winner) || winner == "") {
        winner = 0.0;
      } else {
        winner = Math.max(0.0, Math.min(1.0, parseFloat(winner)));
      }
      return Math.round((1.0 - winner) * 100) / 100;
    },
    pLessThan005: function(axes) {
      let sum = axes.reduce((a, b) => a + b, 0);
      if (sum == 0) {
        return { err: 0, pLessThan005: false };
      }
      let n = axes.length;
      let expectedValue = sum / n;
      let err = 0;
      for (let i = 0; i < n; i++) {
        let diff = axes[i] - expectedValue;
        err += (diff * diff) / expectedValue;
      }
      return {
        err: err,
        pLessThan005: err > 7.814727903,
        canUseChi: expectedValue >= 5
      };
    },
    calcPerc: function(axis, total) {
      if (total == 0) {
        return 0;
      }
      let p = Math.round(100 * (parseInt(axis) / total));
      return p;
    },
    sumAxis: function(axis_list) {
      let total = 0;
      for (let i = 0; i < axis_list.length; i++) {
        total += axis_list[i];
      }
      return Math.round(total);
    },
    // this gets an object with (probably) three different axes and
    // returns their sum
    sumOtherAxes: function(otherAxes) {
      let s = 0;
      for (let key in otherAxes) {
        s += otherAxes[key];
      }
      return s;
    },
    setData(fetchedData) {
      this.raw_data = fetchedData["data"];
      this.participants = fetchedData["participants"];
    }
  },
  computed: {
    // here I'll return valid data. This'll exclude blacklisted
    // users, but in time I can add other criteria.
    filteredData: function() {
      let filtered_data = [];
      let users = [];
      this.raw_data[this.dataName].forEach(d => {
        if (!this.blacklist.includes(d.author_id)) {
          let filtered = false;
          if (this.filters.education != this.emptyFilterString) {
            if (
              this.participants[d.author_id].education != this.filters.education
            ) {
              filtered = true;
            }
          }
          if (this.filters.ageGroup != this.emptyFilterString) {
            if (
              this.participants[d.author_id].age_group != this.filters.ageGroup
            ) {
              filtered = true;
            }
          }
          if (this.filters.sex != this.emptyFilterString) {
            if (this.participants[d.author_id].sex != this.filters.sex) {
              filtered = true;
            }
          }
          if (!filtered) {
            if (!users.includes(d.author_id)) {
              users.push(d.author_id);
            }
            filtered_data.push(d);
          }
        }
      });
      this.n_participants = users.length;
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
        let chosenAxis = e.choice_metadata.axis;
        let rejectedAxis = e.rejectee_metadata.axis;
        if (e.hasOwnProperty("likert_certainty")) {
          let likertIndex = e.likert_certainty + 1; // it goes from -1 to 1.

          // the likerLoser function already checks if the value
          // is valid, so here I'm using it to also calculate
          // a valid winner (which generally will be what the user
          // has inputed).
          let winnerAdjustment =
            1 - this.likertLoser(this.likertWeights[likertIndex]);
          let loserAdjustment = this.likertLoser(
            this.likertWeights[likertIndex]
          );

          results[emotion][this.axes_key[chosenAxis]] += 1 * winnerAdjustment;
          results[emotion][this.axes_key[rejectedAxis]] += 1 * loserAdjustment;
        } else {
          results[emotion][this.axes_key[chosenAxis]] += 1;
        }
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
        let chosenAxis = e.choice_metadata.axis;
        let rejectedAxis = e.rejectee_metadata.axis;

        if (e.hasOwnProperty("likert_certainty")) {
          let likertIndex = e.likert_certainty + 1;

          let winnerAdjustment =
            1 - this.likertLoser(this.likertWeights[likertIndex]);
          let loserAdjustment = this.likertLoser(
            this.likertWeights[likertIndex]
          );

          results[phrase][emotion][this.axes_key[chosenAxis]] +=
            1 * winnerAdjustment;
          results[phrase][emotion][this.axes_key[rejectedAxis]] +=
            1 * loserAdjustment;
        } else {
          results[phrase][emotion][this.axes_key[chosenAxis]] += 1;
        }
      });

      return results;
    },
    axisPerformance: function() {
      let results = {
        generic: {},
        byEmotion: {},
        byPhrase: {}
      };

      this.filteredData.forEach(e => {
        let winner = e.choice_metadata.axis,
          loser = e.rejectee_metadata.axis,
          emotion = e.choice_metadata.emotion,
          phrase = e.phrase;

        function axisPlusEmotionPerformance(
          currentResults,
          filteredPhrase = "",
          filteredEmotion = ""
        ) {
          if (
            (filteredPhrase != phrase && filteredPhrase != "") ||
            (filteredEmotion != emotion && filteredEmotion != "")
          ) {
            return false;
          }

          function otherAxes(currentAxis) {
            let axes = {
              Wei: 0,
              Wid: 0,
              Ita: 0,
              _b_: 0
            };
            delete axes[currentAxis];
            return axes;
          }

          if (!(winner in currentResults)) {
            currentResults[winner] = {
              totalAppearances: 0,
              wins: 0,
              winsAgainstOtherAxes: otherAxes(winner),
              lossesAgainsOtherAxes: otherAxes(winner)
            };
          }
          if (!(loser in currentResults)) {
            currentResults[loser] = {
              totalAppearances: 0,
              wins: 0,
              winsAgainstOtherAxes: otherAxes(loser),
              lossesAgainsOtherAxes: otherAxes(loser)
            };
          }

          currentResults[winner].wins += 1;
          currentResults[winner].winsAgainstOtherAxes[loser] += 1;

          currentResults[winner].totalAppearances += 1;
          currentResults[loser].totalAppearances += 1;
          currentResults[loser].lossesAgainsOtherAxes[winner] += 1;

          return currentResults;
        }

        // ignores which phrase and which emotion
        axisPlusEmotionPerformance(results.generic);

        // ignores which phrase but not which emotion
        if (!(emotion in results.byEmotion)) {
          results.byEmotion[emotion] = {};
        }
        axisPlusEmotionPerformance(results.byEmotion[emotion], "", emotion);

        // doesn't ignore phrase or emotion
        if (!(phrase in results.byPhrase)) {
          results.byPhrase[phrase] = {};
        }
        if (!(emotion in results.byPhrase[phrase])) {
          results.byPhrase[phrase][emotion] = {};
        }

        axisPlusEmotionPerformance(
          results.byPhrase[phrase][emotion],
          phrase,
          emotion
        );
      });

      return results;
    }
  }
};
</script>

<style lang="scss" scoped>
$mar_g: 2px;

.main-container {
  @media screen and (min-width: 992px) {
    grid-template-columns: auto minmax(auto, 960px) auto;
  }
}

#filter-container {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: grid;
  &.just-participants header {
    padding: 0.5rem 0;
  }
  &:not(.just-participants) {
    grid-template-columns: 2fr 3fr 3fr 2fr 1fr;
  }
  grid-gap: 1rem;
  background: #eee;
  z-index: 10;
  box-shadow: 0 -2px 9px rgba(0, 0, 0, 0.1);

  align-items: stretch;
  & > div {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    &:first-child {
      margin-left: 1rem;
    }
    label {
      padding-right: 1rem;
    }
  }
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
  }
  p {
    color: white;
    text-align: center;
    font-size: 11px;
    line-height: 15px;
    span {
      font-size: 18px;
    }
  }
  select {
    margin: 0;
    padding: 0.3em 1.4em 0.2em 0.8em;
    font-size: 11px;
  }
}

label {
  text-transform: uppercase;
  font-size: 11px;
  line-height: 15px;
  display: block;
}

em {
  font-style: italic;
}

h1 + p {
  margin-top: -1rem;
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
  grid-template-columns: 2fr 10fr 1fr;
  margin-top: $mar_g;
  align-items: center;
  &.performance-grid {
    min-height: 2rem;
  }
}
.p-value p {
  font-size: 9px;
  line-height: 12px;
  text-align: center;
  &.ops span.emoji {
    font-size: 13px;
  }
  span.curve-position {
    opacity: 0.3;
  }
}

.colored-axes {
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
  border-radius: 0.2rem;

  transition: all 0.6s ease;

  // pretty border
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    border: 1px solid black;
    mix-blend-mode: multiply;
    opacity: 0.07;
    border-radius: 0.2rem;
  }
}

.axis-distribution-graph {
  margin-top: 0;
  & + .axis-distribution-graph {
    margin-top: $mar_g;
  }
  &:nth-child(3) {
    padding-bottom: $mar_g * 3;
  }
  display: flex;
  width: 100%;
  li {
    text-align: right;
    font-size: 9px;
    line-height: 12px;
    flex-grow: 1;
    overflow: hidden;

    white-space: nowrap;

    box-sizing: border-box;
    padding: 0.2rem;

    &.main-axis {
      background: #ccc;
    }

    @extend .colored-axes;

    & + li {
      margin-left: $mar_g;
    }

    .axis-percentage {
      padding: 0 0.1rem;
    }
    .sub-axis-performance {
      display: flex;
      flex-direction: column;
      width: 100%;
      .sub-axis-comparison {
        display: flex;
        margin-top: 2px;
        & + .sub-axis-comparison {
          margin-top: 1px;
        }
        div {
          overflow: hidden;
          @extend .colored-axes;
          font-size: 7px;
          padding: 0 0.2rem;
          border-radius: 0;
          box-sizing: border-box;
          &:after {
            border-radius: 0;
          }
          &:first-child {
            text-align: left;
            background: rgba(0, 0, 0, 0.1);
            color: white;
          }
          &:nth-child(2) {
            margin-left: 1px;
            &:after {
              // border-left: none;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 568px) {
  .text-container {
    // hacky way to fix problems in the body
    width: calc(100% + 32px);
    position: relative;
    left: -16px;
    top: -64px;
  }

  .graph-grid {
    &.performance-grid {
      grid-template-columns: 1fr !important;
    }
    grid-template-columns: 1fr 1fr !important;
    grid-row-gap: 0.5rem;
    & + .graph-grid {
      margin-top: 2rem;
    }
    h4 {
      grid-column: 1;
      grid-row: 1;
      span {
        float: none;
        &:before {
          content: "/ ";
        }
      }
    }
    .p-value {
      grid-column: 2;
      grid-row: 1;
      p {
        text-align: right;
        .curve-position:before {
          content: "/ ";
        }
      }
      br {
        display: none;
      }
    }
    .axis-distribution-graph {
      grid-column: 1 / span 2;
      grid-row: 2;
    }
  }
}

.header-controls {
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  padding-top: 1rem;
  margin-top: 1rem;
  label,
  input {
    font-size: 14px;
    line-height: 19px;
    text-transform: unset;
    strong {
      opacity: 0.7;
    }
  }
}

#axes-perf-controls {
  @extend .header-controls;
}

#likert-weights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  @extend .header-controls;
  grid-gap: 2rem;
  input {
    width: 5ch;
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid black;
    &:focus {
      background: white;
    }
  }
}
</style>

