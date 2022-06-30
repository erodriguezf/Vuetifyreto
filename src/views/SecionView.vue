<template>
 <v-app>
   <nav>
      <Nabvar>

      </Nabvar>
   </nav>
   <v-main>
     <h1>{{$store.state.user}}</h1>
     <router-view></router-view>
    </v-main>
 </v-app>
</template>

<script>
import Nabvar from "@/components/Nabvar.vue"
export default({
    components:{
      Nabvar
    }
})
</script>
<style scoped>
 html{
   background-color: red;
 }
</style>
