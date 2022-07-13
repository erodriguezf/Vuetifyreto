<template>
    <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Usuarios</v-card-title>
        <v-data-table
        :headers="headers_usuarios"
        :items="usuarios"
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
            @click="dialogusuario=true"
            text>Add</v-btn>
    </v-card-actions>
     </v-card>
       <v-dialog v-model="dialogusuario">
       <v-card>
        <v-form action class="form" v-model="valid" ref="Formvalidate" @submit="Addusuarios">
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="username"
            label="Username"
            :rules="usernamerules"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="password"
            label="password"
            :rules="passwordrules"
            type="password"
            required
          ></v-text-field>
          </v-row>
          <v-row>
          <v-select
             v-model="estado"
             :rules="estadorules"
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
            @click="Addusuarios"
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
            v-model="editItem.username"
            label="Username"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="editItem.password"
            label="password"
            :rules="passwordrules"
            type="password"
            required
          ></v-text-field>
          </v-row>
          <v-row>
           <v-select
             v-model="editItem.estado"
             :rules="estadorules"
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
            @click="Addusuarios"
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
         estados:[
          {text:'Activo',value:1},
          {text:'Inactivo',value:2}
         ],
       config:{
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('token'))}` ,
        "Content-Type": "application/json"
        }
       },
      usernamerules:[
           v => !!v || 'El username es requerido',
      ],
      ultimorules:[
          v => !!v || 'El ultimo login es requerido',
      ],
      estadorules:[
         v => !!v || 'El estado requerido',
      ],
      fecharules:[
          v => !!v || 'La fecha es requerida',
      ],
      passwordrules:[
            v => !!v || 'La contraseña es requerida',
      ],
      dialogusuario:false,
      valid:false,
       message1:false,
        message2:false,
      username:'',
      ultimologin:'',
      fechacreacion:'',
      fechamodificacion:'',
      password:'',
      headers_usuarios:[
          { text: 'Username', value: 'username' },
          { text: 'Ultimo Login', value: 'ultimologin' },
          { text: 'Estado', value: 'estado'},
          { text: 'Fecha Creacion', value: 'fechacreacion' },
          { text: 'Fecha Modificacion', value: 'fechamodificacion' },
      ],
      usuarios: [],
      usariosmodificados:[],
      dialogedittipo:false,
       editedIndex: -1,
         editItem:{
          username:'',
          password:'',
          nombre: '',
          ultimologin: '',
          estado: {text:'Activo',value:1},
          fechacreacion: '',
          fechamodificacion: '',
         },
      }
    },
     created () {
    axios.get('/Usuarios/Get',this.config)
    .then(response => {
       this.usuarios = response.data;
    })
    .catch(e => {
      console.log(e);
    })
   },
   methods: {
      Addusuarios(){
        if(this.editedIndex<0){
        this.dialogusuario=false
         const nueva= {
          username:this.username,
          password:this.password,
          nombre:this.username,
          ultimologin:null,
          estado:this.estado,
          fechacreacion:null,
          fechamodificacion:null,
        }
         axios.post('/Usuarios/Crear',nueva,this.config)
         .then(response =>{
          console.log(response.data)
         // location.reload();
         this.message1=true;
          })
         .catch(e => {
            console.log(e);
         })
          this.username='',
          this.ultimologin='',
          this.estado='',
          this.fechacreacion='',
          this.fechamodificacion=''; 
          this.password='';
         }else{
           Object.assign(this.usuarios[this.editedIndex],this.editItem);
            axios.post('/Usuarios/Actualizar',this.editItem,this.config)
         .then(response =>{
          console.log(response.data)
          this.message2=true;

          })
         .catch(e => {
            console.log(e);
         })
          this.dialogedittipo = false
         }
      },
        EditItem(item){
        this.dialogedittipo=true;
        this.editedIndex = this.usuarios.indexOf(item)
        this.editItem = Object.assign({}, item)
        console.log(this.editItem);
      },
       deleteItem (item) {
        this.editedIndex = this.usuarios.indexOf(item)
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