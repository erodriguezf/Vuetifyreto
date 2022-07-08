<template>
  <div class="home">
   <h1>
     Seguridad
   </h1>
   
   
  <UsuriosViewVue>

  </UsuriosViewVue>
  
  <RolesViewVue>
    
  </RolesViewVue>
  </div>
</template>

<script>
import UsuriosViewVue from './Seguridad/UsuriosView.vue';
import RolesViewVue from './Seguridad/RolesView.vue';
  export default({
    components:{
     UsuriosViewVue,
     RolesViewVue
    }

  });
</script>
