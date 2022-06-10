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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 120px;
}
button {
  border: 1px solid #bad8db;
  background: #cceef1;
  padding: 10px 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-width: 150px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
