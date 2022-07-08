<template>
  <div class="home">
   <h1>
     Inventario
   </h1>
   <ListadoInventarioViewVue>

   </ListadoInventarioViewVue>
   <MovimientosViewVue>
    
   </MovimientosViewVue>
  </div>
</template>
<script>
   import ListadoInventarioViewVue from './Inventario/ListadoInventarioView.vue'
   import MovimientosViewVue from './Inventario/MovimientosView.vue'
   export default{
       components:{
          ListadoInventarioViewVue,
          MovimientosViewVue
       }
   }
</script>
   }

