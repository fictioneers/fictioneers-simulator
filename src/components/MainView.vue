<template>
  <div class="main">
    <ul>
      <li v-for="(eventStageChange, index) in timelineEventStates" :key="index">
        <EventStateChange :eventStateChange="eventStageChange" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import EventStateChange from "./EventStateChange.vue";

export default defineComponent({
  name: "MainView",
  computed: {
    ...mapState(["timelineEventStates"]),
  },
  components: { EventStateChange },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-gap: 10px;
  margin: 10px;
}

a {
  color: #42b983;
}
</style>
