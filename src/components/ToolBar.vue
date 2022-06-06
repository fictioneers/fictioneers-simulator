<template>
  <div class="ToolBar">
    <div class="button-holder">
      <button type="button">Progress story</button>
    </div>
    <div>Step 0 | Beat 0: beat name</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToolBar",
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
</style>
