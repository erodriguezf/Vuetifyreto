<template>
  <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Bodegas</v-card-title>
        <v-data-table
    :headers="header_Bodegas"
    :items="Bodegas"
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
           <v-btn class="blue" @click="dialogbodega=true">Add</v-btn>
        </v-card-actions>
     </v-card>
      <v-dialog v-model="dialogbodega">
       <v-card>
         <v-form action class="form" v-model="valid" ref="Formvalidate" @submit="Addbodega">
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="codigo_bodega"
            label="Codigo"
            :rules="codigorules"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="descripcion_bode"
            label="Descripcion"
           :rules="codigorules"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fotobode"
            label="Foto"
            :rules="fotorules"
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
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="Addbodega"
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
            @click="Addbodega"
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
        dialogbodega:false,
        valid:false,
        codigo_bodega:'',
        descripcion_bode: '',
        fotobode: '',
        fechacreacion_bode: '',
        fechamodificacion_bode: '',
        header_Bodegas:[
          {text:'codigo', value: 'codigo'},
          { text: 'Descripcion', value: 'descripcion' },
          { text: 'Foto', value: 'foto' },
          { text: 'Fecha Creacion', value: 'fechacreacion' },
          { text: 'Fecha Modificacion', value: 'fechamodificacion' },
        ],
        Bodegas: [],  
        dialogedittipo:false,
        message1:false,
        message2:false,
         editedIndex: -1,
         editItem:{
          id:0,
          codigo:0,
          descripcion: '',
          foto: '',
          fechacreacion: '',
          fechamodificacion: '',
         },
          estados:[
          {text:'Activo',value:1},
          {text:'Inactivo',value:2}
         ],
        estado: {text:'Activo',value:1},
      }
      
    },
    created () {
     axios.get('/Bodegas/Get',this.config)
    .then(response => {
       this.Bodegas = response.data;
    })
    .catch(e => {
      console.log(e);
    }) 
    },
     methods:{
       Addbodega(){
      if( this.editedIndex<0){
       this.dialogbodega=false;
       const nueva= {
         id:0,
         codigo:this.codigo_bodega,
         descripcion:this.descripcion_bode,
         foto:this.fotobode,
         fechacreacion:null,
         fechamodificacion:null,
         estado:this.estado
        }
        axios.post('/Bodegas/Crear',nueva,this.config)
         .then(response =>{
          console.log(response.data)
           this.message1=true;
          })
         .catch(e => {
            console.log(e);
         })
        this.codigo_bodega='',
        this.descripcion_bode= '',
        this.fotobode= '',
        this.fechacreacion_bode= '',
        this.fechamodificacion_bode= '';
      }else{
        Object.assign(this.Bodegas[this.editedIndex],this.editItem);
        axios.post('/Bodegas/Actualizar',this.editItem,this.config)
           .then(response =>{
             console.log(response)
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
        this.editedIndex = this.Bodegas.indexOf(item)
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