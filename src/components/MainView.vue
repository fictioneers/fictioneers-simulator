<template>
  <div class="main">
    <div class="grid" v-if="timelineEventStates.length || userStoryState">
      <ul>
        <li
          v-for="(eventStageChange, index) in timelineEventStates"
          :key="index"
        >
          <EventStateChange :eventStateChange="eventStageChange" />
        </li>
      </ul>
      <SideBar />
    </div>
    <p class="loading" v-else>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import EventStateChange from "./EventStateChange.vue";
import SideBar from "@/components/SideBar.vue";

export default defineComponent({
  name: "MainView",
  computed: {
    timelineEventStates: function () {
      return this.$store.state.timelineEventStates;
    },
    userStoryState: function () {
      return this.$store.state.userStoryState;
    },
  },
  components: { EventStateChange, SideBar },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  padding: 20px;
}

@media (min-width: 800px) {
  .grid {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 20px;
  }
}

ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-gap: 20px;
  margin: 0 auto;
}

li {
  margin: 0;
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
