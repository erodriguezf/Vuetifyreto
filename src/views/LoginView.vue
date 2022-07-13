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
    v-if="error1">
     <strong>Usuario </strong> o <strong>Coñtraseña</strong> Incorrecta
    </v-alert>
    <v-alert
      dense
      outlined
      type="error"
    v-if="error2">
     <strong>El Usuario se encuentra inanactivo </strong> 
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
      error1:false,
      error2:false,
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
      this.$store.state.token1=this.posts.token;
      this.$store.dispatch('addEmailAction')
      localStorage.setItem('username', this.$store.state.user);
      console.log(this.posts);
      console.log("Token: "+this.posts.token);
      localStorage.setItem("token",this.$store.state.token1);
      this.$router.push('/secion');
    })
    .catch(e => {
      this.errors.push(e);
      console.log(e.response.data.codigomensaje);
       if(e.response.data.codigomensaje == 1000){
          this.error1=true
          this.error2=false
      }
      if(e.response.data.codigomensaje == 1001){
          this.error2=true
            this.error1=false
      }
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