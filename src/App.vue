<template>
  <nav class="container-fluid">
    <div class="row justify-content-center row__width">
      <div class="col-3 col-lg-5 d-flex justify-content-start align-items-center px-0">
        <router-link to="/"><img src="../public/img/cotizador_icons/logo.svg" alt=""></router-link> 
      </div>
      <div class="col-8 col-lg-5 d-flex justify-content-end align-items-center px-0">
        <router-link to="/" :class="rutaImp() ">
          {{ $t("message.cotizadorImp", {}, { locale: $store.state.lang }) }}
        </router-link> 
        <span></span>
        <router-link to="/exportaciones" :class=" rutaExp()">
          {{ $t("message.cotizadorEx", {}, { locale: $store.state.lang }) }}
        </router-link>
      </div>
    </div>
  </nav>
  <router-view/>
  
</template>
<script>
export default {
  methods:{
    rutaImp(){
      return this.$route.fullPath == '/detalles/importaciones' ? 'active' : ''  
    },
    rutaExp(){
      return this.$route.fullPath == '/detalles/exportaciones' ? 'active' : ''  
    },
  },
  computed:{
    
  }
}
</script>
<style lang="scss"> 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 15px 0px;
  a {
    font-weight: bold;
    color: #000000;
    margin: 0px 15px;
    text-decoration: none;
    &.router-link-exact-active {
      color: #FF0000;
    }
    &:hover{
      color: #FF0000;
    }
    @media (max-width: 992px) {
      font-size: 8px;
      margin: 0px 5px;
      img{
        height: 30px;
      }
    }
  }
  .active{
    color: #FF0000;
  }
  span{
    display: inline;
    height: 50px;
    width: 2px;
    background-color: #FF0000;
  }
}
</style>
