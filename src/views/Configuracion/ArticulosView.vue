<template>
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Articulos</v-card-title>
          <v-data-table
    :headers="header_Articulos"
    :items="Articulos"
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
           <v-btn class="blue" @click="dialogarticulo=true">Add</v-btn>
        </v-card-actions>
     </v-card>
      <v-dialog v-model="dialogarticulo">
       <v-card>
        <v-form action class="form" v-model="valid" ref="Formvalidate" @submit="AddArticulo">
        <v-card-text>
          <v-row>
            <v-text-field
            :rules="codigorules"
            v-model="codigo_articulo"
            label="Codigo"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            :rules="codigorules"
            v-model="descripcion_art"
            label="Descripcion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
             :rules="fotorules"
            v-model="fotoart"
            label="Foto"
            required
          ></v-text-field>
          </v-row>
          <v-row>
      
          <v-select  
          type="number"
          :rules="categoriarules"
          v-model="id_categoria"
          label="id categorias"
          :items="list_ids"
          >
  
          </v-select>
          </v-row>
           <v-row>
            <v-text-field
             :rules="preciorules"
            v-model="preciocompra"
            label="Precio Compra"
            type="number"
            required
            
          ></v-text-field>
          </v-row>
           <v-row>
            <v-text-field
             :rules="preciorules"
            v-model="precioventa"
            label="Precio Venta"
            required
             type="number"
          ></v-text-field>
          </v-row>
            <v-row>
          <v-select
             v-model="estado"
            label="Estado"
            type="number"
            :items="estados"
            item-text="text"
            item-value="value"
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
            @click="AddArticulo"
            :disabled="!validateform"
          >
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
            <v-text-field
            v-model="editItem.codigo"
            label="Codigo"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="editItem.descripcion"
            label="Descripcion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="editItem.foto"
            label="Foto"
            required
          ></v-text-field>
          </v-row>
              <v-row>
           <v-select  
          type="number"
          :rules="categoriarules"
          v-model="editItem.idCategoria"
          label="id categorias"
          :items="list_ids"
          >
           </v-select>
          </v-row>
          <v-row>
            <v-text-field
            v-model="editItem.preciocompra"
            label="Precio compra"
             type="number"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="editItem.precioventa"
            label="Precio venta"
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
            item-text="text"
            item-value="value"
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
            @click="AddArticulo"
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
     data () {
      return {
        config:{
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('token'))}` ,
        "Content-Type": "application/json"
        }
       },
         codigorules:[
          v => !!v || 'El codigo es requerido',
        ],
        descripcionrule:[
           v => !!v || 'La descripcion es requerida',
        ],
        fotorules:[
          v => !!v || 'La foto es requerida',
        ],
       fecharules:[
          v => !!v || 'La fecha es requerida',
        ],
        categoriarules:[
           v => !!v || 'Ingrese un Id',
        ],
        precioules:[
           v => !!v || 'Ingrese un valor',
        ],
        dialogarticulo:false,
         valid:false,
        message1:false,
        message2:false,
        codigo_articulo:'',
        descripcion_art: '',
        fotoart: '',
        id_categoria:0,
        preciocompra:0,
        precioventa:0,
        fechacreacion_arti: '',
        fechamodificacion_arti: '',
        list_ids:[],
        header_Articulos:[
          {text:'codigo', value: 'codigo'},
          { text: 'Descripcion', value: 'descripcion' },
          { text: 'Foto', value: 'foto' },
          { text: 'id categoria', value: 'idCategoria'},
          { text: 'Precio compra', value: 'preciocompra'},
          { text: 'Precio venta', value: 'precioventa'},
          { text: 'Fecha Creacion', value: 'fechacreacion' },
          { text: 'Fecha Modificacion', value: 'fechamodificacion' },
       ],
       Articulos: [ ],
        editedIndex: -1,
         editItem:{
           id:0,
          codigo:'',
          descripcion:'',
          foto:'',
          idCategoria:0,
          preciocompra:0,
          precioventa:0,
          fechacreacion:'',
          fechamodificacion:''
         },
          dialogedittipo:false,
            estados:[
          {text:'Activo',value:1},
          {text:'Inactivo',value:2}
         ],
        estado: {text:'Activo',value:1},
      }
     },
     created () {
     axios.get('/Articulos/Get',this.config)
    .then(response => {
       this.Articulos = response.data;
    })
    .catch(e => {
      console.log(e);
    }) 
     axios.get('/Categorias/Get',this.config)
    .then(response => {
       this.list_ids = response.data.map(cate=>cate.id);
    })
    .catch(e => {
      console.log(e);
    }) 
  },
  methods:{
      AddArticulo(){
        if(this.editedIndex<0){
        this.dialogarticulo=false;
         const nueva= {
          id:0,
          codigo:this.codigo_articulo,
          descripcion:this.descripcion_art,
          foto:this.fotoart,
          idCategoria: parseInt(this.id_categoria),
          preciocompra:this.preciocompra,
          precioventa:this.precioventa,
          fechacreacion:null,
          fechamodificacion:null,
          estado:this.estado
        }
          axios.post('/Articulos/Crear',nueva,this.config)
         .then(response =>{
          console.log(response.data)
          //location.reload();
          this.message1=true;
          })
         .catch(e => {
            console.log(e);
         })
        this.codigo_articulo='',
        this.descripcion_art= '',
        this.fotoart= '',
        this.id_categoria=0,
        this.preciocompra=0,
        this.precioventa=0,
        this.fechacreacion_arti= '',
        this.fechamodificacion_arti= '';
        }else{
          Object.assign(this.Articulos[this.editedIndex],this.editItem);
           axios.post('/Articulos/Actualizar',this.editItem,this.config)
         .then(response =>{
          console.log(response.data)
        //  location.reload();
        this.message2=true;
          })
         .catch(e => {
            console.log(e);
         })
         this.dialogedittipo=false;
        }
      },
        EditItem(item){
        this.dialogedittipo=true;
        this.editedIndex = this.Articulos.indexOf(item)
        this.editItem = Object.assign({}, item)
        console.log(this.editItem);
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