<template>
    <div class="row justify-content-center">
        <div class="col-12 caja my-4">
            <h4 class="terminos">
                Términos y condiciones
                <div class="span"></div>
            </h4>
            <ul class="mt-4 mt-lg-5">
                <li>
                Min. 1 CBM / Relación Peso Vol: 1 CBM = 1000 kgs // VIA SHENZEN Vol: 1 CBM = 500 kgs.	
                </li>
                <li>
                Manejos TGD Panama USD 35.00 (Bill of Lading/Documentacion).	
                </li>
                <li>
                Tarifas incluyen cargos IMO 2020.	
                </li>
                <li>
                Todas las cargas están sujetas al cobro de Agency Fee de USD 8.00.		
                </li>
                <li>
                Todas las cargas están sujetas al cobro de LCL Fee de USD 20.00 por CBM.		
                </li>
                <li>
                **NUEVO CARGO: RECOVERY FEE $30.00 / TODAS LAS CARGAS ESTAN SUJETAS A ESTE CARGO A PARTIR DEL 1RO DE MAYO DE 2020 POR BL**.
                </li>
                <li>
                DMC de Salida de CFZ $35.00 para cargas con destino final a Ciudad de Panama y Liquidadas (Opcional). 		
                </li>
                <li>
                TARIFA NO INCLUYE: IMO - CUARENTENA - INSPECCIONES - FUMIGACION - ALMACENAJE - ADUANAS - SEGURO DE CARGA. 		
                </li>
                <li>
                TARIFA NO INCLUYE : CERTIFICADOS FITOSANITARIOS - AUPSA ** APLICA RECARGO DE USD 50.00 USD POR INSPECCIÓN **.		
                </li>
                <li>
                Tarifas validas para Carga General.
                </li>
                <li>
                TODAS LAS CARGAS LCL DE EUROPA Y BRASIL TIENE UN CARGO ADICIONAL DE MANEJO DE IMPORTACION DE USD 45.00 POR BL.		
                </li>
                <li>
                TODAS LAS CARGAS LCL DE EUROPA VIA ROTTERDAM APLICA UN MINIMO DE 3 CBM (APLICA MONEDA EN USD Y EUR). 		
                </li>
                <li>
                Solicitud de Costos EXW DDU DDP Favor consultar con anterioridad.	
                </li>
                <li>
                Toda carga LCL sera facturada de acuerdo a ETD (Fecha confirmada de Agente en Origen y Según Tarifario Vigente).		
                </li>
                <li>
                Toda carga LCL via Hong Kong sera facturada de acuerdo a ETD de Hong Kong (Fecha confimada por el agente en Origen y Según Tarifario Vigente).		
                </li>
                <li>
                Toda carga LCL via Busan sera facturada de acuerdo a ETD de Busan (Fecha confimada por el agente en Origen y Según Tarifario Vigente).		
                </li>
                <li>
                Toda carga LCL via Shenzhen sera facturada de acuerdo a ETD de Shenzhen (Fecha confimada por el agente en Origen y Según Tarifario Vigente).		
                </li>
                <li>
                ** TODA CARGA CON SOBREDIMENSION O SOBRE PESO DEBE CONSULTARSE CASO A CASO ** APLICAN RECARGOS **.
                </li>
                <li>
                ** Cargas que excedan de las siguientes medidas : Largo 4 mts - Ancho: 2.0 mts / Alto : 2.0 mts **.		
                </li>
                <li>
                ** Sobrepeso superior a 2 TON por paquete y/o 5 TON por embarque **. 		
                </li>
                <li>
                Todas las Cargas Vía Hong Kong deben contar con Certificado de Origen ( C.O. ) y Fumigadas de llevar Madera.		
                </li>
                <li>
                Toda carga debe venir correctamente embaladas, de no ser así se debe pedir cotizacion para su embalaje.		
                </li>
                <li>
                ** CARGA PELIGROSA DEBE CONSULTARSE CASO A CASO **.		
                </li>
                <li>
                ** Carga peligrosa Clase 1 y 7, Armas, municiones y explosivos están ESTRICTAMENTE PROHÍBIDOS **.		
                </li>
                <li>
                Para productos de: Consumo humano, Licores, Obras de Arte, Efectos personales, Productos Veterinarios ** Consultar caso a caso **.
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default{
  name: 'TerminosModal' ,
    props:{
        cotizador: {
          type: String,
          default: 'importaciones,'
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
  ul{
    padding-left: 20px;
    li{
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
}
</style>