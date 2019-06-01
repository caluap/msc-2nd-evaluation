<template>
  <div class="main-container">
    <div class="text-container">
      <h1>Data 3, summary</h1>
      <h2>Axis, by emotion</h2>
      <div v-for="(axis_list, emotion_name, index) in axisByEmotion" :key="'em-'+index">
        <h3>
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
            {{calcFlexGrow(axis, sumAxis(axis_list))}}
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
      let p = Math.round(100 * (parseInt(axis) / total)) / 100;
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
    axisByPhrase: function() {}
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-weight: bold;
  margin-bottom: 0.6rem;
  .norm {
    font-weight: 400;
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
    // color: white;

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

