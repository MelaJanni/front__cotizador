<template>
  <div class="container-fluid justify-content-center">
    <div class="row justify-content-center">
      <div class="col-10 d-flex flex-column justify-content-center align-items-center pb-2">
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%" v-if="alertDanger">
          <strong>{{$store.state.msgInvalido}}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
          <form action="" method="POST" @submit.prevent="procesar2" class="row d-flex justify-content-between">
            <CotizadorModal cotizador1="exportaciones" sentido="Embarque" sentido2="Destino" />
            <DatosModal tarea="exportaciones"/>
          </form>
      </div>
    </div>
    <div class="row footer">
      <div class="col-12 d-flex justify-content-center align-items-center">
        <button @click="cambiarEspanol">Español</button>
        <button @click="cambiarEnglish">English</button>
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
    ...mapActions(['getInformacionExportacion', 'getSubtotalExportacion', 'getEspanol', 'getEnglish', 'limpiarFormExportaciones', 'validarExportaciones']),
    procesar2(){
      this.validarExportaciones()
      if ( this.validacion == true){
        this.getSubtotalExportacion(this.informacionExportacion.subtotal)
        //this.informacionExportacion.label = this.label[this.informacionExportacion.cotizador.destino.index]
        this.getInformacionExportacion(this.informacionExportacion)
        console.log(this.informacionExportacion)
        this.$router.push('/detalles/exportaciones')
      }else{
        //console.log('entra al else')
      }
    },
    cambiarEspanol(){
      this.getEspanol()
    },
    cambiarEnglish(){
      this.getEnglish()
    },
  },
  computed:{
    ...mapState(['informacionExportacion', 'informacionExportacion.subtotal', 'alertDanger', 'validacion', 'label', 'productos2'])
  },
}
</script>
<style lang="scss">

</style>