<template>
  <div class="home">
   <h1>
     Seguridad
   </h1>
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Usuarios</v-card-title>
       <v-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iste ducimus error explicabo neque provident.</v-card-subtitle>
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
        <v-btn >
          Editar {{item.username}}
        </v-btn>
         <v-btn>
          Eliminar {{item.username}}
        </v-btn>
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
   </v-row>
   
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Roles</v-card-title>
       <v-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iste ducimus error explicabo neque provident.</v-card-subtitle>
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
        <v-btn >
          Editar {{item.nombre}}
        </v-btn>
         <v-btn>
          Eliminar {{item.nombre}}
        </v-btn>
      </td>
    </template>
    </v-data-table>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn class="blue"
            text @click="dialogroles=true">Add</v-btn>
    </v-card-actions>
     </v-card>
   </v-row>
    <v-dialog v-model="dialogusuario">
       <v-card>
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="username"
            label="Username"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="ultimologin"
            label="Ultimo Loging"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="estado"
            label="Estado"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fechacreacion"
            label="Fecha_Creacion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fechamodificacion"
            label="Fecha_modificacion"
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
            @click="Addusuarios">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
    <v-dialog v-model="dialogroles">
       <v-card>
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="nombre"
            label="Nombre"
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
            @click="AddRoles">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
  </div>
</template>

<script>
  export default({
    data() {
      return {
      dialogusuario:false,
      username:'',
      ultimologin:'',
      estado:'',
      fechacreacion:'',
      fechamodificacion:'',

      headers_usuarios:[
          { text: 'Username', value: 'username' },
          { text: 'Ultimo Login', value: 'ultimologin' },
          { text: 'Estado', value: 'estado'},
          { text: 'Fecha Creacion', value: 'fechacreacion' },
          { text: 'Fecha Modificacion', value: 'fechamodificacion' },
      ],
      usuarios: [
      { 
        username:1,
        ultimologin: '12-03-2011',
        estado: 'activo',
        fechacreacion: '13-06-2010',
        fechamodificacion: '13-06-2011',
      },
      { username:2,
        ultimologin: '12-03-2012',
        estado: 'activo',
         fechacreacion: '13-06-2011',
         fechamodificacion: '13-06-2012',
      },
    ],
     dialogroles:false,
     nombre:'',
     headers_roles:[
          { text: 'Nombre', value: 'nombre' }
      ],
     roles: [
      { 
        id:1,
        nombre: 'nombre',
        
      },
      { id:2,
        nombre: 'nombre12',
      },
    ],
      }
    },
    methods: {
      Addusuarios(){
        this.dialogusuario=false
        this.usuarios.push({
          username:this.username,
          ultimologin:this.ultimologin,
          estado:this.estado,
          fechacreacion:this.fechacreacion,
          fechamodificacion:this.fechamodificacion,
        }),
          this.username='',
          this.ultimologin='',
          this.estado='',
          this.fechacreacion='',
          this.fechamodificacion=''; 
      },
      AddRoles(){
         this.dialogroles=false,
         this.roles.push(
          {
            id:this.roles.length,
            nombre:this.nombre
          }
         )
         this.nombre='';
      }
    },

  });
</script>
