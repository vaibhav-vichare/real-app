<template>
  <div class="image-viewer">
    <div class="image-container">
      <img :src="visibleImage" width="420" />
    </div>
    <div class="button-container">
      <button @click="getImages" class="primary-button">Accept</button>
      <button class="primary-button" @click="openModal()">Reject</button>
    </div>
    <Modal :heading="modalHeading" :selectedImage="visibleImage" v-on:modalState="modalState" v-on:reasonsRecieved="sendReasonsToHome" v-show="showModal"></Modal>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import ImageService from '@/services/ImageService.ts';
import Modal from '@/components/global/modal.vue';
import {IimageObj} from '@/interfaces/IimageObj';
@Component({
  components: {
    Modal
  }
})
export default class ImageViewer extends Vue {
  visibleImage =  '';
  showModal: boolean;
  createImageObj: IimageObj;
  data() {
    return {
      visibleImage: '',
      showModal: false,
      modalHeading: 'Why'
    };
  }

  created() {
    this.getImages();
  }

  getImages() {
    const imageService = new ImageService();
    imageService.getImage().then( (response: any) => {
      this.visibleImage = response;
    });
  }

  modalState(val) {
    this.showModal = val;
  }

  openModal() {
    this.showModal = true;
  }

  sendReasonsToHome(val) {
    this.createImageObj = {
      url: this.visibleImage,
      reasons: val
    };
    this.$emit('result', this.createImageObj);
    this.getImages();
  }
}
</script>
<style scoped lang="scss">
@import "../assets/styles/common";
.image-viewer {
  padding: $building-unit-x5;
}
.image-container {
    padding-bottom: $building-unit-x5;
}

.button-container {
  display: flex;
  justify-content: space-between;
}
</style>
