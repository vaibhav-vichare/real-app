<template>
<div></div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Getter} from 'vuex-class';
import {ImageStoreObj} from '@/interfaces/ImageStoreObj';
@Component
export default class Report extends Vue {
  @Getter currentObject!: ImageStoreObj;

  uniqueReasons: string[];
  report: any[] = [];

  created() {
    this.uniqueReasons = [...new Set([].concat(...this.currentObject.data.map( o => o.reasons)))];
    this.createReportData();
  }

  createReportData() {
    const tempArray = [];
    for (const reason of this.uniqueReasons) {
        for (const each of this.currentObject.data) {
          if (each.reasons.includes(reason)) {
            const imageItem = {
              url: each.url,
              reason
            };
            tempArray.push(imageItem);
          }
        }
    }
    this.generateFinalReport(tempArray);
  }

  generateFinalReport(reportArray) {
    reportArray.forEach(item => {
      const existing = this.report.filter( each => {
        return each.reason === item.reason;
      });
      if (existing.length) {
        const existingIndex = this.report.indexOf(existing[0]);
        this.report[existingIndex].url = this.report[existingIndex].url.concat(item.url);
      } else {
        if (typeof item.url === 'string') {
          item.url = [item.url];
          this.report.push(item);
        }
      }
    });
  }

}
</script>

<style lang="scss" scoped>

</style>