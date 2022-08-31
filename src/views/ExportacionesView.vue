<template>
  <div class="container-fluid justify-content-center">
    <div class="row justify-content-center">
      <div class="col-10 d-flex justify-content-center align-items-center pb-5">
        <div class="row justify-content-between">
          <form action="" method="POST" @submit.prevent="procesar" class="d-flex justify-content-between">
            <CotizadorModal cotizador1="exportaciones" :importaciones="false" :exportaciones="true" sentido="Embarque" sentido2="Destino"/>
            <DatosModal/>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DatosModal from './components/DatosModal.vue';
import CotizadorModal from './components/CotizadorModal.vue';
import { mapActions, mapState } from 'vuex';
export default {
  name: "ExportacionesView",
  components: {
    DatosModal,
    CotizadorModal
  },
  methods:{
    ...mapActions(['getInformacion', 'getSubtotal']),
    procesar(){
      this.getSubtotal(this.informacion.subtotal)
      this.getInformacion(this.informacion)
    },
  },
  computed:{
    ...mapState(['informacion'])
  },
}
</script>
<style lang="scss">

</style>