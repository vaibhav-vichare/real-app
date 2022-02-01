<template>
  <div class="result-viewer">
    <div class="image-container">
      <div class="image-box" v-for="(image, index) in finalResult" :key="index">
        <img :src="image.url" width="100" />
      </div>
    </div>
    <div class="button-container">
      <button class="primary-button">Generate report</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({
  components: {
  }
})
export default class ImageViewer extends Vue {
  @Prop()
  finalResult;

  data() {
    return {
    };
  }
}
</script>
<style scoped lang="scss">
@import "../assets/styles/common";
.result-viewer {
  padding: $building-unit-x5;
}
.image-container {
  padding-bottom: $building-unit-x5;
  display: flex;
  justify-content: left;
}

.image-box {
  padding: 0 $building-unit-x2 $building-unit-x2 0;
}

.button-container {
  padding-top: $building-unit-x5;
  display: flex;
  border-top: solid 1px $border-color;
  justify-content: right;
}
</style>
