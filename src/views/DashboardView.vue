<template>
   <div class="home">
   <h1>
     Inventario
   </h1>

    <v-card
    color="blue"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .1)">
        <v-sparkline
         color="rgba(255, 255, 255, .7)"
          :value="poinst"
            :fill="fill"
      :gradient="selectedGradient"
      :line-width="width"
      :padding="padding"
      :smooth="radius || false"
       auto-draw
        >
          <template v-slot:label="item" >
           ${{item.value}}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>
    <v-card-text>
      <div class="text-h4 font-weight-thin">
        Saldo de cada inventario
      </div>
    </v-card-text>
  </v-card>

   <h1>Movimientos</h1>
   <v-card
    color="blue"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="movimientos"
        color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>
    <v-card-text>
      <div class="text-h4 font-weight-thin">
         Cantidad en cada movimiento
      </div>
    </v-card-text>
  </v-card>
 </div>
</template>
<script>
   import axios from 'axios'
   const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
  export default({
     data(){
         return{
          poinst:[],
          movimientos:[],
          maxmovemientos:0,
          maximo:0,
          pixels:[],
            config:{
              headers: {
              Authorization: `Bearer ${(localStorage.getItem('token'))}` ,
               "Content-Type": "application/json"
              }
            },
        fill: true,
      selectedGradient: gradients[4],
      gradients,
      padding: 8,
      radius: 10,
      width: 2,
         }
     },
      created () {
         axios.get('/Inventario/Get',this.config)
         .then(response => {
            this.poinst = response.data.map(data=>data.saldo);
            console.log(this.poinst);
            this.maximo=Math.max(...this.poinst);
            this.poinst.forEach(elemento => {
               
               this.pixels.push((elemento*200)/this.maximo)
            });
               console.log(this.pixels);
          })
         .catch(e => {
          console.log(e);
         })
         axios.get('/Movimiento/Get',this.config)
         .then(response => {
            this.movimientos = response.data.map(data=>data.cantidad);
            this.maxmovemientos = Math.max(...this.movimientos);
            console.log("maximo: ", this.maxmovemientos);
          })
         .catch(e => {
          console.log(e);
         })
      },
      computed:{
        pixelspoints(){
            return this.pixels.reduce((poinst,amoubt,i)=>{
              return `${poinst} ${(300*(i))/(this.pixels.length-1)},${200-amoubt}`
            },`${this.pixels.length}`)
        },

        pixelslimpios(){
         return this.pixelspoints.substring(2,this.pixelspoints.length)
        }

       
      }
  })
</script>



