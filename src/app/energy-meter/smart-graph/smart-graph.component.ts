// import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
// import * as Chart from 'chart.js';


import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-smart-graph',
  templateUrl: './smart-graph.component.html',
  styleUrls: ['./smart-graph.component.css']
})

export class SmartGraphComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    this.barChartPopulation();
  }

  barChartPopulation() {


     
    

    HighCharts.chart('barChart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Historic World Population by Region'
      },
      xAxis: {
        categories: ['Africa', 'America'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: undefined,
        name: 'Year 1800',
        data: [107, 31]
      }, {
        type: undefined,
        name: 'Year 1900',
        data: [133, 156]
      }, {
        type: undefined,
        name: 'Year 2000',
        data: [814, 841]
      }, {
        type: undefined,
        name: 'Year 2016',
        data: [1216, 1001]
      }]
    });

   

  }


}

// export class SmartGraphComponent implements AfterViewInit {
//   @ViewChild('barCanvas') private barCanvas: ElementRef;
//   barChart: any;

//   constructor() { }

//   ngAfterViewInit(): void {
//     this.barChartMethod();
//   }


//   data = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [{
//         label: "My line dataset",
//         //new option, type will default to bar as that what is used to create the scale
//         type: "line",
//         fillColor: "rgba(220,220,220,1)",
//         strokeColor: "rgba(220,220,220,1)",
//         pointColor: "rgba(220,220,220,1)",
//         pointStrokeColor: "#fff",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "rgba(220,220,220,1)",
//         data: [65, 59, 4, 81, 56, 55, 40]
//     }, {
//         label: "My bar dataset",
//         //new option, type will default to bar as that what is used to create the scale
//         type: "bar",
//         fillColor: "rgba(220,20,220,0.2)",
//         strokeColor: "rgba(220,20,220,1)",
//         pointColor: "rgba(220,20,220,1)",
//         pointStrokeColor: "#fff",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "rgba(220,220,220,1)",
//         data: [32, 25, 33, 88, 12, 92, 33]
//     }]
// };
//   barChartMethod() {
//     this.barChart = new Chart(this.barCanvas.nativeElement, {
//       type: 'bar',
//       data: this.data,
//       // options: {
//       //   scales: {
//       //     yAxes: [{
//       //       ticks: {
//       //         beginAtZero: true
//       //       }
//       //     }]
//       //   }
//       // },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           title: {
//             display: true,
//             text: 'Chart.js Combined Line/Bar Chart'
//           }
//         }
//       },
//     });
//   }

// }