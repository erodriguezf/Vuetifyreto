<template>
  <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Listado de inventarios </v-card-title>
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
      <v-dialog v-model="dialoglistado">
       <v-card>
        <v-form action class="form" v-model="valid" ref="Formvalidate" @submit="AddListado">
        <v-card-text>
          <v-row>
          <v-select
           v-model="id_articulo"
            label="id Articulo"
            :items="list_articulos"
            :rules="Articulosrules"
          >
            
          </v-select>
          </v-row>
          <v-row>
           <v-select
            v-model="id_bodega"
            label="id Bodega"
            :items="list_Bodegas"
            :rules="Bodegasrules"
           >
          </v-select>
          </v-row>
          <v-row>
            <v-text-field
            v-model="saldo"
            label="Saldo"
            required
             type="number"
             :rules="saldorules"
          ></v-text-field>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="AddListado"
            :disabled="!validateform">
            
            Cerrar
          </v-btn>
        </v-card-actions>
        </v-form>
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
            saldorules:[
              v => !!v || 'El saldo  es requerido',
            ],
             fecharules:[
               v => !!v || 'La fecha es requerida',
            ],
             list_articulos:[],
            list_Bodegas:[],
            list_Tipo_movimiento:[],
            dialoglistado:false,
            valid:false,
             message1:false,
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
            this.dialoglistado=false
           const nueva= {
                idArticulo:parseInt(this.id_articulo), 
                idBodega:parseInt(this.id_bodega),
                saldo:this.saldo,
                fechaultimomovimiento:null
             }
             axios.post('/Inventario/Crear',nueva,this.config)
         .then(response =>{
          console.log(response.data)
           this.message1=true
          })
         .catch(e => {
            console.log(e);
         })
            this.id_articulo=0,
            this.id_bodega=0,
            this.saldo=0,
            this.fechaultimomovimiento=''
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