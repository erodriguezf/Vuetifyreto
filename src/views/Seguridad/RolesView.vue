<template>
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Roles</v-card-title>
      <v-data-table
        :headers="headers_roles"
        :items="roles"
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
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn class="blue"
            text @click="dialogroles=true">Add</v-btn>
    </v-card-actions>
     </v-card>
        <v-dialog v-model="dialogroles">
       <v-card>
        <v-form action class="form" v-model="valid" ref="Formvalidate" @submit="AddRoles">
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="nombre"
            label="Nombre"
            required
            :rules="usernamerules"
          ></v-text-field>
          </v-row>
           <v-row>
          <v-select
             v-model="estado"
            label="Estado"
            type="number"
            :items="estados"
            :rules="estadorules"
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
            @click="AddRoles"
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
            <v-text-field
            v-model="editItem.nombre"
            label="Nombre"
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
            @click="AddRoles"
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
     data() {
      return {
       config:{
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('token'))}` ,
        "Content-Type": "application/json"
        }
       },
      usernamerules:[
           v => !!v || 'El username es requerido',
      ],
      estadorules:[
         v => !!v || 'El estado requerido',
      ],
     dialogroles:false,
     nombre:'',
     headers_roles:[
          { text: 'Nombre', value: 'nombre' }
      ],
     roles: [
      ],
           estados:[
          {text:'Activo',value:1},
          {text:'Inactivo',value:2}
         ],
         estado: {text:'Activo',value:1},
        dialogedittipo:false,
        valid:false,
        message1:false,
        message2:false,
       editedIndex: -1,
         editItem:{
          id:0,
          nombre: '',
          estado: 1,
         },
      }
    },
    created () {
    axios.get('/Roles/Get',this.config)
    .then(response => {
       this.roles = response.data;
    })
    .catch(e => {
      console.log(e);
    })
    },

    methods: {
      AddRoles(){
         if(this.editedIndex <0){
         this.dialogroles=false
          const nueva={
            id:0,
            nombre:this.nombre,
            estado:this.estado
          }
          axios.post('/Roles/Crear',nueva,this.config)
         .then(response =>{
          console.log(response.data)
        //  location.reload();
           this.message1=true;
          })
         .catch(e => {
            console.log(e);
         })
         this.nombre='';
         this.estado=0;
         }else{
            Object.assign(this.roles[this.editedIndex],this.editItem);
             axios.post('/Roles/Actualizar',this.editItem,this.config)
         .then(response =>{
          console.log(response.data)
          //location.reload();
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
        this.editedIndex = this.roles.indexOf(item)
        this.editItem = Object.assign({}, item)
        console.log(this.editItem);
      },
       deleteItem (item) {
        this.editedIndex = this.roles.indexOf(item)
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