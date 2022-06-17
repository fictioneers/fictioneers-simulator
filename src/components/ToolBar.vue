<template>
  <div class="ToolBar">
    <div class="button-holder">
      <button
        type="button"
        class="icon"
        title="Settings"
        :disabled="loading"
        v-on:click="toggleSettings"
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 458.317 458.317"
          style="enable-background: new 0 0 384.971 384.971"
          xml:space="preserve"
        >
          <path
            d="M446.185,179.159h-64.768c-2.536-7.702-5.636-15.15-9.26-22.29l45.818-45.818c4.737-4.737,4.737-12.416,0-17.152
			L364.416,40.34c-4.737-4.737-12.416-4.737-17.152,0l-45.818,45.818c-7.14-3.624-14.587-6.724-22.289-9.26V12.131
			c0.001-6.699-5.429-12.129-12.128-12.129h-75.743c-6.698,0-12.129,5.43-12.129,12.128v64.768
			c-7.702,2.535-15.149,5.636-22.29,9.26L111.05,40.341c-4.737-4.737-12.416-4.737-17.152,0L40.339,93.9
			c-4.737,4.736-4.737,12.416,0,17.152l45.817,45.817c-3.624,7.14-6.725,14.588-9.26,22.29H12.129C5.43,179.159,0,184.59,0,191.288
			v75.743c0,6.698,5.43,12.128,12.129,12.128h64.768c2.536,7.702,5.636,15.149,9.26,22.29L40.34,347.266
			c-4.737,4.736-4.737,12.416,0,17.152l53.559,53.559c4.737,4.736,12.416,4.736,17.152,0l45.817-45.817
			c7.14,3.624,14.587,6.725,22.29,9.26v64.768c0,6.698,5.43,12.128,12.129,12.128h75.743c6.698,0,12.129-5.43,12.129-12.128v-64.768
			c7.702-2.535,15.149-5.636,22.289-9.26l45.818,45.817c4.737,4.736,12.416,4.736,17.152,0l53.559-53.559
			c4.737-4.737,4.737-12.416,0-17.152l-45.817-45.817c3.624-7.14,6.724-14.587,9.26-22.289h64.768
			c6.698,0,12.129-5.43,12.129-12.128v-75.743C458.314,184.59,452.884,179.159,446.185,179.159z M229.157,289.542
			c-33.349,0-60.384-27.035-60.384-60.384s27.035-60.384,60.384-60.384s60.384,27.035,60.384,60.384
			S262.506,289.542,229.157,289.542z"
          />
        </svg>
      </button>
      <button type="button" :disabled="loading" v-on:click="progressStory">
        Progress story
      </button>
      <button
        type="button"
        class="icon"
        title="Sign out"
        :disabled="loading"
        v-on:click="clearUser"
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 384.971 384.971"
          style="enable-background: new 0 0 384.971 384.971"
          xml:space="preserve"
        >
          <path
            d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z"
          />
          <path
            d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"
          />
        </svg>
      </button>
    </div>
    <SettingsPanel :visible="settingsVisible || error" />
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/action-types";
import { defineComponent } from "@vue/runtime-core";
import SettingsPanel from "./SettingsPanel.vue";

export default defineComponent({
  name: "ToolBar",
  data: () => ({
    loading: false,
    settingsVisible: false,
  }),
  computed: {
    error: function () {
      return this.$store.state.error;
    },
  },
  methods: {
    async progressStory() {
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
    async clearUser() {
      this.loading = true;
      try {
        await this.$store.dispatch(ActionTypes.CLEAR_USER, undefined);
        this.loading = false;
      } catch (err) {
        this.loading = false;
        throw err;
      }
    },
    toggleSettings() {
      this.settingsVisible = !this.settingsVisible;
    },
    hideSettings() {
      this.settingsVisible = false;
    },
  },
  components: { SettingsPanel },
});
</script>

<style scoped>
.ToolBar {
  position: fixed;
  bottom: 0;
  height: var(--toolbar-height);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
}
.button-holder {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}

.icon {
  border: 0;
  min-width: 0;
  width: auto;
}
</style>
