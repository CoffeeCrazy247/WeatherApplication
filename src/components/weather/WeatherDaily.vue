<template>
  <div>
    <div class="card-container">
      <b-card-group>
        <b-card class="format-card" :key="index" v-for="(item, index) in value">
            <p style="text-align:center">
              {{ item.dt }}
            </p>
          <b-img
            :src="
              require('../../assets/weathericons/' + item.iconselected + '/' + item.weatherfile)
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

    };
  },
};
</script>

<style scoped>
.format-card:hover{
  transform: scale(1.1);
  transition: transform 0.4s;
}
.format-card {
  background: transparent;
  border: transparent;
  transition: transform 0.4s;
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
