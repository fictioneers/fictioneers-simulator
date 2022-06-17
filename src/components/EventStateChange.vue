<template>
  <div class="EventStateChange">
    <div class="content">
      <p class="small">Title</p>
      <h1>{{ eventStateChange?.narrative_event_title }}</h1>
      <p class="small">Description</p>
      <p>{{ eventStateChange?.narrative_event_description }}</p>
      <div class="details">
        <div
          v-for="(property, index) of Object.keys(eventStateChange)"
          :key="index"
        >
          <p class="small">{{ property }}</p>
          <p>
            {{
              property in eventStateChange &&
              typeof eventStateChange[property] === "string"
                ? eventStateChange[property]
                : JSON.stringify(eventStateChange[property])
            }}
          </p>
        </div>
      </div>
      <div class="details">
        <h2>Contentful content</h2>
        <span></span>
        <template v-for="(contentItem, index) of content" :key="index">
          <div
            v-for="(key, index) of Object.keys(contentItem?.fields)"
            :key="index"
          >
            <p class="small">{{ key }}</p>
            <p v-if="typeof contentItem?.fields[key] === 'string'">
              {{ contentItem?.fields[key] }}
            </p>
            <p v-else-if="typeof contentItem?.fields[key] === 'object'">
              <img
                class="cotentful-image"
                v-if="
                  contentItem?.fields[key].fields.file.contentType.includes(
                    'image'
                  )
                "
                :src="contentItem?.fields[key].fields.file.url"
              />
            </p>
          </div>
        </template>
      </div>
    </div>
    <div
      class="button-holder"
      v-if="eventStateChange?.narrative_event_type === 'ACTIVITY'"
    >
      <div class="button-grid">
        <button type="button">Skip</button>
        <button type="button">Complete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { components } from "../types/fictioneers-api";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "EventStateChange",
  props: {
    eventStateChange: {
      type: Object as PropType<
        components["schemas"]["UserTimelineEventStateChangeSerializer"]
      >,
      required: true,
    },
  },
  computed: {
    content: function () {
      const { contentfulContent } = this.$store.state;
      if (!contentfulContent) {
        return;
      }
      return this.$props.eventStateChange.state_change_content
        .map((content) => {
          if (contentfulContent.entries[content.content_id]) {
            return contentfulContent.entries[content.content_id];
          }
        })
        .filter((item) => !!item);
    },
  },
});
</script>

<style scoped>
@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}

.EventStateChange {
  border: 1px solid #eee;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
  margin: 0;
  border-radius: 10px;
  background-color: #fff;
  opacity: 0;
  animation: fadeIn 300ms ease-out forwards;
}

.content {
  padding: 1em;
  flex-basis: 100%;
  text-align: left;
  margin: 0 auto;
}
.button-holder {
  flex-basis: 100%;
  margin: auto 0 0 0;
  padding: 10px;
  border-top: 1px solid #eee;
}
.button-grid {
  display: grid;
  margin: 0 auto;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  max-width: 300px;
}

.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  border: 1px solid #eee;
  padding: 10px;
}
.small {
  font-size: 12px;
  color: #999;
  margin: 0 0 0.5em;
}

.details p {
  margin: 0;
}

h1 {
  margin: 0 0 1em;
  line-height: 24px;
  font-size: 20px;
}

table {
  text-align: left;
  padding: 0;
  border-collapse: collapse;
}

.cotentful-image {
  width: 100px;
}
</style>
