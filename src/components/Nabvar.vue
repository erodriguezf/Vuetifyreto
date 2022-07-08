<template>
   <nav  >
      <v-toolbar fluid
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
         <v-app-bar-nav-icon class="grey--text" @click="drawer= !drawer">

         </v-app-bar-nav-icon>
         <v-toolbar-title fluid>
             <span class="font-weight-light">
              
             </span>
             <span>Menu</span>
         </v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn icon @click="salir">
        <v-icon>mdi-export</v-icon>
      </v-btn>
      </v-toolbar>
      <v-navigation-drawer v-model="drawer" app class="red" temporary="true">
      <div v-if="this.$store.state.username === 'Admin'">
          <v-list v-for="item in links" :key="item.text" >
             <v-list-title >
               <router-link :to="item.route" class="red">
                <v-list-title-action >
                </v-list-title-action>
                <v-list-title-content>
                     
                    <v-list-title-title class="white--text">{{item.text}}</v-list-title-title>
                </v-list-title-content>
                </router-link>
             </v-list-title>
          </v-list>
      </div>
        <div v-else>
          <v-list v-for="item in links2" :key="item.text" >
             <v-list-title >
               <router-link :to="item.route" class="red">
                <v-list-title-action >
                </v-list-title-action>
                <v-list-title-content>
                     
                    <v-list-title-title class="white--text">{{item.text}}</v-list-title-title>
                </v-list-title-content>
                </router-link>
             </v-list-title>
          </v-list>
      </div>
      </v-navigation-drawer>
   </nav>
</template>

<script>
  export default({
    name: "NavbarVue",

    data() {
        return {
            drawer: false,
            
            links: [
                { text:'Configuracion',route: '/secion/Configuracion'},
                { text:'Seguridad',route: '/secion/Seguridad'},
                { text:'Inventario',route: '/secion/Inventario'},
                { text:'Dashboard',route: '/secion/Dashboard'}
            ],
             links2: [
                { text:'Configuracion',route: '/secion/Configuracion'},
                { text:'Inventario',route: '/secion/Inventario'},
                { text:'Dashboard',route: '/secion/Dashboard'}
            ]
        }
    },
    methods: {
      salir(){
         localStorage.removeItem('username');
         localStorage.removeItem('token');
         this.$router.push('/');
      }
    },

  });
</script>
<style scoped>
  html{
    background-color: gray;
  }
</style>