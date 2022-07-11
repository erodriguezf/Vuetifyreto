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
import { Bar } from 'vue-chartjs/legacy'
import axios from 'axios'
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
export default{
    components: {
    Bar
  },
     data() {
    return {
      Articulos:[

      ],
      Categorias:[

      ],
      cont:0,
      DataArticulos:[],
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
            label: 'Articulos ',
            backgroundColor: '#FFFF00',
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
         axios.get('/Articulos/Get',this.config)
         .then(response => {
           this.Articulos = response.data;
           console.log(this.Articulos);

          })
         .catch(e => {
          console.log(e);
         })
          axios.get('/Categorias/Get',this.config)
         .then(response => {
           this.Categorias = response.data;
           this.Categorias.forEach(Categoria => {
            this.Articulos.forEach(Articulo=>{
              if(Categoria.id === Articulo.idCategoria){
                 this.cont = this.cont +1;
              }
            })
             this.chartData.datasets[0].data.push(this.cont);
             this.cont=0;
              this.chartData.labels.push('Categoria '+ Categoria.id);
           });

          })
         .catch(e => {
          console.log(e);
         })
   },
}
</script>