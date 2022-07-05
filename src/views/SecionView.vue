<template>
 <v-app>
   <nav>
      <Nabvar>

      </Nabvar>
   </nav>
   <v-main>
     <h1>Bienvenido {{this.$store.state.username}}</h1>
    
     <router-view></router-view>
    </v-main>
 </v-app>
</template>

<script>
import Nabvar from "@/components/Nabvar.vue"

export default({
    components:{
      Nabvar
    },
    data() {
    return {
     
    }
  },
  methods: {
     
  },

  // Fetches posts when the component is created.
})
</script>
<style scoped>
 html{
   background-color: red;
 }
</style>
