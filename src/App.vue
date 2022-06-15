<template>
  <MainView></MainView>
  <ToolBar></ToolBar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainView from "./components/MainView.vue";
import ToolBar from "./components/ToolBar.vue";

export default defineComponent({
  name: "App",
  components: {
    MainView,
    ToolBar,
  },
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #f6f6f6;
}
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 120px;
  /* https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/ */
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;
  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
button {
  border: 1px solid #bad8db;
  background: #cceef1;
  padding: 10px 20px;
  font-family: "Poppins", sans-serif;
  min-width: 150px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

button svg {
  width: 18px;
  height: 18px;
  display: block;
}
</style>
