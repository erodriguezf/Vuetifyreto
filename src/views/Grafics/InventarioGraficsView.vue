<template>
  <Doughnut
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
const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Novimembre','Diciembre']

import { Doughnut } from 'vue-chartjs/legacy'
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

export default {
  name: 'BarChart',
  components: {
   Doughnut
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
      cantidad:0,
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
            label: 'Saldo ($)',
            backgroundColor: ['#76FF03','#FF1744','#F50057' ,'#AA00FF','#311B92','#3D5AFE','#00897B'
                              ,'#00E5FF','#00BFA5','#00C853','#FFFF00','#FF6D00'],
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
         axios.get('/Inventario/Get',this.config)
         .then(response => {
              this.chartData.labels=meses;
              meses.forEach(mes=>{
                  response.data.forEach(fecha => {
                const nuevafecha = new Date(fecha.fechaultimomovimiento);
                if(meses[nuevafecha.getMonth()] == mes){
                   this.cantidad = this.cantidad+fecha.saldo;
                }
              });
                this.saldo.push(this.cantidad)
                this.cantidad=0;
              });
               console.log(this.saldo);
               this.chartData.datasets[0].data=this.saldo;
           
          })
         .catch(e => {
          console.log(e);
         })
   },
}
</script>