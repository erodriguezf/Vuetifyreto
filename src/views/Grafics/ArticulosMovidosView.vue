<template>
 <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import axios from 'axios'
import { Bar } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default({
  components: {
    Bar
  },
   props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
       movimientos:[],
       articulos:[],
       cantidadmovida:0,
       articulosmovidos:[],
        config:{
              headers: {
              Authorization: `Bearer ${(localStorage.getItem('token'))}` ,
               "Content-Type": "application/json"
              }
            },
               chartData: {
        labels: [
          
        ],
        datasets: [
          {
            label: 'Cantidad movida',
            backgroundColor: '#D50000',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }

    }
  },
   created () {
         axios.get('/Movimiento/Get',this.config)
         .then(response => {
          this.movimientos = response.data.sort(((a,b) => a.idArticulo-b.idArticulo));
          })
         .catch(e => {
          console.log(e);
         })
          axios.get('/Articulos/Get',this.config)
          .then(response => {
              this.articulos = response.data.sort(((a,b) => a.id-b.id));
            //  console.log(this.articulos)
              this.articulos.forEach(Articulo => {
                 this.movimientos.forEach(movmiento=>{
                   if(Articulo.id === movmiento.idArticulo){
                      this.cantidadmovida=this.cantidadmovida+movmiento.cantidad;
                   }
                 })
                 this.chartData.labels.push('Articulo '+Articulo.id);
                 console.log(Articulo.id);
                 this.articulosmovidos.push(this.cantidadmovida);
                 this.cantidadmovida=0;
              });
             this.chartData.datasets[0].data=this.articulosmovidos;
          })
            .catch(e => {
              console.log(e);
          }) 
           
   },
})
</script>

