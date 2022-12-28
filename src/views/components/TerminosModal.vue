<template>
    <div class="row justify-content-center">
        <div class="col-12 caja my-4">
            <h4 class="terminos">
              {{ $t("message.terminos", {}, { locale: $store.state.lang }) }}
                <div class="span"></div>
                
            </h4>
            <div class="mt-4 mt-lg-5 ul">
                <div v-if="rutaName == 'ImportacionesView'" v-html="$store.state.terminosImports.terminos"></div>
                <div v-else v-html="$store.state.terminosExports.terminos"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default{
  name: 'TerminosModal' ,
  data(){
    return{
      rutaName : this.$route.name,
    }
  },
  props:{
    cotizador: {
      type: String,
      default: 'importaciones,'
    }
  },
  created(){
    this.$store.dispatch('getTerminosImportaciones')
  },
  methods:{
    ...mapActions['getTerminosImportaciones']
  },
}
</script>

<style lang="scss" scoped>
.caja{
  background: #FFFFFF;
  box-shadow: 0px 4px 24px rgba(109, 141, 173, 0.15);
  border-radius: 25px;
  min-height: 70vh;
  width: 100%;
  border-radius: 20px;
  padding: 60px 60px;
  .terminos{
    font-family: 'Century Gothic';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: #000000;
    text-align: left;
  }
  .span{
    height: 5px;
    width: 15%;
    background: #FF0000;
    border-radius: 23px;
    margin-top: 30px;
  }
  .ul{
    padding-left: 20px;
    div{
      text-align: start;
      font-family: 'Century Gothic';
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: #000000;
    }
  }
  @media (max-width: 992px){
    padding: 20px 30px;
    li{
      font-size: 12px !important;
    }
    .span{
      margin-top: 10px;
    }
  }
  @media (max-width: 1600px){
    .terminos{
      font-size: 18px;
    }
    .span{
      margin-top: 20px !important;
    }
    .ul{
      margin-top: 40px !important;
    }
  }
}
</style>