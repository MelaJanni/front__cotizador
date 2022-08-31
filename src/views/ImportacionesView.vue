<template>
  <div class="container-fluid justify-content-center">
    <div class="row justify-content-center">
      <div class="col-10 d-flex justify-content-center align-items-center pb-5">
        <div class="row justify-content-between">
          <form action="" method="POST" @submit.prevent="procesar" class="d-flex justify-content-between">
            <CotizadorModal sentido="Destino" sentido2="Embarque"/>
            <DatosModal/>
          </form>
        </div>
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
  data(){
    return{
      importaciones: true,
    }
  },
  components: {
    CotizadorModal,
    DatosModal
  },
  methods:{
    ...mapActions(['getInformacion', 'getSubtotal']),
    procesar(){
      this.getSubtotal(this.informacion.subtotal)
      this.getInformacion(this.informacion)
    },
  },
  //created(){
    //this.$store.dispatch('procesarFormulario', this.informacion)
  //},
  computed:{
    ...mapState(['informacion'])
  },
}
</script>
<style lang="scss">
@import url('http://fonts.cdnfonts.com/css/century-gothic');
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
</style>