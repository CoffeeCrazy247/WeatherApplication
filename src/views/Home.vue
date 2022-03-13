<template>
    <div class="main-div">
      <b-form-select v-model="selected" :options="weatherIconSelect"></b-form-select>
      <b-img thumbnail fluid :src="require('../assets/weathermain.jpg')"></b-img>
      <b-img v-if="selected != null" :src="require(`../assets/weathericons/${this.selected}/00.svg`)"></b-img>
      <h1>Hello Friends!</h1>
      <p>I hope you enjoy this site, as I have. I have learned so many things, and plan to keep expanding as I go.</p>
      <p>I plan to do the following:</p>
      <div class="list-format-bullets">
      <li>Keep the site ad free</li>
      <li>Continue to experiment with additional technologies</li>
      <li>Add the capability to switch to other free weather APIs. This means, that there will be the ability to select the API you wish to switch to and the data will reflect 
        automatically on selection.
      </li>
      <li>Ability to compare weather between two locations</li>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      weatherIconSelect: ['light','dark','colorful','flat_white','flat_black','flat_colorful'],
      selected: 'dark'
    };
  },
  mounted() {
   
  },
  methods: {
  }
};
</script>
<style scoped>
.main-div{
  /* background: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(9, 71, 121, 0.6) 25%, rgba(151,7,150,.6) 75%, rgba(0, 0, 0, 0.3) 100%); */
  color: white;
  margin:5px;
  padding-bottom: 5px;
  padding-top: 10px;
  border-radius: 10px;
  min-height: 93vh;
}
.list-format-bullets{
  text-align: left;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1rem);
  box-shadow: 0 4px 8px 0 black;
  margin: 10px;
  padding: 5px;
  border-radius: 10px;
}
</style>

