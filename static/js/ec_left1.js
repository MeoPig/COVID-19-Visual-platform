var ec_left1 = echarts.init(document.getElementById('l1'));

var ec_left1_Option = {
	// backgroundColor:'rgba(128, 128, 128, 0.1)', //rgba设置透明度0.1
	//标题样式
	title: {
		text: "全国累计趋势",
		textStyle: {
			color: 'rgba(255,255,255,.5)',
		},

		left: 'left',
	},
	tooltip: {
		backgroundColor: 'rgba(255,255,255,0.7)',
		trigger: 'axis',
		//指示器
		axisPointer: {
			type: 'line',
			lineStyle: {
				color: '#dddc6b'
			}
		},
	},
	legend: [{
		data: ['累计确诊', '现有疑似'],
		textStyle: {
           color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        },
		left: '30%'
			},
		{
		data:[ "累计治愈", "累计死亡"],
			textStyle: {
           color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        },
		left:'30%',
		y:'7%'}
		],

	//图形位置
	grid: {
		left: '4%',
		right: '6%',
		bottom: '4%',
		top: 50,
		containLabel: true
	},
	 toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
// 	dataZoom: [{
//         // type: 'inside'
// 		type: 'slider'
//     			},
// 		{
//         show : true, //是否显示
//  　　　　realtime : true, //拖动时，是否实时更新系列的视图
// 　　　　 start : 1, //伸缩条开始位置（1-100），可以随时更改
//  　　　　end : 20, //伸缩条结束位置（1-100），可以随时更改
//     		}],

	dataZoom: [{
                type: 'slider',
                show: true, //flase直接隐藏图形
                xAxisIndex: [0],
                bottom: -5,
                start: 0,//滚动条的起始位置
                end: 20 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
            }],
	xAxis: [{
		type: 'category',
		//x轴坐标点开始与结束点位置都不在最边缘
		boundaryGap: false,
		// boundaryGap : true,
		axisLabel:  {
                textStyle: {
 					color: "rgba(255,255,255,.6)",
					fontSize:12,
                },
            },
        axisLine: {
			lineStyle: {
				color: 'rgba(255,255,255,.2)'
			}

        },
		data: []//['01.20', '01.21', '01.22']
	},
	{

        axisPointer: {show: false},
        axisLine: {  show: false},
        position: 'bottom',
        offset: 20,


    }],
	yAxis: [{
		type: 'value',
		//y轴字体设置
		axisLabel: {
			show: true,
			// color: 'black',
			// fontSize: 12,
			textStyle: {
 					color: "rgba(255,255,255,.6)",
					fontSize:12,
                },
			formatter: function(value) {
				if (value >= 1000) {
					value = value / 1000 + 'k';
				}
				return value;
			}
		},
		//y轴线设置显示
		axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        },
		//与x轴平行的线样式
		splitLine: {
			show: true,
			lineStyle: {
				color: 'rgba(255,255,255,.1)',
				width: 1,
				type: 'solid',
			}
		}
	}],
	series: [{
		name: "累计确诊",
		type: 'line',
		smooth: true,
		symbol: 'circle',
		symbolSize: 5,
        showSymbol: false,
        lineStyle: {

            normal: {
				color: '#0184d5',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(1, 132, 213, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(1, 132, 213, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#0184d5',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
		data: []//[260, 406, 529]
	}, {
		name: "现有疑似",
		type: 'line',
		smooth: true,
		symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {

            normal: {
				color: '#00d887',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#00d887',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
		data: []//[54, 37, 3935]
	},
		{
		name: "累计治愈",
		type: 'line',
		smooth: true,
					symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {

            normal: {
				color: '#d8be57',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#d8be57',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
		data: []//[25, 25, 25]
	}, {
		name: "累计死亡",
		type: 'line',
		smooth: true,
								symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {

            normal: {
				color: '#7b4d88',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#7b4d88',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
		data: []//[6, 9, 17]
	}]
};

ec_left1.setOption(ec_left1_Option)
