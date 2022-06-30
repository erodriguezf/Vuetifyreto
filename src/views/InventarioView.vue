<template>
  <div class="home">
   <h1>
     Inventario
   </h1>
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1">
       <v-card-title>Listado de inventarios </v-card-title>
       <v-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iste ducimus error explicabo neque provident.</v-card-subtitle>
        <v-data-table
        :headers="headers_listado_inventario"
        :items="Listado_inventario"
        :items-per-page="5"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
     show-expand
         class="elevation-1"
    >
     <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-btn >
          Editar {{item.id_bodega}}
        </v-btn>
         <v-btn>
          Eliminar {{item.id_bodega}}
        </v-btn>
      </td>
    </template>
    </v-data-table>
      <v-card-actions>
        <v-btn class="blue"
            text @click="dialoglistado=true">Add</v-btn>
       </v-card-actions>
     </v-card>
   </v-row>
   
   <v-row>
     <v-card class="mb-5 mt-5 ml-3 grey lighten-1 elevation-3">
       <v-card-title>Movimientos</v-card-title>
       <v-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iste ducimus error explicabo neque provident.</v-card-subtitle>
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
        <v-btn >
        
          Editar {{item.id_tipomovimiento}}
        </v-btn>
         <v-btn>
          Eliminar {{item.id_tipomovimiento}}
        </v-btn>
      </td>
    </template>
        </v-data-table>
       <v-card-actions>
        <v-btn class="blue"
            text @click="dialoglmovimiento=true">Add</v-btn>
       </v-card-actions>
     </v-card>
   </v-row>
    <v-dialog v-model="dialoglistado">
       <v-card>
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="id_articulo"
            label="id Articulo"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="id_bodega"
            label="id Bodega"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="saldo"
            label="Saldo"
            required
          ></v-text-field>
          </v-row>
           <v-row>
            <v-text-field
            v-model="fechaultimomovimiento"
            label="Fecha Ultimo movimiento"
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
            @click="AddListado">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
    <v-dialog v-model="dialoglmovimiento">
       <v-card>
        <v-card-text>
          <v-row>
            <v-text-field
            v-model="fechahora"
            label="Fecha Hora"
            required
          ></v-text-field>
          </v-row>
           <v-row>
            <v-text-field
            v-model="id_tipomovimiento"
            label="id Tipo movimiento"
            required
          ></v-text-field>
          </v-row>
           <v-row>
            <v-text-field
            v-model="observaciones"
            label="Observaciones"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="id_producto_m"
            label="id Producto"
            required
          ></v-text-field>
          </v-row>
           <v-row>
            <v-text-field
            v-model="id_bodega_m"
            label="id Bodega"
            required
          ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            v-model="cantidad"
            label="Cantidad"
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
            @click="Addmovimiento">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
  </div>
</template>
<script>
   export default{
       data(){
         return{
            dialoglistado:false,
            id_articulo:0,
            id_bodega:0,
            saldo:0,
            fechaultimomovimiento:'',
            headers_listado_inventario:[
           {text: 'id Articulo', value:'id_articulo'},
           {text: 'id Bodega', value:'id_bodega'},
           {text: 'Saldo', value:'saldo'},
           {text: 'Fecha ultimo movimiento', value:'fechaultimomovimiento'},
      ],
           Listado_inventario: [
      { 
        id_articulo:1,
         id_bodega:3,
        saldo: 120890,
        fechaultimomovimiento: '13-06-2011',
      },
      { id_articulo:2,
         id_bodega:4,
         saldo: 120992,
         fechaultimomovimiento: '13-06-2012',
      },
      ], dialoglmovimiento:false,
         fechahora:'',
         id_tipomovimiento:'',
         observaciones:'',
         id_producto_m:0,
         id_bodega_m:0,
         cantidad:0,
         headers_movimiento:[
           {text: 'Fecha Hora', value:'fechahora'},
           {text: 'id tipo movimiento', value:'id_tipomovimiento'},
           {text: 'Observaciones', value:'observaciones'},
           {text: 'id producto', value:'id_producto'},
           {text: 'id bodega', value:'id_bodega'},
           {text: 'Cantidad', value: 'cantidad'}
         ],
        movimiento: [
      { 
        id:1,
        fechahora: new Date(),
        id_tipomovimiento: 4,
        observaciones: 'primera observacion',
        id_producto: 6,
        id_bodega: 8,
        cantidad:40
      },
      { id:2,
        fechahora:new Date(),
        id_tipomovimiento: 5,
        observaciones: 'segunda observacion',
         id_producto: 9,
         id_bodega: 12,
         cantidad:50
      },
    ],
         }
       },
       methods:{
          AddListado(){
            this.dialoglistado=false,
             this.Listado_inventario.push({
                id_articulo:this.id_articulo,
                id_bodega:this.id_bodega,
                saldo:this.saldo,
                fechaultimomovimiento:this.fechaultimomovimiento
             }),
            this.id_articulo=0,
            this.id_bodega=0,
            this.saldo=0,
            this.fechaultimomovimiento=''
          },
          Addmovimiento(){
            this.dialoglmovimiento=false
            this.movimiento.push({
              id:this.movimiento.length,
              fechahora:this.fechahora,
              id_tipomovimiento:this.id_tipomovimiento,
              observaciones:this.observaciones,
              id_producto:this.id_producto,
              id_bodega:this.id_bodega,
              cantidad:this.cantidad
            }),
            this.fechahora='',
            this.id_tipomovimiento='',
            this.observaciones='',
            this.id_producto_m=0,
            this.id_bodega_m=0,
            this.cantidad=0
          }
       }
   }
</script>
   }

