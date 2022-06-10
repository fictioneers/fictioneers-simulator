<template>
  <div class="main">
    <ul v-if="timelineEventStates.length">
      <li v-for="(eventStageChange, index) in timelineEventStates" :key="index">
        <EventStateChange :eventStateChange="eventStageChange" />
      </li>
    </ul>
    <p class="loading" v-else>Loading...</p>
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
.main {
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
}
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-gap: 20px;
  margin: 10px auto;
}

li {
  margin: 0 auto;
}

a {
  color: #42b983;
}

.loading {
  align-self: center;
  justify-self: center;
  margin: autol;
}
</style>
