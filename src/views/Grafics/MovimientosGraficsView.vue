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
const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Novimembre','Diciembre']
export default {
  name: 'BarChart',
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
  data() {
    return {
      saldo:[

      ],
      mesesfechas:[],
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
            label: 'Cantidad',
            backgroundColor: '#76FF03',
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
            this.chartData.datasets[0].data= response.data.map(data=>data.cantidad);
              response.data.forEach(fecha => {
                const nuevafecha = new Date(fecha.fechahora);
                this.chartData.labels.push(meses[nuevafecha.getMonth()]);
              });
           
          })
         .catch(e => {
          console.log(e);
         })
   },
}
</script>