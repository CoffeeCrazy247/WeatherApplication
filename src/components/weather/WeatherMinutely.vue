<template>
  <div class="container">
    <div class="row" v-if="value.length > 0">
      <div class="col">
        <h5>{{ label }}</h5>
        <line-chart-new
          class="testing"
          :options="options"
          :chtData="chtData"
          :chtVal="chtVal"
          :label="label"
        ></line-chart-new>
      </div>
    </div>
  </div>
</template>

<script>
import LineChartNew from "../charts/LineChartNew.vue";
export default {
  props: ["value"],
  components: {
    LineChartNew,
  },
  data: function () {
    return {
      label: "Precipitation",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Inches",
              },
              id: "y-axis-1",
              type: "linear",
              display: true,
              position: "left",
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    chtData: function () {
      var arr = new Array();
      for (let item in this.value) {
        arr.push(this.value[item].dtformatted);
      }
      return arr;
    },
    chtVal: function () {
      var arr = new Array();
      for (let item in this.value) {
        arr.push(this.value[item].precipitation);
      }
      return arr;
    },
  },
};
</script>

<style scoped>
.container {
  color: rgb(0, 0, 0);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  margin-top: 10px;
  box-shadow: 0px 0px 10px 2px;
  min-width: 100%;
}
.testing {
  height: 200px;
}
</style>
