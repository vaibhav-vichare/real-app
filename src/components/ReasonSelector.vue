<template>
  <div class="selection-container">
    <div class="options-container">
      <ul>
        <li class="checkbox-container" v-for="(reason, index) in reasons" :key="index">
          <input type="checkbox" id="index" :value="reason" v-model="selectedReasons" />
          <label :for="reason">
          {{reason}}</label>
        </li>
      </ul>
    </div>
    <div class="other-container">
      <div><label>Other:</label></div>
      <input type="text" v-model="otherReason" placeholder="Enter your own reason" />
      <div v-if="duplicateEntry" class="error-text">Duplicate entry!</div>
    </div>
    <div class="buttons-container">
      <button class="primary-button" @click="cancel">Cancel</button>
      <button :class="selectedReasons.length || otherReason.length ? 'primary-button' : 'disabled-button'" :disabled="selectedReasons.length || otherReason.length ? false : true" @click="submitReason">Ok</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
  }
})
export default class ReasonSelector extends Vue {
  reasons: string[] = ['Background', 'Eyes', 'Nose', 'Hairs', 'Mouth', 'Ears', 'Jwellery'];
  selectedReasons: string[] = [];
  otherReason = '';
  duplicateEntry = false;

  data() {
    return {
      selectedReasons: [],
      otherReason: ''
    };
  }

  cancel() {
    this.$emit('modalHide', false);
  }

  submitReason() {
    if (this.otherReason) {
      const findDuplicate = this.reasons.find(item => {
        return item.toLowerCase() === this.otherReason;
      });
      if (findDuplicate) {
        this.duplicateEntry = true;
      } else {
        this.reasons.push(this.otherReason);
        this.selectedReasons.push(this.otherReason);
        this.otherReason = '';
        this.duplicateEntry = false;
        this.$emit('reasonsSelected', this.selectedReasons);
        this.$emit('modalHide', false);
      }
    } else {
      this.$emit('reasonsSelected', this.selectedReasons);
      this.$emit('modalHide', false);
    }

  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/common";
.options-container {
  max-height: $building-unit-x50;
  text-align: left;
  margin-bottom: $building-unit-x5;
  overflow-y: scroll;
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: $building-unit;
    }
  }
}
.other-container {
  text-align: left;
  margin-bottom: $building-unit-x5;
}
.buttons-container {
  padding: $building-unit-x5 0 0;
  border-top: solid 1px $border-color;
  display: flex;
  justify-content: space-between;
}
</style>