<template>
  <div class="container-fluid justify-content-center">
    <div class="row justify-content-center">
      <div class="col-10 d-flex">
        <div class="row justify-content-between">
          <DetallesModal 
          :cotizador2=" ruta == 'importaciones' ? 'importaciones' : 'exportaciones' " 
          :azul_row="ruta == 'importaciones' ? false : true"
          :sentido="ruta == 'importaciones' ?   'Embarque (POL)' : 'Destino:'"
          :sentido2="ruta == 'importaciones' ?  'Destino: ZLC, Panamá' : 'Embarque (POL): ZLC, Panamá'"/>
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
    components: {
      DetallesModal,
      TerminosModal
    },
    data(){
      return{
        ruta : this.$route.params.id,
      }
    },
    created(){
      //console.log(this.ruta)
    },
}
</script>
<style lang="scss">

</style>