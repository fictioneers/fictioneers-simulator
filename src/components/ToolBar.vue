<template>
  <div class="ToolBar">
    <div class="button-holder">
      <button type="button" v-on:click="progress_story">Progress story</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/action-types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToolBar",
  data: () => ({
    loading: false,
  }),
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
        throw err;
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
</style>
