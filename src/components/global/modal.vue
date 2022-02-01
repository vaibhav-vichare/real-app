<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="component-heading">{{ heading }}</div>
      <div class="modal-body">
        <ReasonSelector v-on:modalHide="closeModal" v-on:reasonsSelected="sendReasons"></ReasonSelector>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator';
import ReasonSelector from '@/components/ReasonSelector.vue';
@Component({
  components: {
    ReasonSelector
  }
})
export default class Modal extends Vue {
  @Prop()
  heading: string;

  data() {
    return {
      modalShow: false
    };
  }

  closeModal(val) {
    this.$emit('modalState', val);
  }

  sendReasons(val) {
    this.$emit('reasonsRecieved', val);
  }

}
</script>


<style lang="scss" scoped>
@import "../../assets/styles/common";
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  transition: opacity 0.3s ease;
  flex-direction: row;
  .modal-wrapper {
    width: $modal-width;
    align-self: center;
    background-color: $white;
    border-radius: $building-unit;
  }
  .modal-body {
    padding: $building-unit-x5;
  }
}
</style>