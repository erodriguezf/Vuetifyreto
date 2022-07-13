<template>
 <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Categorias</v-card-title>
     <v-data-table
    :headers="headers_categorias"
    :items="categorias"
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
        @click="EditCategoria(item)"
      >
        mdi-pencil
      </v-icon>
        <v-icon
        small
        @click="DeleteCategoria(item)"
      >
        mdi-delete
      </v-icon>
      </td>
    </template>
    </v-data-table>
     <v-card-actions>
          <v-btn class="blue" @click="dialogcate = true">Add</v-btn>
     </v-card-actions>
     </v-card>
      <v-dialog v-model="dialogcate">
       <v-card>
         <v-form action class="form" v-model="valid" ref="Formvalidate" @submit="addCategoria">
        <v-card-text>
          <v-row>
            <v-text-field
            :rules="descripcionrule"
            v-model="descripcion_cat"
            label="Descripcion"
            required
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
          <v-row>
            <v-text-field
            :rules="fotorules"
            v-model="foto_cat"
            label="Foto"
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
            @click="addCategoria"
            :disabled="!validateform"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
       </v-dialog>
       <v-dialog v-model="dialogeditcate">
       <v-card>
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="editIcate.descripcion"
            label="Descripcion"
            required
          ></v-text-field>
          </v-row>
           <v-row>
           <v-select
             v-model="editIcate.estado"
            
            label="Estado"
            type="number"
            :items="estados"
            item-text="text"
            item-value="value"
          >   
          </v-select>
          </v-row>
          <v-row>
            <v-text-field
            v-model="editIcate.foto"
            label="Foto"
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
            @click="addCategoria"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
       </v-dialog>
        <v-dialog v-model="dialogDeletetcate" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Esta seguro de eliminar este elemento?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
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
        //data categorias
        descripcionrule:[
           v => !!v || 'La descripcion es requerida',
        ],
        fotorules:[
          v => !!v || 'La foto es requerida',
        ],
       fecharules:[
          v => !!v || 'La fecha es requerida',
        ],
        dialogeditcate:false,
        dialogDeletetcate:false,
        valid: false,
        message1:false,
        message2:false,
        editedcateIndex: -1,
         estados:[
          {text:'Activo',value:1},
          {text:'Inactivo',value:2}
         ],
        editIcate:{
          id:0,
          descripcion: '',
          foto: 0,
          fechacreacion: '',
          fechamodificacion: '',
         },
        dialogcate: false, 
        descripcion_cat:'',
        foto_cat:'',
        fechacreacion_cat: '',
        fechamodificacion_cat: '',
        headers_categorias:[
          { text: 'Descripcion', value: 'descripcion' },
          { text: 'Foto', value: 'foto' },
          { text: 'Fecha Creacion', value: 'fechacreacion' },
          { text: 'Fecha Modificacion', value: 'fechamodificacion' },
        ],
        categorias:[],
        estado: {text:'Activo',value:1},
      }
     },
     created () {
     axios.get('/Categorias/Get',this.config)
    .then(response => {
       this.categorias = response.data;
       this.$store.state.categorias=this.categorias;
    })
    .catch(e => {
      console.log(e);
    })
    },
    methods:{
        addCategoria(){
        if(this.editedcateIndex<0){
        this.dialogcate=false;
        const nueva={id:0, descripcion:this.descripcion_cat, estado:this.estado, foto:this.foto_cat,fechacreacion: null, fechamodificacion:null}
        axios.post('/Categorias/Crear',nueva,this.config)
         .then(response =>{
          console.log(response);
           this.message1=true;
          })
         .catch(e => {
            console.log(e);
         })
        this.descripcion_cat='' 
        this.foto_cat='' 
        this.fechacreacion_cat='' 
        this.fechamodificacion_cat=''
        }else{
           this.dialogeditcate=false;
           Object.assign(this.categorias[this.editedcateIndex],this.editIcate);
            axios.post('/Categorias/Actualizar',this.editIcate,this.config)
           .then(response =>{
             console.log(response)
             this.message2=true;
             //location.reload();
           })
           .catch(e => {
           console.log(e);
          })
        }
      },
      EditCategoria(item){
        console.log(item);
       this.dialogeditcate=true;
        this.editedcateIndex=this.categorias.indexOf(item);
        this.editIcate=Object.assign({}, item)
      },
      DeleteCategoria(item){
        this.dialogDeletetcate=true;
        this.editedcateIndex=this.categorias.indexOf(item);
        this.editIcate=Object.assign({}, item)
      },
      deleteItemConfirm(){
           console.log(typeof(this.editIcate.id));
           const idcate={
              id:this.editIcate.id
           }
           axios.delete('/Categorias/Eliminar',this.config,idcate.id)
           .then(response =>{
             console.log(response)
           })
           .catch(e => {
           console.log(e.response.data.mensaje);
          })
         this.dialogDeletetcate=false;
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