<template>
 <div class="home ">
   <h1>
     Configuracion
   </h1>
   <CategoriasVue>

   </CategoriasVue>
  
   <TipoMovimientoViewVue>

  </TipoMovimientoViewVue>

   <BodegasViewVue>

  </BodegasViewVue>
  
   <ArticulosViewVue>

   </ArticulosViewVue>
  </div>
  
</template>

<script>
import BodegasViewVue from './Configuracion/BodegasView.vue';
import CategoriasVue from './Configuracion/CategoriasView.vue';
import TipoMovimientoViewVue from './Configuracion/TipoMovimientoView.vue';
import ArticulosViewVue from './Configuracion/ArticulosView.vue';
export default ({
  name: 'HomeView',
  components: {
    BodegasViewVue,
    CategoriasVue,
    TipoMovimientoViewVue,
    ArticulosViewVue
  },
});
</script>

