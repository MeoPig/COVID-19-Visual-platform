$(function(){
	changeBar();
})
function changeBar(){
	var myChart= echarts.init(document.getElementById('beimei'));
	var changebaroption ={
    title: { text: '全球地区确诊人数'},
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.7)',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },

    toolbox: {
        show: true,
        feature: {
            dataView:
                {show: true,

                    readOnly: false},
            saveAsImage: {}
                    , magicType: {show: true,
                type: ['line', 'bar']}, } },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval:0,
                rotate:40,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
},
            axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        }
    ],
    yAxis: [
        {
            type: 'log',
            axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
        }
    ],
    series: [
        {
            name: '确诊人数',
            type: 'bar',
            barWidth: '60%',
            data: [],
            itemStyle: {
            normal: {
                color:'#2f89cf',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
        }
    ]
};
 $.ajax({
        url:"/beimei",
        success: function(data) {
            changebaroption.xAxis[0].data=data.continent
            changebaroption.series[0].data=data.confirmedCount
            myChart.setOption(changebaroption)
            myChart.hideLoading();
		},
		error: function(xhr, type, errorThrown) {

		}
    })
	var cityname = "";
    myChart.clear();
    myChart.off('click')
	myChart.on('click', function (params){
		var myChart= echarts.init(document.getElementById('beimei'), "infographic");
		cityname = params.name;
		var changebar1option = {
    title: {
        text: cityname+'地区确诊人数'
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.7)',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    toolbox: {
        show: true,
        feature: {
            dataView:
                {show: true,
                    readOnly: false},
                    saveAsImage: {}
                    , magicType: {show: true,
                type: ['line', 'bar']}, } },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval:0,
                rotate:40,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
},
            axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        }
    ],
    yAxis: [
        {
            type: 'log',
                    axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
        }
    ],
    series: [
        {
            name: '确诊人数',
            type: 'bar',
            barWidth: '60%',
            data: [],
            itemStyle: {
            normal: {
                color:'#2f89cf',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
        }
    ]
};
		$.ajax({
        url:"/beimei",
        success: function(data) {
            switch (cityname) {
                case "北美洲":
                    changebar1option.xAxis[0].data = data.beimeicontinent
                changebar1option.series[0].data = data.beimeiconfirmedCount
                myChart.setOption(changebar1option)
                myChart.hideLoading();
                    break;
                case "非洲":
                    changebar1option.xAxis[0].data = data.feizhoucontinent
                changebar1option.series[0].data = data.feizhouconfirmedCount
                myChart.setOption(changebar1option)
                myChart.hideLoading();
                    break;
                case "亚洲":
                    changebar1option.xAxis[0].data = data.yazhoucontinent
                changebar1option.series[0].data = data.yazhouconfirmedCount
                myChart.setOption(changebar1option)
                myChart.hideLoading();
                    break;
                case "南美洲":
                    changebar1option.xAxis[0].data = data.nanmeicontinent
                changebar1option.series[0].data = data.nanmeiconfirmedCount
                myChart.setOption(changebar1option)
                myChart.hideLoading();
                    break;
                case "欧洲":
                    changebar1option.xAxis[0].data = data.ouzhoucontinent
                changebar1option.series[0].data = data.ouzhouconfirmedCount
                myChart.setOption(changebar1option)
                myChart.hideLoading();
                    break;
                case "大洋洲":
                    changebar1option.xAxis[0].data = data.dayangcontinent
                changebar1option.series[0].data = data.dayangconfirmedCount
                myChart.setOption(changebar1option)
                myChart.hideLoading();
                    break;
                default:
                    changebar1option.xAxis[0].data=data.continent
                changebar1option.series[0].data=data.confirmedCount
                myChart.setOption(changebar1option)
                myChart.hideLoading();


            }
		},
		error: function(xhr, type, errorThrown) {

		}
    })
        myChart.clear();
        myChart.off('click')
		myChart.on('click', function (params){
			changeBar();
		});
         myChart.showLoading({
            text: '数据正在努力加载...',
            effect : 'whirling' ,
            textStyle: { fontSize : 30 , color: '#444' },
         maskColor: 'rgba(19,31,64,.32)',
            // effectOption: {backgroundColor: 'rgba(19,31,64,.32)'}
        });
		myChart.setOption(changebar1option);

 		window.addEventListener("resize",function(){
       	 	myChart.resize();
   		});
	});
     myChart.showLoading({
            text: '数据正在努力加载...',
         effect : 'whirling' ,
            textStyle: { fontSize : 30 , color: '#444' },
         maskColor: 'rgba(19,31,64,.32)',
            // effectOption: {backgroundColor: 'rgba(19,31,64,.32)'}
        });
	myChart.setOption(changebaroption);
 	window.addEventListener("resize",function(){
        myChart.resize();
   });
}
