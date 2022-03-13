<template>
  <div>
    <b-button v-b-modal.modal-scrollable class="alerts">
      Alerts
      <b-badge variant="light">{{ value ? value.length : 0 }}</b-badge>
    </b-button>

    <b-modal
      id="modal-scrollable"
      scrollable
      size="xl"
      :title="'Weather Alerts for ' + value[0].location"
    >
      <div v-for="option in value" :data="option" :key="option.number">
        <h4>{{ option.event }}</h4>
        <h5>{{ option.sender_name }}</h5>
        <h6 class="alertvalidtext">
          Alert valid from {{ option.start }} to {{ option.end }}
        </h6>
        <p>{{ option.descriptionform }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["value"]
};
</script>

<style scoped>
.alerts {
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(184, 48, 48);
}
.alertcard {
  max-height: 100px;
  overflow: auto;
}
.alertvalidtext {
  color: red;
  font-weight: 700;
}
.heart {

  animation: heart-pulse 1s infinite ease-out;
}

@keyframes heart-pulse {
  0% {
    transform: scale(1); /* scaling to 0 */
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
    background-color: yellow;
  }
  25% {
    transform: scale(1.1); /* increasing the size */
  }
    50% {
    transform: scale(1.2); /* increasing the size */
  }
    75% {
    transform: scale(1.1); /* increasing the size */
  }
  100% {
    transform: scale(1); /* seeting back to initial size */
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
}
</style>
