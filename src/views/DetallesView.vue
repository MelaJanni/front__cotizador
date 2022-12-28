<template>
  <div class="container-fluid justify-content-center">
    <div class="row justify-content-center">
      <div class="col-10 d-flex justify-content-center">
        <div class="row justify-content-center justify-content-lg-between row__width">
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
import { mapActions } from 'vuex';
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
    methods:{
      ...mapActions(['getEspanol', 'getEnglish']),
      cambiarEspanol(){
        this.getEspanol()
      },
      cambiarEnglish(){
        this.getEnglish()
      },
    },
}
</script>
<style lang="scss">

</style>