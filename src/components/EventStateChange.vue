<template>
  <div class="EventStateChange">
    <div class="content">
      {{ eventStateChange?.narrative_event_title }}
    </div>
    <div
      class="button-holder"
      v-if="eventStateChange?.narrative_event_type === 'ACTIVITY'"
    >
      <div class="button-grid">
        <button type="button">Skip</button>
        <button type="button">Complete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { components } from "../types/fictioneers-api";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "EventStateChange",
  props: {
    eventStateChange: {
      type: Object as PropType<
        components["schemas"]["UserTimelineEventStateChangeSerializer"]
      >,
    },
  },
});
</script>

<style scoped>
.EventStateChange {
  border: 1px solid #ccc;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.content {
  flex-basis: 100%;
}
.button-holder {
  flex-basis: 100%;
  margin: auto 0 0 0;
  padding: 10px;
  border-top: 1px solid #ccc;
}
.button-grid {
  display: grid;
  margin: 0 auto;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  max-width: 300px;
}
</style>
