<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="weatherIconSelect"
    ></b-form-select>
    <div class="card-container">
      <b-card-group>
        <b-card class="format-card" :key="index" v-for="(item, index) in value">
            <p style="text-align:center">
              {{ item.dt }}
            </p>
          <b-img
            v-if="selected != null"
            :src="
              require('../../assets/weathericons/' + selected + '/' + item.weatherfile)
            "
          ></b-img>
          <!-- :src="require(`../assets/weathericons/${this.selected}/00.svg`)" -->
          <p>{{ item.day }}&deg;F</p>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      weatherIconSelect: [
        "light",
        "dark",
        "colorful",
        "flat_white",
        "flat_black",
        "flat_colorful",
      ],
      selected: "dark"
    };
  },
};
</script>

<style scoped>
.format-card {
  background: transparent;
  border: transparent;
}
.card-container {

  color: rgb(0, 0, 0);
  display: inline-block;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  box-shadow: 0px 0px 10px 2px;
}
</style>
