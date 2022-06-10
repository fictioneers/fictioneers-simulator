<template>
  <div class="ToolBar">
    <div class="button-holder">
      <button type="button" v-on:click="progress_story">Progress story</button>
    </div>

    <!-- <div class="narrative-state" v-if="currentUser?.narrative_state">
      <div>
        <b>Step</b> {{ currentUser.narrative_state?.current_step || "None" }}
      </div>
      <div>
        <b>Beat</b>
        {{ currentUser.narrative_state?.current_beat.id }}
        {{ currentUser.narrative_state?.current_beat.name }}
      </div>
      <div>
        <b>Timeline ID</b> {{ currentUser.narrative_state?.active_timeline_id }}
      </div>
      <div><b>User ID</b> {{ currentUser.id }}</div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/action-types";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "ToolBar",
  data: () => ({
    loading: false,
  }),
  computed: mapState(["userStoryState"]),
  methods: {
    async progress_story() {
      this.loading = true;
      try {
        await this.$store.dispatch(
          ActionTypes.PROGRESS_USER_STORY_STATE,
          undefined
        );
        this.loading = false;
      } catch (err) {
        this.loading = false;
        // throw new Error(err);
      }
    },
  },
});
</script>

<style scoped>
.ToolBar {
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.1);
}
.button-holder {
  flex-basis: 100%;
}

.narrative-state {
  color: #777;
  font-size: 14px;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr;
  text-align: left;
}
</style>
