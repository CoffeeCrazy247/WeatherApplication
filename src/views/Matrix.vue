<template>
  <div>
    <table class="m-2 table-format">
      <th>Likelihood</th>
      <th>Negligible</th>
      <th>Marginal</th>
      <th>Significant</th>
      <th>Severe</th>
      <th>Very Severe</th>
      <tr v-bind:key="idx1" v-for="(row, idx1) in riskMatrix">
        <th scope="row">{{ idx1 }}</th>
        <td
          @mouseup="funclick(idx1, idx2)"
          v-bind:key="idx2"
          v-for="(col, idx2) in row"
        >
          <input
            class="testformat"
            disabled
            v-model="riskMatrix[idx1][idx2]"
            type="text"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      riskMatrix: {
        "Very Likely": ["Low", "Moderate", "High", "High", "High"],
        Likely: ["Low", "Moderate", "Moderate", "High", "High"],
        Unlikely: ["Low", "Low", "Moderate", "Moderate", "High"],
        "Very Unlikely": ["Low", "Low", "Low", "Moderate", "High"],
      },
      xcoord: "",
      ycoord: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    funclick: function (tx, ty) {
      var x = tx;
      var y = ty;
      this.xcoord = tx;
      this.ycoord = ty;
      this.$bvToast.toast(this.riskMatrix[tx][ty], {
        title: "Event Level",
        variant: "success",
        solid: true,
      });
    },
  },
};
</script>

<style scoped>
.testformat:hover {
  background: yellow;
}
.testformat {
  background: white;
  width: 100px;
  height: 100px;
  text-align: center;
}
.table-format{
    font-size: 12px;
}
</style>
