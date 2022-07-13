<template>
    <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1 elevation-3">
       <v-card-title>Movimientos</v-card-title>
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
         <v-icon
        small
        class="mr-2"
        @click="EditItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      </td>
    </template>
        </v-data-table>
       <v-card-actions>
        <v-btn class="blue"
            text @click="dialoglmovimiento=true">Add</v-btn>
       </v-card-actions>
     </v-card>
     <v-dialog v-model="dialoglmovimiento">
       <v-card>
         <v-form action class="form" v-model="valid" ref="Formvalidate" @submit="Addmovimiento">
        <v-card-text>
           <v-row>
          <v-select
            v-model="id_tipomovimiento"
            label="id Tipo movimiento"
            :items="list_Tipo_movimiento"
            :rules="Movimientosrules"
             type="number"
          >
          </v-select>
          </v-row>
           <v-row>
            <v-text-field
            v-model="observaciones"
            label="Observaciones"
            :rules="Observacionesrules"
            required
          ></v-text-field>
          </v-row>
          <v-row>
          <v-select
           v-model="id_producto_m"
          label="id Articulo"
          :items="list_articulos"
          :rules="Articulosrules"
           type="number"
          >
          
          </v-select>
          </v-row>
           <v-row>
           <v-select
            v-model="id_bodega_m"
            label="id Bodega"
            :items="list_Bodegas"
            :rules="Bodegasrules"
             type="number"
           >
            
          </v-select>
          </v-row>
          <v-row>
            <v-text-field
            v-model="cantidad"
            label="Cantidad"
            required
            :rules="cantidadrules"
             type="number"
          ></v-text-field>
          </v-row>
            <v-row>
          <v-select
             v-model="estado"
            label="Estado"
            type="number"
            :items="estados"
            :rules="estadorules"
          >   
          </v-select>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="Addmovimiento"
            :disabled="!validateform">
            Cerrar
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
     </v-dialog>
      <v-dialog v-model="dialogedittipo">
       <v-card>
        <v-card-text>
          <v-row>
           <v-select
            v-model="editItem.idTipomovimiento"
            label="id Tipo movimiento"
            :items="list_Tipo_movimiento"
            :rules="Movimientosrules"
             type="number"
          >
          </v-select>
          </v-row>
          <v-row>
            <v-text-field
            v-model="editItem.observaciones"
            label="Observaciones"
            required
          ></v-text-field>
          </v-row>
          <v-row>
           <v-select
           v-model="editItem.idArticulo"
          label="id Articulo"
          :items="list_articulos"
          :rules="Articulosrules"
           type="number"
          >
          </v-select>
          </v-row>
          <v-row>
            <v-select
            v-model="editItem.idBodega"
            label="id Bodega"
            :items="list_Bodegas"
            :rules="Bodegasrules"
             type="number"
           >
            
          </v-select>
          </v-row>
           <v-row>
            <v-text-field
            v-model="editItem.cantidad"
            label="Cantidad"
             type="number"
            required
          ></v-text-field>
          </v-row>
           <v-row>
           <v-select
             v-model="editItem.estado"
            label="Estado"
            type="number"
            :items="estados"
            :rules="estadorules"
          >   
          </v-select>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="Addmovimiento"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-dialog v-model="message2">
            <v-card>
               <v-card-title class="text-h5">
          <v-alert
      dense
      text
      type="success"
    >
     Registro actualizado correctamente
    </v-alert>
    </v-card-title>
    <v-card-actions>
       <v-btn color="blue darken-1" text @click="actualizar">OK</v-btn>
    </v-card-actions>
    </v-card>
   </v-dialog>
   <v-dialog v-model="message1">
            <v-card>
               <v-card-title class="text-h5">
          <v-alert
      dense
      text
      type="success"
    >
     Registro creado correctamente
    </v-alert>
    </v-card-title>
    <v-card-actions>
       <v-btn color="blue darken-1" text @click="crear">OK</v-btn>
    </v-card-actions>
    </v-card>
   </v-dialog>
   </v-row>
</template>

<script>
  import axios from 'axios'
 export default({
     data(){
         return{
             config:{
              headers: {
              Authorization: `Bearer ${(localStorage.getItem('token'))}` ,
               "Content-Type": "application/json"
              }
            },
             Articulosrules:[
              v => !!v || 'El id del Articulo es requerido',
            ],
            Bodegasrules:[
               v => !!v || 'El id de la Bodega es requerido',
            ],
            cantidadrules:[
              v => !!v || 'La cantidad es requerida',
            ],
             fecharules:[
               v => !!v || 'La fecha es requerida',
            ],
            estadorules:[
                v => !!v || 'El estado es requerido',
            ],
            Observacionesrules:[
                 v => !!v || 'Las observaciones son requeridas',
            ],
            Movimientosrules:[
                v => !!v || 'El id del tipo de movimiento es requerido',
            ],
          dialoglmovimiento:false,
          valid:false,
         message1:false,
          message2:false,
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
             estados:[
          {text:'Activo',value:1},
          {text:'Inactivo',value:2}
         ],
        estado: {text:'Activo',value:1},
           dialogedittipo:false,
           editedIndex: -1,
           editItem:{
           id:0,
           fechahora: '',
           idTipomovimiento:0,
           observaciones:'',
           idArticulo:0,
           idBodega:0,
           cantidad:0,
           estado:0
         },
         }
       },
        created () {
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
          Addmovimiento(){
            if(this.editedIndex<0){
            this.dialoglmovimiento=false
            const nueva={
              id:0,
              fechahora:null,
              idTipomovimiento:this.id_tipomovimiento,
              observaciones:this.observaciones,
              idArticulo:this.id_producto_m,
              idBodega:this.id_bodega_m,
              cantidad:this.cantidad,
              estado:this.estado
            }
             axios.post('/Movimiento/Crear',nueva,this.config)
         .then(response =>{
          console.log(response.data)
            this.message1=true;
          })
         .catch(e => {
            console.log(e);
         })
            this.fechahora='',
            this.id_tipomovimiento='',
            this.observaciones='',
            this.id_producto_m=0,
            this.id_bodega_m=0,
            this.cantidad=0,
            this.estado=0
            }else{
              this.dialogedittipo=false;
               Object.assign(this.movimiento[this.editedIndex],this.editItem);
                 axios.post('/Movimiento/Actualizar',this.editItem,this.config)
         .then(response =>{
          console.log(response.data)
           this.message2=true;
          })
         .catch(e => {
            console.log(e);
         })
            }
          },
           EditItem(item){
        this.dialogedittipo=true;
        this.editedIndex = this.movimiento.indexOf(item)
        this.editItem = Object.assign({}, item)
        console.log(this.editItem);
      },
       deleteItem (item) {
        this.editedIndex = this.movimiento.indexOf(item)
        this.editItem = Object.assign({}, item)
        console.log(item);
        this.dialogDeletetipo = true
      },
       actualizar(){
         this.message2=false;
           setTimeout(()=>{location.reload()},500)
      },
      crear(){
         this.message1=false;
           setTimeout(()=>{location.reload()},500)
      }
       },
      computed:{
      validateform(){
        return  this.valid == true?true:false;
      }
     }
 })
</script>