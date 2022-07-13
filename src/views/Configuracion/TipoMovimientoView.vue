<template>
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Tipo movimiento</v-card-title>
         <v-data-table
    :headers="headers_Tipo_movimiento"
    :items="tipomovimiento"
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
          <v-btn class="blue" @click="dialogtipomv=true">Add</v-btn>
     </v-card-actions>
     </v-card>
       <v-dialog v-model="dialogtipomv">
       <v-card>
        <v-form action class="form" v-model="valid" ref="Formvalidate" @submit="addTipoMovimiento">
        <v-card-text>
          <v-row>
            <v-text-field
            :rules="codigorules"
            v-model="codigo"
            label="Codigo"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
             :rules="descripcionrule"
            v-model="descripcion_move"
            label="Descripcion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
          <v-select
          v-model="factor"
          :rules="factorules"
          label="Factor"
          :items="lis_tipo"
          >

          </v-select>
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
            @click="addTipoMovimiento"
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
           <v-select
          v-model="editItem.factor"
          :rules="factorules"
          label="Factor"
          :items="lis_tipo"
          >

          </v-select>
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
            @click="addTipoMovimiento"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   <v-dialog v-model="dialogDeletetipo" max-width="500px">
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
        codigorules:[
          v => !!v || 'El codigo es requerido',
        ],
        descripcionrule:[
           v => !!v || 'La descripcion es requerida',
        ],
        factorules:[
          v => !!v || 'Ingrese un factor',
        ],
       fecharules:[
          v => !!v || 'La fecha es requerida',
        ],
          dialogtipomv:false,
        dialogedittipo:false,
        dialogDeletetipo:false,
         message1:false,
        message2:false,
        valid:false,
        lis_tipo:[-1,1],
         editedIndex: -1,
          estados:[
          {text:'Activo',value:1},
          {text:'Inactivo',value:2}
         ],
          estado: {text:'Activo',value:1},
         editItem:{
           id:0,
          codigo:0,
          descripcion: '',
          factor: 0,
          fechacreacion: '',
          fechamodificacion: '',
         },
        codigo:'',
        descripcion_move: '',
        factor: 1,
        fechacreacion_move: '',
        fechamodificacion_move: '',
        headers_Tipo_movimiento:[
          {text:'codigo', value: 'codigo'},
          { text: 'Descripcion', value: 'descripcion' },
          { text: 'Factor', value: 'factor' },
          { text: 'Fecha Creacion', value: 'fechacreacion' },
          { text: 'Fecha Modificacion', value: 'fechamodificacion' },
        ],
         tipomovimiento: [],   
      }
    },
     created () {
     axios.get('/TipoMovimiento/Get',this.config)
    .then(response => {
       this.tipomovimiento = response.data;
       this.$store.state.tipomovimiento=this.tipomovimiento
    })
    .catch(e => {
      console.log(e);
    }) 
    },
     methods:{
      //
      addTipoMovimiento(){
        if(this.editedIndex<=-1){
         this.dialogtipomv=false;
         const nueva= {id:0,
           codigo:this.codigo,
           descripcion:this.descripcion_move,
           factor:this.factor,
           fechacreacion:null,
           fechamodificacion:null,
           estado:this.estado
          }
           axios.post('/TipoMovimiento/Crear',nueva,this.config)
         .then(response =>{
          console.log(response.data)
            this.message1=true;
          })
         .catch(e => {
            console.log(e);
         })
        this.codigo='';
        this.descripcion_move= '';
        this.factor= 1;
        this.fechacreacion_move= '';
        this.fechamodificacion_move='';
        }else{
          Object.assign(this.tipomovimiento[this.editedIndex],this.editItem);
          axios.post('/TipoMovimiento/Actualizar',this.editItem,this.config)
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
        this.editedIndex = this.tipomovimiento.indexOf(item)
        this.editItem = Object.assign({}, item)
        console.log(this.editItem);
      },
       deleteItem (item) {
        this.editedIndex = this.tipomovimiento.indexOf(item)
        this.editItem = Object.assign({}, item)
        console.log(item);
        this.dialogDeletetipo = true
      },
      deleteItemConfirm(){
         this.tipomovimiento.splice(this.editedIndex,1);
         this.dialogDeletetipo = false;
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