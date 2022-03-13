<template>
  <div class="main-div">
    <p>{{ value[0].location }}</p>
    <p>{{ value[0].dt }}</p>
    <b-icon
      :style="value[0].wind_style"
      font-scale="2"
      id="wind-direction-icon"
      icon="arrow-down-circle"
    ></b-icon>
    <p>
      {{ value[0].wind_speed }} mph winds currently from the
      {{ value[0].wind_direction }}, with winds possibly gusting up to
      {{ value[0].wind_gust }} mph.
    </p>
    <b-img id="current-weather-icon" :src="
              require('../../assets/weathericons/' + value[0].iconselected + '/' + value[0].weatherfile)
            "></b-img>
    <div class="current-temp-position">{{ value[0].temp }}&deg;F</div>
    <p>Humidity: {{ value[0].humidity }}%</p>
    <p>Pressure: {{ value[0].pressure }} hPa</p>
    <p>Sunrise: {{ value[0].sunrise }}</p>
    <p>Sunset: {{ value[0].sunset }}</p>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style scoped>
.main-div{
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  box-shadow: 0px 0px 10px 2px;
}
</style>
