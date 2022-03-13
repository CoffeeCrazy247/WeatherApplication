<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: {
    label: {
      type: String,
    },
    chtData: {
      type: Array,
    },
    chtVal: {
      type: Array,
    },
    options: {
      type: Object,
    },
  },
  methods: {
    renderLineChart: function () {
      const dates = this.chtData;
      const totals = this.chtVal;

      this.renderChart(
        {
          labels: dates,
          datasets: [
            {
              label: this.label,
              data: totals,
              borderColor: "#ffffff",
              pointBorderColor: "#ffffff",
            },
          ],
        },
        this.options
      );
    },
  },
  mounted() {
    this.renderLineChart();
  },
  watch: {
    chtData: function () {
      this.renderLineChart();
    },
  },
};
</script>
