import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
//${JSON.stringify(localStorage.getItem('token')
//${(localStorage.getItem('token'))}
export default new Vuex.Store({
  state: {
    username: localStorage.getItem('username'),
    config:{
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('token'))}` ,
        "Content-Type": "application/json"
      }
    },
    posts: [],
    errors: [],
    user:'',
    categorias: [
     
    ],
    categorias_token:[],
    categoria:{
      id:0,
      descripcion: '',
      foto: '',
      fechacreacion: '',
      fechamodificacion: '',
    },
    tipomovimiento: [
      { 
        id:1,
        codigo:101,
        descripcion: 'Frozen Yogurt',
        foto: 'https://i.ytimg.com/vi/yZ56s9OjcWA/maxresdefault.jpg',
        fechacreacion: '13-06-2010',
        fechamodificacion: '13-06-2011',
      },
      { id:2,
        codigo:202,
        descripcion: 'Ice cream sandwich',
        foto: 'https://i.ytimg.com/vi/yZ56s9OjcWA/maxresdefault.jpg',
         fechacreacion: '13-06-2011',
         fechamodificacion: '13-06-2012',
      },
    ],
     Bodegas: [
      { 
        id:1,
        codigo:101,
        descripcion: 'Frozen Yogurt',
        foto: 'https://i.ytimg.com/vi/yZ56s9OjcWA/maxresdefault.jpg',
        fechacreacion: '13-06-2010',
        fechamodificacion: '13-06-2011',
      },
      { id:2,
        codigo:202,
        descripcion: 'Ice cream sandwich',
        foto: 'https://i.ytimg.com/vi/yZ56s9OjcWA/maxresdefault.jpg',
         fechacreacion: '13-06-2011',
         fechamodificacion: '13-06-2012',
      },
    ],
     Articulos: [
      { 
        id:1,
        codigo:101,
        descripcion: 'Frozen Yogurt',
        foto: 'https://i.ytimg.com/vi/yZ56s9OjcWA/maxresdefault.jpg',
        id_categoria:3,
        preciocompra:1230,
        precioventa:1456,
        fechacreacion: '13-06-2010',
        fechamodificacion: '13-06-2011',
      },
      { id:2,
        codigo:202,
        descripcion: 'Ice cream sandwich',
        foto: 'https://i.ytimg.com/vi/yZ56s9OjcWA/maxresdefault.jpg',
        id_categoria:4,
        preciocompra:1456,
        precioventa:2456,
        fechacreacion: '13-06-2011',
        fechamodificacion: '13-06-2012',
      },
    ],
    Listado_inventario: [
      { 
        id_articulo:1,
         id_bodega:3,
        saldo: 120890,
        fechaultimomovimiento: '13-06-2011',
      },
      { id_articulo:2,
         id_bodega:4,
         saldo: 120992,
         fechaultimomovimiento: '13-06-2012',
      },
    ],
     movimiento: [
      { 
        id:1,
        fechahora: new Date(),
        id_tipomovimiento: 4,
        observaciones: 'primera observacion',
        id_producto: 6,
        id_bodega: 8,
        cantidad:40
      },
      { id:2,
        fechahora:new Date(),
        id_tipomovimiento: 5,
        observaciones: 'segunda observacion',
         id_producto: 9,
         id_bodega: 12,
         cantidad:50
      },
    ],
    usuarios: [
      { 
        username:1,
        ultimologin: '12-03-2011',
        estado: 'activo',
        fechacreacion: '13-06-2010',
        fechamodificacion: '13-06-2011',
      },
      { username:2,
        ultimologin: '12-03-2012',
        estado: 'activo',
         fechacreacion: '13-06-2011',
         fechamodificacion: '13-06-2012',
      },
    ],
     roles: [
      { 
        id:1,
        nombre: 'nombre',
        
      },
      { id:2,
        nombre: 'nombre12',
      },
    ],
  },
  getters: {
   getCategorias(state){
    axios.get('/Categorias/Get',state.config)
    .then(response => {
       state.categorias_token = response.data;
       console.log(state.categorias_token)
       return response.data;
    
    })
    .catch(e => {
      console.log(e);
      console.log('token: '+ (localStorage.getItem('token')));
    })  
    
  },
},
  mutations: {
    addCategoria(state){
       state.categorias.push(state.categoria);
    },
    addEmail(state){
     state.username=state.user;
    }
  },
  actions: {
    addCategoriaAction(context){
      context.commit('addCategoria');
    },
    addEmailAction(context){
      context.commit('addEmail');
    }
  },
  modules: {
  }
})
