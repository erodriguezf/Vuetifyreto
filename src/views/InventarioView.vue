<template>
  <div class="home">
   <h1>
     Inventario
   </h1>
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Listado de inventarios </v-card-title>
       <v-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iste ducimus error explicabo neque provident.</v-card-subtitle>
        <v-data-table
        :headers="headers_listado_inventario"
        :items="Listado_inventario"
        :items-per-page="5"
         class="elevation-1"
    >
    </v-data-table>
      <v-card-actions>
        <v-btn class="blue"
            text @click="dialoglistado=true">Add</v-btn>
       </v-card-actions>
     </v-card>
   </v-row>
   
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1 elevation-3">
       <v-card-title>Movimientos</v-card-title>
       <v-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iste ducimus error explicabo neque provident.</v-card-subtitle>
        <v-data-table
        :headers="headers_movimiento"
        :items="movimiento"
        :items-per-page="5"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        show-expand
         class="elevation-1"
        > 
        <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-btn >
        
          Editar {{item.id_tipomovimiento}}
        </v-btn>
         <v-btn>
          Eliminar {{item.id_tipomovimiento}}
        </v-btn>
      </td>
    </template>
        </v-data-table>
       <v-card-actions>
        <v-btn class="blue"
            text @click="dialoglmovimiento=true">Add</v-btn>
       </v-card-actions>
     </v-card>
   </v-row>
    <v-dialog v-model="dialoglistado">
       <v-card>
        <v-card-text>
          <v-row>
          <v-select
           v-model="id_articulo"
            label="id Articulo"
            :items="list_articulos"
          >
            
          </v-select>
          </v-row>
          <v-row>
           <v-select
            v-model="id_bodega"
            label="id Bodega"
            :items="list_Bodegas"
           >
          </v-select>
          </v-row>
          <v-row>
            <v-text-field
            v-model="saldo"
            label="Saldo"
            required
             type="number"
          ></v-text-field>
          </v-row>
           <v-row>
            <v-text-field
            v-model="fechaultimomovimiento"
            label="Fecha Ultimo movimiento"
             type="date"
            required
          ></v-text-field>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="AddListado">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
    <v-dialog v-model="dialoglmovimiento">
       <v-card>
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="fechahora"
            label="Fecha Hora"
            required
             type="date"
          ></v-text-field>
          </v-row>
           <v-row>
          <v-select
            v-model="id_tipomovimiento"
            label="id Tipo movimiento"
            :items="list_Tipo_movimiento"
          >
          </v-select>
          </v-row>
           <v-row>
            <v-text-field
            v-model="observaciones"
            label="Observaciones"
            required
          ></v-text-field>
          </v-row>
          <v-row>
          <v-select
           v-model="id_producto_m"
          label="id Articulo"
          :items="list_articulos"
          >

          </v-select>
          </v-row>
           <v-row>
           <v-select
            v-model="id_bodega_m"
            label="id Bodega"
            :items="list_Bodegas"
           >
            
          </v-select>
          </v-row>
          <v-row>
            <v-text-field
            v-model="cantidad"
            label="Cantidad"
            required
             type="number"
          ></v-text-field>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="Addmovimiento">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
   export default{
       data(){
         return{
             config:{
              headers: {
              Authorization: `Bearer ${(localStorage.getItem('token'))}` ,
               "Content-Type": "application/json"
              }
            },
            list_articulos:[],
            list_Bodegas:[],
            list_Tipo_movimiento:[],
            dialoglistado:false,
            id_articulo:0,
            id_bodega:0,
            saldo:0,
            fechaultimomovimiento:'',
            headers_listado_inventario:[
           {text: 'id Articulo', value:'idArticulo'},
           {text: 'id Bodega', value:'idBodega'},
           {text: 'Saldo', value:'saldo'},
           {text: 'Fecha ultimo movimiento', value:'fechaultimomovimiento'},
      ],
           Listado_inventario: [], 
          dialoglmovimiento:false,
         fechahora:'',
         id_tipomovimiento:0,
         observaciones:'',
         id_producto_m:0,
         id_bodega_m:0,
         cantidad:0,
         headers_movimiento:[
           {text: 'Fecha Hora', value:'fechahora'},
           {text: 'id tipo movimiento', value:'idTipomovimiento'},
           {text: 'Observaciones', value:'observaciones'},
           {text: 'id articulo', value:'idArticulo'},
           {text: 'id bodega', value:'idBodega'},
           {text: 'Cantidad', value: 'cantidad'}
         ],
        movimiento: [
        ],
         }
       },
         created () {
         axios.get('/Inventario/Get',this.config)
         .then(response => {
            this.Listado_inventario = response.data;
          })
         .catch(e => {
          console.log(e);
         })
         axios.get('/Movimiento/Get',this.config)
         .then(response => {
            this.movimiento = response.data;
          })
         .catch(e => {
          console.log(e);
         })
          axios.get('/TipoMovimiento/Get',this.config)
    .then(response => {
       this.list_Tipo_movimiento = response.data.map(tipom=>tipom.id);
    })
    .catch(e => {
      console.log(e);
    }) 
     axios.get('/Bodegas/Get',this.config)
    .then(response => {
       this.list_Bodegas = response.data.map(tipom=>tipom.id);
    })
    .catch(e => {
      console.log(e);
    }) 
     axios.get('/Articulos/Get',this.config)
    .then(response => {
       this.list_articulos = response.data.map(tipom=>tipom.id);
    })
    .catch(e => {
      console.log(e);
    }) 
         },
       methods:{
          AddListado(){
            this.dialoglistado=false,
             this.Listado_inventario.push({
                idArticulo:this.id_articulo,
                idBodega:this.id_bodega,
                saldo:this.saldo,
                fechaultimomovimiento:this.fechaultimomovimiento
             }),
            this.id_articulo=0,
            this.id_bodega=0,
            this.saldo=0,
            this.fechaultimomovimiento=''
          },
          Addmovimiento(){
            this.dialoglmovimiento=false
            this.movimiento.push({
              id:this.movimiento.length,
              fechahora:this.fechahora,
              idTipomovimiento:this.id_tipomovimiento,
              observaciones:this.observaciones,
              idArticulo:this.id_producto_m,
              idBodega:this.id_bodega_m,
              cantidad:this.cantidad
            }),
            this.fechahora='',
            this.id_tipomovimiento='',
            this.observaciones='',
            this.id_producto_m=0,
            this.id_bodega_m=0,
            this.cantidad=0
          }
       }
   }
</script>
   }

