<template>
 <div class="home ">
   <h1>
     Configuracion
   </h1>
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Categorias</v-card-title>
       <v-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iste ducimus error explicabo neque provident1.</v-card-subtitle>
     <v-data-table
    :headers="headers_categorias"
    :items="this.$store.state.categorias"
    :items-per-page="5"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
     show-expand
    class="elevation-1"
   
    >
     <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-btn @click="EditCategoria(item)">
          Editar 
        </v-btn>
         <v-btn @click="DeleteCategoria(item)">
          Eliminar 
        </v-btn>
      </td>
    </template>
    </v-data-table>
     <v-card-actions>
          <v-btn class="blue" @click="dialogcate = true">Add</v-btn>
     </v-card-actions>
     </v-card>
   </v-row>
    
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Tipo movimiento</v-card-title>
       <v-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iste ducimus error explicabo neque provident.</v-card-subtitle>
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
        <v-btn @click="EditItem(item)">
          Editar 
        </v-btn>
         <v-btn @click="deleteItem(item)">
          Eliminar
        </v-btn>
      </td>
    </template>
    </v-data-table>
     <v-card-actions>
          <v-btn class="blue" @click="dialogtipomv=true">Add</v-btn>
     </v-card-actions>
     </v-card>
   </v-row>
    
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Bodegas</v-card-title>
       <v-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iste ducimus error explicabo neque provident.</v-card-subtitle>
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
        <v-btn >
          Editar {{item.descripcion}}
        </v-btn>
         <v-btn>
          Eliminar {{item.descripcion}}
        </v-btn>
      </td>
    </template>
    </v-data-table>
        <v-card-actions>
           <v-btn class="blue" @click="dialogbodega=true">Add</v-btn>
        </v-card-actions>
     </v-card>
   </v-row>
   
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Articulos</v-card-title>
       <v-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iste ducimus error explicabo neque provident.</v-card-subtitle>
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
        <v-btn >
          Editar {{item.descripcion}}
        </v-btn>
         <v-btn>
          Eliminar {{item.descripcion}}
        </v-btn>
      </td>
    </template>
    </v-data-table>
      <v-card-actions>
           <v-btn class="blue" @click="dialogarticulo=true">Add</v-btn>
        </v-card-actions>
     </v-card>
   </v-row>
   <!--Categorias-->
   <v-dialog v-model="dialogcate">
       <v-card>
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="descripcion_cat"
            label="Descripcion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="foto_cat"
            label="Foto"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fechacreacion_cat"
            label="Fecha_Creacion"
            required
          >
          </v-text-field>
         
          </v-row>
          <v-row>
            <v-text-field
            v-model="fechamodificacion_cat"
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
            @click="addCategoria"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
   <!--Categorias-->
   <!--Tipo de movimiento-->
    <v-dialog v-model="dialogtipomv">
       <v-card>
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="codigo"
            label="Codigo"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="descripcion_move"
            label="Descripcion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="factor"
            label="Factor"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fechacreacion_move"
            label="Fecha_Creacion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fechamodificacion_move"
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
            @click="addTipoMovimiento"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
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
            v-model="editItem.factor"
            label="Factor"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="editItem.fechacreacion"
            label="Fecha_Creacion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="editItem.fechamodificacion"
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
     <!--Tipo de movimiento-->
     <!--Bodega-->
   <v-dialog v-model="dialogbodega">
       <v-card>
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="codigo_bodega"
            label="Codigo"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="descripcion_bode"
            label="Descripcion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fotobode"
            label="Foto"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fechacreacion_bode"
            label="Fecha_Creacion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fechamodificacion_bode"
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
            @click="Addbodega"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
   <!--Bodega-->
   <!--Articulo-->
    <v-dialog v-model="dialogarticulo">
       <v-card>
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="codigo_articulo"
            label="Codigo"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="descripcion_art"
            label="Descripcion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fotoart"
            label="Foto"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="id_categoria"
            label="id categorias"
            required
          ></v-text-field>
          </v-row>
           <v-row>
            <v-text-field
            v-model="preciocompra"
            label="Precio Compra"
            required
          ></v-text-field>
          </v-row>
           <v-row>
            <v-text-field
            v-model="precioventa"
            label="Precio Venta"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fechacreacion_arti"
            label="Fecha_Creacion"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="fechamodificacion_arti"
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
            @click="AddArticulo"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
    <!--Articulo-->
  </div>
  
</template>

<script>
// Components
export default ({
  name: 'HomeView',
  data () {
      return {
        //data categorias
        dialogeditcate:false,
        dialogDeletetcate:false,
        editedcateIndex: -1,
        editIcate:{
          id:0,
          descripcion: '',
          factor: 0,
          fechacreacion: '',
          fechamodificacion: '',
         },
        dialogcate: false, 
        descripcion_cat: this.$store.state.categoria.descripcion,
        foto_cat: this.$store.state.categoria.foto,
        fechacreacion_cat: this.$store.state.categoria.fechacreacion,
        fechamodificacion_cat: this.$store.state.categoria.fechamodificacion,
        headers_categorias:[
          { text: 'Descripcion', value: 'descripcion' },
          { text: 'Foto', value: 'foto' },
          { text: 'Fecha Creacion', value: 'fechacreacion' },
          { text: 'Fecha Modificacion', value: 'fechamodificacion' },
        ],
        categorias:[],
        //data tipomovimiento
        dialogtipomv:false,
        dialogedittipo:false,
        dialogDeletetipo:false,
         editedIndex: -1,
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
         tipomovimiento: [
      { 
        id:1,
        codigo:101,
        descripcion: 'Frozen Yogurt',
        factor: 1,
        fechacreacion: '13-06-2010',
        fechamodificacion: '13-06-2011',
      },
      { id:2,
        codigo:202,
        descripcion: 'Ice cream sandwich',
        factor: -1,
         fechacreacion: '13-06-2011',
         fechamodificacion: '13-06-2012',
      },
    ],   
        //Bodega
        dialogbodega:false,
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
        Bodegas: [
      { 
        id:1,
        codigo:101,
        descripcion: 'Frozen Yogurt',
        foto: 'https://i.ytimg.com/vi/yZ56s9OjcWA/maxresdefault.jpg',
        fechacreacion: '13-06-2010',
        fechamodificacion: '13-06-2011',
      },
      { id:2,
        codigo:202,
        descripcion: 'Ice cream sandwich',
        foto: 'https://i.ytimg.com/vi/yZ56s9OjcWA/maxresdefault.jpg',
         fechacreacion: '13-06-2011',
         fechamodificacion: '13-06-2012',
      },
    ],  
        //Articulo
       dialogarticulo:false,
        codigo_articulo:'',
        descripcion_art: '',
        fotoart: '',
        id_categoria:0,
        preciocompra:0,
        precioventa:0,
        fechacreacion_arti: '',
        fechamodificacion_arti: '',
        header_Articulos:[
          {text:'codigo', value: 'codigo'},
          { text: 'Descripcion', value: 'descripcion' },
          { text: 'Foto', value: 'foto' },
          { text: 'id categoria', value: 'id_categoria'},
          { text: 'Precio compra', value: 'preciocompra'},
          { text: 'Precio venta', value: 'precioventa'},
          { text: 'Fecha Creacion', value: 'fechacreacion' },
          { text: 'Fecha Modificacion', value: 'fechamodificacion' },
       ],
       Articulos: [
      { 
        id:1,
        codigo:101,
        descripcion: 'Frozen Yogurt',
        foto: 'https://i.ytimg.com/vi/yZ56s9OjcWA/maxresdefault.jpg',
        id_categoria:3,
        preciocompra:1230,
        precioventa:1456,
        fechacreacion: '13-06-2010',
        fechamodificacion: '13-06-2011',
      },
      { id:2,
        codigo:202,
        descripcion: 'Ice cream sandwich',
        foto: 'https://i.ytimg.com/vi/yZ56s9OjcWA/maxresdefault.jpg',
        id_categoria:4,
        preciocompra:1456,
        precioventa:2456,
        fechacreacion: '13-06-2011',
        fechamodificacion: '13-06-2012',
      },
    ]
      }
  },
  methods:{
      addCategoria(){
         this.dialogcate=false;
        this.$store.state.categoria={id:this.categorias.length, descripcion:this.descripcion_cat, foto:this.foto_cat,fechacreacion: this.fechacreacion_cat, fechamodificacion:this.fechamodificacion_cat}
        this.$store.dispatch('addCategoriaAction');
        this.descripcion_cat='' 
        this.foto_cat='' 
        this.fechacreacion_cat='' 
        this.fechamodificacion_cat=''
      },
      EditCategoria(item){
       this.dialogeditcate=true;
        console.log(item);
        this.editedcateIndex=this.$store.state.categorias.indexOf(item);
       // editIcate

      },
      DeleteCategoria(item){
        this.dialogDeletetcate=true;
        console.log(item);
      },
      //
      addTipoMovimiento(){
        if(this.editedIndex<=-1){
         this.dialogtipomv=false;
         this.tipomovimiento.push(
          {id:this.tipomovimiento.length,
           codigo:this.codigo,
           descripcion:this.descripcion_move,
           factor:this.factor,
           fechacreacion:this.fechacreacion_move,
           fechamodificacion:this.fechamodificacion_move
          }
         ),
        this.codigo='';
        this.descripcion_move= '';
        this.factor= 1;
        this.fechacreacion_move= '';
        this.fechamodificacion_move='';
        }else{
          Object.assign(this.tipomovimiento[this.editedIndex],this.editItem);
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
      //
      Addbodega(){
       this.dialogbodega=false;
       this.Bodegas.push({
         id:this.Bodegas.length,
         codigo:this.codigo_bodega,
         descripcion:this.descripcion_bode,
         foto:this.fotobode,
         fechacreacion:this.fechacreacion_bode,
         fechamodificacion:this.fechamodificacion_bode
       }),
        this.codigo_bodega='',
        this.descripcion_bode= '',
        this.fotobode= '',
        this.fechacreacion_bode= '',
        this.fechamodificacion_bode= '';
      },
      //
      AddArticulo(){
        this.dialogarticulo=false;
        this.Articulos.push({
          id:this.Articulos.length,
          codigo:this.codigo_articulo,
          descripcion:this.descripcion_art,
          foto:this.fotoart,
          id_categoria:this.id_categoria,
          preciocompra:this.preciocompra,
          precioventa:this.precioventa,
          fechacreacion:this.fechacreacion_arti,
          fechamodificacion:this.fechamodificacion_arti
        }),
        this.codigo_articulo='',
        this.descripcion_art= '',
        this.fotoart= '',
        this.id_categoria=0,
        this.preciocompra=0,
        this.precioventa=0,
        this.fechacreacion_arti= '',
        this.fechamodificacion_arti= '';
      },

  },
  components: {
   
  },
});
</script>

