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
      posts: [],
      errors: []
    }
  },
  methods: {
     async login({ commit }, user) {
      try {
        const res = await fetch('https://localhost:7047/api/Login?usuario=Prueba4&password=12345', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
        const userDB = await res.json()
        commit('setToken', userDB.data.token)
        localStorage.setItem('token', userDB.data.token)
      } catch (error) {
        console.log('Error: ', error)
      }
    }
  },

  // Fetches posts when the component is created.
})
</script>
<style scoped>
 html{
   background-color: red;
 }
</style>
