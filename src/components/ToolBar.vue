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
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "ToolBar",
  data: () => ({
    loading: false,
  }),
  computed: mapState(["userStoryState"]),
  methods: {
    ...mapActions(["progressUserStoryState"]),
    async progress_story() {
      this.loading = true;
      try {
        await this.progressUserStoryState();
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
  border-top: 1px solid #ccc;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
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
