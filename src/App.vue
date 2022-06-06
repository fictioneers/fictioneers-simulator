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
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 120px;
}
</style>
