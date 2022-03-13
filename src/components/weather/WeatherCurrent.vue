<template>
  <div>
    <div class="boxcontainer">
      <div class="box">
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
      </div>
      <div class="box">
        <div class="current-weather-temp-container">
          <b-img id="current-weather-icon" :src="value[0].weathericon"></b-img>
          <div class="current-temp-position">{{ value[0].temp }}&deg;F</div>
        </div>
      </div>
      <div class="box">
        <p>Humidity: {{ value[0].humidity }}%</p>
        <p>Pressure: {{ value[0].pressure }} hPa</p>
        <p>Sunrise: {{ value[0].sunrise }}</p>
        <p>Sunset: {{ value[0].sunset }}</p>
      </div>
      <div class="box">D</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
.current-weather-temp-container {
  display: inline-block;
}

#current-weather-icon {
  border-radius: 1em;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10em);
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
  margin: 10px;
}

.current-temp-position {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -120%);
  font-size: 20px;
  font-family: "Roboto Mono", monospace;
}

.boxcontainer {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 49% 49%;
  grid-row: auto auto;
  grid-column-gap: 2%;
  grid-row-gap: 2%;
}
.box {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  font-family: sans-serif;
}
</style>
