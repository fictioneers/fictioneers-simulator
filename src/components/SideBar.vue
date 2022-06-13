<template>
  <div class="SideBar" v-if="userStoryState">
    <div class="step">
      <div class="title">Step</div>
      <div class="count">{{ userStoryState.current_step || "-" }}</div>
    </div>
    <div class="beat">
      <b>Beat</b>
      <div>{{ userStoryState?.current_beat?.id }}</div>
      <div>{{ userStoryState?.current_beat?.name }}</div>
    </div>
    <div>
      <b>Timeline ID</b>
      <div>{{ userStoryState?.active_timeline_id }}</div>
    </div>
    <div>
      <b>User ID</b>
      <div>{{ currentUser?.id }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
  data: () => ({
    loading: false,
  }),
  computed: {
    userStoryState: function () {
      return this.$store.state.userStoryState;
    },
    currentUser: function () {
      return this.$store.state.currentUser;
    },
  },
});
</script>

<style scoped>
.SideBar {
  display: none;
  color: #777;
  font-size: 14px;
  text-align: left;
  background: #fff;
  opacity: 0.7;
  border: 1px solid #eee;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
}

@media (min-width: 800px) {
  .SideBar {
    display: block;
  }
}

.SideBar {
  opacity: 1;
}

.step {
  width: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  line-height: 1;
  text-align: center;
  margin: 0 0 10px 0;
}

.step .title {
  font-size: 12px;
  margin-bottom: 5px;
}

.step .count {
  font-size: 40px;
  font-weight: bold;
}
</style>
