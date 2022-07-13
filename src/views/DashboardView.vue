<template>
   <div class="home">
   <h1>
     Inventario
   </h1>
    <InvemtarioGraficsView>

  </InvemtarioGraficsView>
   <h1>Movimientos</h1>
   <MovimientosGraficsView>

   </MovimientosGraficsView>
   <h1>Articulos Movidos</h1>
   <ArticulosMovidosView>
    
   </ArticulosMovidosView>
   <h1>Articulos por Categoria</h1>
   <ArticulosPorCategoriasView>

   </ArticulosPorCategoriasView>
 </div>
</template>
<script>
   import InvemtarioGraficsView from './Grafics/InventarioGraficsView.vue'
   import MovimientosGraficsView from './Grafics/MovimientosGraficsView.vue'
   import ArticulosMovidosView from './Grafics/ArticulosMovidosView.vue'
   import ArticulosPorCategoriasView from './Grafics/ArticulosporCategoriasView.vue'
   
  export default({
     data(){
         return{
         }
     },
      components:{
       InvemtarioGraficsView,
       MovimientosGraficsView,
       ArticulosMovidosView,
       ArticulosPorCategoriasView
      }
  })
</script>



