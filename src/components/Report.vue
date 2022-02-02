<template>
  <div>
    <div class="component-wrapper">
      <div class="component-heading">Report</div>
      <div class="report-viewer">
        <div class="reason-group" v-for="(item, index) in report" :key="index">
          <div class="reason-header">{{item.reason}}</div>
          <div class="image-group">
            <div v-for="(url, index) in item.url" :key="index" class="image-box">
              <img :src="url" width="100" />
            </div>
          </div>
        </div>
      </div>
      <div class="button-container">
        <button class="primary-button" @click="goToHome">Add more</button>
      </div>
    </div>
  </div>
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

  goToHome() {
    this.$router.push({ name: 'Home', params: {
      keepResult: 'true'
      }});
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/styles/common";

.report-viewer {
  padding: 0 $building-unit-x5 $building-unit-x5;
}
.reason-group {
  display: flex;
  flex-direction: column;
}
.reason-header {
  font-weight: bold;
  padding: $building-unit-x5;
  border-bottom: solid 1px $border-color;
}
.image-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: $building-unit-x5;
}

.image-box {
  padding: 0 $building-unit-x2 $building-unit-x2 0;
}

.button-container {
  padding: $building-unit-x5;
  display: flex;
  border-top: solid 1px $border-color;
  justify-content: right;
}
</style>