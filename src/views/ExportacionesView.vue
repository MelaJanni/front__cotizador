<template>
  <div class="container-fluid justify-content-center">
    <div class="row justify-content-center">
      <div class="col-10 d-flex justify-content-center align-items-center pb-5">
        <div class="row justify-content-between">
          <form action="" method="POST" @submit.prevent="procesar" class="d-flex justify-content-between">
            <CotizadorModal cotizador1="exportaciones" sentido="Embarque" sentido2="Destino" />
            <DatosModal tarea="exportaciones"/>
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
      //this.$router.push('/detalles')
    },
  },
  computed:{
    ...mapState(['informacion'])
  },
  created(){
    this.$store.dispatch('getInformacion')
    this.$store.dispatch('getSubtotal')
  }
}
</script>
<style lang="scss">

</style>