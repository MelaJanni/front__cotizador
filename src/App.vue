<template>
  <nav>
    <div class="row justify-content-center">
      <div class="col-2 col-lg-5 d-flex justify-content-start align-items-center px-0">
        <img src="../public/img/cotizador_icons/logo.svg" alt="">
      </div>
      <div class="col-8 col-lg-5 d-flex justify-content-end align-items-center px-0">
        <router-link to="/">Cotizador de Importaciones</router-link> 
        <span></span>
        <router-link to="/exportaciones">Cotizar Exportaciones</router-link>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;

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
      font-size: 10px;
      margin: 0px 5px;
      img{
        height: 30px;
      }
    }
  }
  span{
    display: inline;
    height: 50px;
    width: 2px;
    background-color: #FF0000;
  }
}
</style>
