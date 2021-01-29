/****************************************************************
 * 2020/01/24 Sunday
 * Mirza Prangon
 * Created for company presentation
 ***************************************************************/

/****************************************************************
 * For Table
 ***************************************************************/
var projectCount = graveYardRawData.length;
for(i=0; i<projectCount; ++i) {
    var projectLength = luxon.Interval.fromDateTimes(luxon.DateTime.fromISO(graveYardRawData[i]["dateOpen"]), luxon.DateTime.fromISO(graveYardRawData[i]["dateClose"]));
    graveYardRawData[i]["projectLength"] = Math.round(projectLength.length("months"));
}


/****************************************************************
 * For Pie chart
 ***************************************************************/
var colors = Highcharts.getOptions().colors;
var pieChartData =
                [{
                    name: '0月~12月',
                    //color: colors[0],
                    y: 0
                }, {
                    name: '13月~24月',
                    //color: colors[0],
                    y: 0
                }, {
                    name: '25月~36月',
                    //color: colors[0],
                    y: 0
                }, {
                    name: '37月~48月',
                    //color: colors[0],
                    y: 0
                }, {
                    name: '49月~60月',
                    //color: colors[1],
                    y: 0
                }, {
                    name: '61月~72月',
                    //color: colors[1],
                    y: 0
                }, {
                    name: '73月~84月',
                    //color: colors[1],
                    y: 0
                }, {
                    name: '85月~96月',
                    //color: colors[1],
                    y: 0
                }, {
                    name: '97月~108月',
                    y: 0
                }, {
                    name: '109月~120月',
                    y: 0
                }, {
                    name: '121月~',
                    y: 0
                }];

for(i=0; i<projectCount; ++i) {
    if(graveYardRawData[i]["projectLength"] <= 12) {
        ++pieChartData[0]["y"];
    }
    else if(graveYardRawData[i]["projectLength"] <= 24) {
        ++pieChartData[1]["y"];
    }
    else if(graveYardRawData[i]["projectLength"] <= 36) {
        ++pieChartData[2]["y"];
    }
    else if(graveYardRawData[i]["projectLength"] <= 48) {
        ++pieChartData[3]["y"];
    }
    else if(graveYardRawData[i]["projectLength"] <= 60) {
        ++pieChartData[4]["y"];
    }
    else if(graveYardRawData[i]["projectLength"] <= 72) {
        ++pieChartData[5]["y"];
    }
    else if(graveYardRawData[i]["projectLength"] <= 84) {
        ++pieChartData[6]["y"];
    }
    else if(graveYardRawData[i]["projectLength"] <= 96) {
        ++pieChartData[7]["y"];
    }
    else if(graveYardRawData[i]["projectLength"] <= 108) {
        ++pieChartData[8]["y"];
    }
    else if(graveYardRawData[i]["projectLength"] <= 120) {
        ++pieChartData[9]["y"];
    }
    else{
        ++pieChartData[10]["y"];
    }
}
var col1 = Highcharts.color(colors[0]).brighten(-0.05).get();
var picechartDrilldownData = [{
                                name: '4年以内',
                                color: Highcharts.color(colors[0]).brighten(-0.2).get(),//colors[0],//Highcharts.color(colors[0]).brighten(-0.05).get()
                                y: pieChartData[0]["y"] + pieChartData[1]["y"] + pieChartData[2]["y"] + pieChartData[3]["y"]
                            }, {
                                name: '5年〜8年',
                                color: Highcharts.color(colors[1]).brighten(-0.2).get(),
                                y: pieChartData[4]["y"] + pieChartData[5]["y"] + pieChartData[6]["y"] + pieChartData[7]["y"]
                            }, {
                                name: '9年〜',
                                color: Highcharts.color(colors[2]).brighten(-0.2).get(),
                                y: pieChartData[8]["y"] + pieChartData[9]["y"] + pieChartData[10]["y"]
                            }];

for(i=0; i<pieChartData.length; ++i) {
    pieChartData[i]["y"] = (pieChartData[i]["y"]/projectCount)*100;
}

Highcharts.chart('containerPieChart', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'プロジェクト期間パイチャート'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
            name: '1年単位',
            innerSize: '60%',
            colorByPoint: true,
            data: pieChartData
        },{
            name: '4年毎',
            size: '60%',
            colorByPoint: true,
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            },
            data: picechartDrilldownData
    }]
});

/****************************************************************
 * For stacked graph
 ***************************************************************/
var forStackedGraphCategories = ["0月~12月", "13月~24月", "25月~48月", "49月~72月", "73月~120月","121月~"];
var forStackedGraphData = [
                           {name: "hardware", data:[0,0,0,0,0,0]},
                           {name: "app", data:[0,0,0,0,0,0]},
                           {name: "service", data:[0,0,0,0,0,0]},
                           ];

for(i=0; i<projectCount; ++i) {
    switch(graveYardRawData[i]["type"]) {
      case "hardware":
        datai = 0;
        break;
      case "app":
        datai = 1;
        break;
      default:
        datai = 2;
        break;
    }
    
    if(graveYardRawData[i]["projectLength"] <= 12) {
        ++forStackedGraphData[datai]["data"][0];
    }
    else if(graveYardRawData[i]["projectLength"] <= 24) {
        ++forStackedGraphData[datai]["data"][1];
    }
    else if(graveYardRawData[i]["projectLength"] <= 48) {
        ++forStackedGraphData[datai]["data"][2];
    }
    else if(graveYardRawData[i]["projectLength"] <= 72) {
        ++forStackedGraphData[datai]["data"][3];
    }
    else if(graveYardRawData[i]["projectLength"] <= 120) {
        ++forStackedGraphData[datai]["data"][4];
    }
    else{
        ++forStackedGraphData[datai]["data"][5];
    }
}

var tabulator = new Tabulator("#tableData", {
    height:"390px",
    data: graveYardRawData,
    layout:"fitColumns",
    columns:[
    {title:"Name", field:"name"},
    {title:"Start Date", field:"dateOpen"},
    {title:"Closed Date", field:"dateClose"},
    {title:"Length (Month)", field:"projectLength"},
    {title:"Type", field:"type"},
    ],
});


Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: '月間毎集計'
    },
    xAxis: {
        categories: forStackedGraphCategories
    },
    yAxis: {
        min: 0,
        title: {
            text: 'プロジェクトの数'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: forStackedGraphData
});

/****************************************************************
 * For column graph
 ***************************************************************/
var compiledcount = compiledData.length, temp, columnSeries = [0,0,0,0,0,0,0,0,0], yearClass, total = 0;
var lineGraphdata = [[0,0,0,0,0,0],
                     [0,0,0,0,0,0],
                     [0,0,0,0,0,0],
                     [0,0,0,0,0,0],
                     [0,0,0,0,0,0],
                     [0,0,0,0,0,0],
                     [0,0,0,0,0,0],
                     [0,0,0,0,0,0],
                     [0,0,0,0,0,0]];
for(i=0; i< compiledcount; ++i) {
        ++columnSeries[compiledData[i][3]-1];
        ++total;
        if(typeof compiledData[i][4] !== 'undefined') {
            ++columnSeries[compiledData[i][4]-1];
            ++total;
        }
        temp = Math.floor(luxon.Interval.fromDateTimes(luxon.DateTime.fromISO(compiledData[i][0]), luxon.DateTime.fromISO(compiledData[i][1])).length("years"));
        switch (temp) {
            case 0: yearClass = 0; break;
            case 1: yearClass = 1; break;
            case 2: yearClass = 2; break;
            case 3: yearClass = 3; break;
            case 4: yearClass = 4; break;
            default: yearClass = 5; break;
        }
        ++lineGraphdata[compiledData[i][3]-1][yearClass];
        if(typeof compiledData[i][4] !== 'undefined') {
            ++lineGraphdata[compiledData[i][4]-1][yearClass];
        }
}

for(i=0; i<columnSeries.length; ++i) {
        columnSeries[i] = Math.round(columnSeries[i]/total * 100)
}
                            
Highcharts.chart('containerColumn', {
    chart: {
        type: 'column'
    },
    title: {
        text: '理由毎プロジェクト心配の分析'
    },
    xAxis: {
        categories: [
            '新しい/より良いものが出た',
            'ライバル会社の商品が良い',
            'マーケットポジショニング問題',
            'マーケットディマンド外れ',
            'マーケティング問題',
            '利益問題',
            'プロジェクトが良くない',
            '国/政府の法的',
            'その他'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: '失敗理由の割合%'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: '理由の率',
        data: columnSeries
    }]
});
/****************************************************************
 * For line trend
 ***************************************************************/
 Highcharts.chart('containerTrend', {

     title: {
         text: '理由と期間のトレンド分析'
     },

     yAxis: {
         title: {
             text: 'プロジェクト数'
         }
     },

     xAxis: {
     categories: [
                  '0〜1年',
                  '1〜2年',
                  '2〜3年',
                  '3〜4年',
                  '4〜5年',
                  '5年以上'
                      ],
         accessibility: {
             rangeDescription: '期間：0年〜6年以上'
         }
     },

     legend: {
         layout: 'vertical',
         align: 'right',
         verticalAlign: 'middle'
     },

     plotOptions: {
         series: {
             label: {
                 connectorAllowed: false
             },
             pointStart: 0
         }
     },

     series: [{
         name: '新しい/より良いものが出た',
         data: lineGraphdata[0]
     }, {
         name: 'ライバル会社の商品が良い',
         data: lineGraphdata[1]
     }, {
         name: 'マーケットポジショニング問題',
         data: lineGraphdata[2]
     }, {
         name: 'マーケットディマンド外れ',
         data: lineGraphdata[3]
     }, {
         name: 'マーケティング問題',
         data: lineGraphdata[4]
     }, {
         name: '利益問題',
         data: lineGraphdata[5]
     }, {
         name: 'プロジェクトが良くない',
         data: lineGraphdata[6]
     }, {
         name: '国/政府の法的',
         data: lineGraphdata[7]
     }, {
         name: 'その他',
         data: lineGraphdata[8]
     }],

     responsive: {
         rules: [{
             condition: {
                 maxWidth: 800
             },
             chartOptions: {
                 legend: {
                     layout: 'horizontal',
                     align: 'center',
                     verticalAlign: 'bottom'
                 }
             }
         }]
     }

 });
