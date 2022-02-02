<template>
  <div id="app">
    <header>
      <div class="heading">Real</div>
    </header>
    <section class="align-center">
      <router-view/>
    </section>
    <footer>
      Real app
    </footer>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
@Component({
  components: {
  }
})
export default class App extends Vue {
}
</script>
<style lang="scss" scoped>
@import "./assets/styles/common";
.align-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
