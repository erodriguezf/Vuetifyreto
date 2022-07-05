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
    <v-alert
      dense
      outlined
      type="error"
    v-if="error">
     <strong>Usuario </strong> o <strong>Coñtraseña</strong> Incorrecta
    </v-alert>
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
      error:false,
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
  async  ver(){
       let  resp=await axios.post(`/Login`,
       {
           username:this.email,
           password:this.password
         })
    .then(response => {
      
      this.posts = response.data
      this.$store.state.user=this.posts.data.username;
      this.$store.dispatch('addEmailAction')
      localStorage.setItem('username', this.$store.state.user);
      console.log(this.posts);
      console.log("Token: "+this.posts.token);
      localStorage.setItem("token",this.posts.token);
      this.$router.push('/secion');
    })
    .catch(e => {
      this.errors.push(e);
      this.error=true;
    })  
         
         console.log('username : '+ this.$store.state.username);
         console.log(resp);
      }
    },
    computed:{
      validateform(){
        return  this.valid == true?true:false;
      }
    }
  }
</script>