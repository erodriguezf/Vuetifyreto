<template>
 <v-card class="elevation-12 mt-5" >
  <v-form action class="form" v-model="valid" ref="Formvalidate" @submit="ver">
    <v-container>
      <v-card-text>
      <v-row>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Username"
            required
          ></v-text-field>
      </v-row>
      <v-row>
          <v-text-field
            v-model="password"
            :rules="passworldRules"
            label="Password"
            required
            type="password"
          ></v-text-field>
      </v-row>
      </v-card-text>
      <v-card-actions>
    <v-btn class="purple lighten-1 "
     :disabled="!validateform"
     @click="ver"
    >
    
      Inciar secion
    </v-btn>
    </v-card-actions>
    </v-container>
  </v-form>
  </v-card>
</template>
<script>
import axios from 'axios';
  export default {
    data(){
      return {
      posts: [],
      errors: [],
      valid: false,
      disabled: true,
      email: '',
      emailRules: [
        v => !!v || 'El Username es requerido',
      ],
      password: '',
      passworldRules:[
        v => !!v || 'La contraseña es requerida',
      ]
      }
    },
    methods:{
      ver(){
        this.$store.state.user=this.email;
         this.$store.dispatch('addEmailAction')
         localStorage.setItem('username', this.$store.state.user);
         //https://localhost:7047/api/Login?usuario=Prueba4&password=12345
          axios.get(`https://localhost:7047/api/Bodegas/Get`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.posts = response.data
      console.log(this.posts);
    })
    .catch(e => {
      this.errors.push(e)
    })
         this.$router.push('/secion');
         console.log('username : '+ this.$store.state.username);
      }
    },
    computed:{
      validateform(){
        return  this.valid == true?true:false;
      }
    }
  }
</script>