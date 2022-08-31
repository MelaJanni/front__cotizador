<template>
  <div class="container-fluid justify-content-center">
    <div class="row justify-content-center">
      <div class="col-10 d-flex">
        <div class="row justify-content-between">
          <DetallesModal/>
          <TerminosModal/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DetallesModal from './components/DetallesModal.vue';
import TerminosModal from './components/TerminosModal.vue';
export default {
    name: "DetallesView",
    props: {
      cotizador: String
    },
      components: {
      DetallesModal,
      TerminosModal
    },
}
</script>
<style lang="scss">

</style>