<template>
  <div class="col-12 col-xxl- caja ">
    <div class="row">
        <div class="col-12 d-flex justify-content-start align-items-center">
          <img src="../../../public/img/cotizador_icons/users.svg" alt="">
          <h4>Ingresa tus datos </h4>
        </div>
        <div class="col-12 d-flex flex-column justify-content-center align-items-start mt-3 mt-lg-5">
          <h5>Nombre completo:</h5>
          <input type="text" placeholder="Ej. Luis Rincon" id="inputName" v-model="informacion.usuario.nombre">
        </div>
        <div class="col-12 d-flex flex-column justify-content-center align-items-start mt-3">
          <h5>Correo electrónico:</h5>
          <input type="mail" placeholder="Ej. Ejemplo@gmail.com" id="inputMail" v-model="informacion.usuario.email">
        </div>
        <div class="col-12 d-flex flex-column justify-content-center align-items-start mt-3">
          <h5>Teléfono:</h5>
          <input type="number" placeholder="Ej. 310 221....." id="inputNumero" v-model="informacion.usuario.telefono">
        </div>
        <div class="col-12 my-4 mt-lg-5">
          <router-link :to="{ name:'DetallesView', params:{id : tarea}}">
            <button type="submit">Generar Cotización</button>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default{
    name: 'DatosModal',
    data(){
      return{
        
      }
    },
    props:{
      tarea:{
        type: String,
        default: 'importaciones',
      }
    },
    computed:{
      ...mapState(['usuario', 'informacion']),
    }
}
</script>

<style lang="scss" scoped>
.caja{
    background: #FFFFFF;
    box-shadow: 0px 4px 24px rgba(109, 141, 173, 0.15);
    border-radius: 25px;
    min-height: auto;
    width: 100%;
    border-radius: 20px;
    padding: 60px 60px;
    @media (min-width: 1440px) {
      max-width: 48%;
    }
    h4{
      font-family: 'Century Gothic';
      font-weight: 600;
      font-size: 30px;
      line-height: 133%;
      color: #000000;
      padding-left: 15px;
    }
    h5{
      font-family: 'Poppins';
      font-weight: 400;
      font-size: 18px;
      line-height: 133%;
      color: #66737B;
      padding: 10px 0px 20px 0px;
    }
    input{
      background: #FFFFFF;
      border: 1px solid #B0B0B0;
      border-radius: 10px;
      width: 100%;
      height: 7vh;
      padding-left: 30px;
      font-family: 'Poppins';
      font-weight: 400;
      font-size: 20px;
      line-height: 133%;
      color: #B0B0B0;
      &:focus{
        outline: none;
        box-shadow: none;
        border-color: #FF0000;
        color: #FF0000;
      }
      &::placeholder{
        color: #b0b0b0be;
      }
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    input[type=number] { -moz-appearance:textfield; }
    a{
      text-decoration: none;
    }
    button{
      border: 0;
      outline: none;
      background: #FF0000;
      border-radius: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Century Gothic';
      font-weight: 600;
      font-size: 22px;
      line-height: 27px;
      text-align: center;
      color: #FDFEFF;
      height: 7vh;
      text-decoration: none;
    }
    @media (max-width: 992px) {
      padding: 20px 30px;
      h4{
        font-size: 24px;
      }
      h5, input{
        font-size: 14px;
      }
      h5{
        padding-bottom: 10px;
      }
      input{
        height: 5vh;
      }
      button{
        font-size: 16px;
        height: 5vh;
      }
    }
    @media (min-width: 992px) {
      min-height: 70vh !important;
    }
}
</style>