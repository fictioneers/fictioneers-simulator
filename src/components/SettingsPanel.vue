<template>
  <dialog class="SettingsPanel" :open="visible">
    <form>
      <div>
        <label for="settings-timeline-id">Timeline ID</label>
        <input
          type="text"
          id="settings-timeline-id"
          v-model="config.timelineId"
        />
        <label for="settings-visible-key">Visible Key</label>
        <textarea
          type="text"
          id="settings-visible-key"
          v-model="config.visibleKey"
        />
        <label for="settings-api-base-url">Environment</label>
        <select v-model="config.apiBaseUrl">
          <option :value="API_URL_PROD">Prod</option>
          <option :value="API_URL_DEV">Dev</option>
        </select>
        <label for="settings-contentful-space">Contentful Space</label>
        <input
          type="text"
          id="settings-contentful-space"
          v-model="config.contentfulSpace"
        />
        <label for="settings-contentful-access-token"
          >Contentful Access Token</label
        >
        <input
          type="text"
          id="settings-contentful-access-token"
          v-model="config.contentfulAccessToken"
        />
      </div>
      <button type="button" @click="save">Save</button>
    </form>
  </dialog>
</template>

<script lang="ts">
import {
  config as appConfig,
  API_URL_PROD,
  API_URL_DEV,
} from "@/services/config";
import qs from "qs";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "SettingsPanel",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    config: appConfig,
    API_URL_PROD,
    API_URL_DEV,
  }),
  methods: {
    save: function () {
      const search = qs.stringify(this.config);
      window.location.href = `/?${search}`;
    },
  },
});
</script>

<style scoped>
.SettingsPanel {
  position: absolute;
  top: auto;
  bottom: var(--toolbar-height);
  left: 20px;
  margin: 0 0 0;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  text-align: left;
  font-size: 14px;
}

form > div {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  width: 300px;
}

.section {
  margin-bottom: 10px;
}

button {
  margin: 0 auto;
  min-width: 0;
  display: block;
}
</style>
