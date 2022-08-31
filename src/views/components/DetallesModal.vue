<template>
    <div class="row justify-content-center">
        <div class="col-12 caja justify-content-center align-items-center">
            <div class="row">
                <div class="col-12 d-flex justify-content-start align-items-center px-0">
                    <h2>Cotizador de {{cotizador2}}</h2>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center my-3 px-0">
                  <div class="row row__width justify-content-end">
                      <div class="col-12 col-lg-5  d-flex justify-content-between align-items-center px-0">
                        <p>Puerto de Embarque (POL)</p>
                        <h4>{{$store.state.productos.embarqueSeleccionado}}</h4>
                      </div>
                  </div>
                </div>
                <div class="col-12 col-lg-7 d-flex justify-content-start align-items-center mt-4 px-0">
                <img src="../../../public/img/cotizador_icons/ltl.svg" alt="">
                <p>LTL (Carga Consolidada Terrestre)</p>
                </div>
                <div class="col-12 col-lg-5 mt-3 mt-lg-0  d-flex justify-content-between align-items-center px-0">
                <p>Volumen</p>
                <h4>{{$store.state.productos.volumenSelecionado}}</h4>
                </div>
                <div class="col-12 col-lg-7 d-flex justify-content-start align-items-center mt-4 px-0">
                <img src="../../../public/img/cotizador_icons/puerto.svg" alt="">
                <p>Puerto de Destino: ZLC, Panamá</p>
                </div>
                <div class="col-12 col-lg-5 mt-3 mt-lg-0  d-flex justify-content-between align-items-center px-0">
                <p>Longuitud max (metros)</p>
                <h4>{{$store.state.productos.longitudSelecionada}} Metros</h4>
                </div>
                <div class="col-12 col-lg-7 d-flex justify-content-start align-items-center mt-4 px-0">
                <img src="../../../public/img/cotizador_icons/validez.svg" alt="">
                <p>Válidez: 01 de Julio de 2022</p>
                </div>
                <div class="col-12 col-lg-5 mt-3 mt-lg-0  d-flex justify-content-between align-items-center px-0">
                <p>Peso (ton)</p>
                <h4>{{$store.state.productos.pesoSelecionado}} Toneladas</h4>
                </div>
            </div>
            <div class="row my-4 my-lg-5 tabla">
              <div class="col-12 tabla_scroll">
                <div class="row rojo" :class="{'azul' : azul_row}">
                    <div class="col-4 div_rojo">
                        <h5>Descripción de cargos</h5>
                    </div>
                    <div class="col-3 div_rojo">
                        <h5>Cantidad</h5>
                    </div>
                    <div class="col-2 div_rojo">
                        <h5>Precio</h5>
                    </div>
                    <div class="col-3 div_rojo">
                        <h5>Valor</h5>
                    </div>
                </div>
                <div class="row gris_claro mt-3">
                    <div class="col-4 div_gris"><p>Flete Marítimo de Importación</p></div>
                    <div class="col-3 div_gris"><p>5</p></div>
                    <div class="col-2 div_gris"><h6>$ 176</h6></div>
                    <div class="col-3 div_gris"><h6>$ 880</h6></div>
                </div>
                <div class="row gris_claro">
                    <div class="col-4 div_gris"><p>Desconsolidación</p></div>
                    <div class="col-3 div_gris"><p>5</p></div>
                    <div class="col-2 div_gris"><h6>$ {{$store.state.informacion.precios.preciosVolumen}}</h6></div>
                    <div class="col-3 div_gris"><h6>$ {{$store.state.informacion.valor.valorVolumen}}</h6></div>
                </div>
                <div class="row gris_claro">
                    <div class="col-4 div_gris"><p>Sobre-dimensión</p></div>
                    <div class="col-3 div_gris"><p>5</p></div>
                    <div class="col-2 div_gris"><h6> {{$store.state.informacion.precios.preciosLongitud}}</h6></div>
                    <div class="col-3 div_gris"><h6>$ {{$store.state.informacion.valor.valorLongitud}}</h6></div>
                </div>
                <div class="row gris_claro mb-3">
                    <div class="col-4 div_gris"><p>Sobre-peso</p></div>
                    <div class="col-3 div_gris"><p>5</p></div>
                    <div class="col-2 div_gris"><h6> {{$store.state.informacion.precios.preciosPeso}}</h6></div>
                    <div class="col-3 div_gris"><h6>$ {{$store.state.informacion.valor.valorPeso}}</h6></div>
                </div>
                <div class="row gris_oscuro">
                    <div class="col-4 div_gris"></div>
                    <div class="col-3 div_gris"></div>
                    <div class="col-2 div_gris"><h6 class="text-uppercase">Subtotal</h6></div>
                    <div class="col-3 div_gris"><h6>${{$store.state.informacion.subtotal}}</h6></div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center  justify-content-lg-end  botones mt-lg-5 mb-lg-3">
                <button class="col-10 col-lg-3 gris_btn">
                  Descargar PDF
                </button>
                <button class="col-10 col-lg-3 rojo_btn">
                  Contactar un asesor
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default{
  name: 'DetallesModal',
  props:{
    cotizador2:{
      type: String,
      default: 'importaciones',
    },
    azul_row:{
      type: Boolean,
      default: false
    }
  }
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
  h2{
    font-family: 'Century Gothic', sans-serif;
    font-weight: 600;
    font-size: 34px;
    line-height: 105.32%;
    color: #FF0000;
  }
  p{
    font-family: 'Century Gothic';
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-align: left;
    color: #000000;
  }
  img + p{
    padding-left: 15px;
  }
  h4{
    font-family: 'Century Gothic';
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    text-align: end;
    color: #000000;
  }
  .rojo{
    background: #FF0000;
    height: 7vh;
    .div_rojo{
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #ffffffa8;
      h5{
        color: #FFFFFF;
        font-family: 'Century Gothic';
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        text-transform: uppercase;
        
      }
    }
  }
  .azul{
    background: #374049;
  }
  .gris_claro{
    background-color: #F6F6F6;
    height: 7vh;
    margin-top: 7px;
    .div_gris{
      border-right: 1px solid #ffffffa8;
      display: flex;
      justify-content: center;
      align-items: center;
      p{
        font-family: 'Century Gothic';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #374049;
      }
      h6{
        font-family: 'Century Gothic';
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
      }
    }
  }
  .gris_oscuro{
    background-color: #D9D9D9;
    height: 7vh;
    .div_gris{
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #ffffffa8;
      h6{
        font-family: 'Century Gothic';
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
      }
    }
  }
  .botones{
    button{
      border: 0;
      background-color: transparent;
      outline: 0;
      font-family: 'Century Gothic';
      font-weight: 600;
      font-size: 22px;
      line-height: 27px;
      text-align: center;
      color: #FDFEFF;
      height: 7vh;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
    }
    .gris_btn{
      background-color: #374049;
      margin: 0px 15px;
      &:hover, &:focus{
        background-color: #272d33;
      }
    }
    .rojo_btn{
      background-color: #FF0000;
      &:hover, &:focus{
        background-color: #b30101;
      }
    }
  }
  @media (max-width: 992px){
    padding: 20px 30px;
    img{
      height: 15px;
    }
    img + p{
      padding-left: 3px;
    }
    h2{
      font-size: 24px;
      padding-bottom: 10px;
    }
    p, h4{
      font-size: 14px;
    }
    .rojo .div_rojo h5{
      font-size: 14px;
    }
    .gris_claro  .div_gris h6, .gris_claro .div_gris  p{
      font-size: 14px;
    }
    .gris_oscuro  .div_gris h6, .gris_oscuro .div_gris  p{
      font-size: 14px;
    }
    .botones button{
      font-size: 14px;
      margin-bottom: 20px !important;
      &:last-child{
        margin-bottom: 0 !important;
      }
    }
    .tabla{
      overflow-x: scroll;
    }
    .tabla_scroll{
      min-width: 1000px;
    }
  }
}
</style>