<template>
  <div class="container-fluid justify-content-center">
    <div class="row justify-content-center">
      <div class="col-10 d-flex flex-column justify-content-center align-items-center pb-2" >
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%" v-if="alertDanger">
          <strong>{{$store.state.msgInvalido}}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <form action="" method="POST" @submit.prevent="procesar" class="row d-flex justify-content-between">
          <CotizadorModal sentido="Destino" sentido2="Embarque"/>
          <DatosModal tarea="importaciones"/>
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
import { mapActions, mapState } from 'vuex';
import CotizadorModal from './components/CotizadorModal.vue';
import DatosModal from './components/DatosModal.vue';
export default {
  name: 'ImportacionesView',
  components: {
    CotizadorModal,
    DatosModal,
  },
  methods:{
    ...mapActions(['getInformacion', 'getSubtotal', 'getEspanol', 'getEnglish', 'limpiarFormImportaciones', 'validarImportaciones']),
    procesar(){
      this.validarImportaciones()
      if(this.validacion == true){
        this.getSubtotal(this.informacion.subtotal)
        this.getInformacion(this.informacion)
        this.$router.push('/detalles/importaciones')
      }else{
        //console.log('entra al else importacion')
        //console.log(this.informacion.cotizador.embarque)
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
    ...mapState(['informacion', 'informacion.subtotal', 'lang', 'alertDanger', 'validacion'])
  },
  created(){
    this.limpiarFormImportaciones()
  }
}
</script>
<style lang="scss">
@import url('https://fonts.cdnfonts.com/css/century-gothic');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap'); 
.row__width{
  width: 100%;
}
#app{
  background-color: #F0F0F0;
  min-height: 100vh;
  
}
body{
  margin: 0 !important;
}
h1, h2, h3, h4, h5, h6, p{
  margin: 0 !important;
}
.footer{
  background-color: #eeeded;
  min-height: 7vh;
  button{
    border: 0;
    background-color: transparent;
    color: #FF0000;
    font-family: 'Century Gothic', sans-serif;
    font-weight: 400;
    font-size: 16px;
    text-decoration: underline;
    margin: 0px 15px;
  }
}
</style>