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
    <router-link to="secion">
      Inciar secion
    </router-link>
    </v-btn>
    </v-card-actions>
    </v-container>
  </v-form>
  </v-card>
</template>
<script>
  export default {
    data(){
      return {
      valid: false,
      disabled: true,
      email: '',
      emailRules: [
        v => !!v || 'El Username es requerido',
        v => /.+@.+/.test(v) || 'El Username debe ser en formato email',
      ],
      password: '',
      passworldRules:[
        v => !!v || 'La contraseña es requerida',
        v => v.length >=8 || 'La contraseña debe ser de 8 caracteres minimo',
      ]
      }
    },
    methods:{
      ver(){
        this.$store.state.user=this.email;
         this.$store.dispatch('addEmailAction')
         localStorage.setItem('username', this.$store.state.user);
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