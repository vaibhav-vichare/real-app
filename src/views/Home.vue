<template>
  <div>
  <div class="component-wrapper">
    <div class="component-heading">Real or not?</div>
    <ImageViewer v-on:result="showResult"></ImageViewer>
  </div>
    <div ref="result">
      <div v-if="showResultView" class="component-wrapper result-view">
        <div class="component-heading">Results</div>
        <ResultViewer v-on:result="showResult" :finalResult="finalResult"></ResultViewer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImageViewer from '@/components/ImageViewer.vue';
import ResultViewer from '@/components/ResultViewer.vue';
import {IimageObj} from '@/interfaces/IimageObj';
import {Getter} from 'vuex-class';
import {ImageStoreObj} from '@/interfaces/ImageStoreObj';
@Component({
  components: {
    ImageViewer,
    ResultViewer
  }
})
export default class Home extends Vue {
  @Getter currentObject!: ImageStoreObj;

  showResultView = false;
  finalResult: IimageObj[] = [];

  created() {
    const routeParam = this.$route.params;
    if (routeParam.keepResult === 'true') {
      this.showResultView = true;
      this.finalResult = this.currentObject.data;
    }
  }

  showResult(val) {
    this.showResultView = true;
    this.finalResult.push(val);
  }



}
</script>

<style lang="scss" scoped>
@import "../assets/styles/common";
.result-view {
  margin-top: $building-unit-x20;
  margin-bottom: $building-unit-x20;
}
</style>
