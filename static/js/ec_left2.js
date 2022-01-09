var ec_left2 = echarts.init(document.getElementById('l2'), "infographic");
var ec_left2_Option = {
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
	 toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
	legend: {
		data: ['新增确诊', '新增疑似'],
		textStyle: {
           color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        },
		left: '30%'
	},
	//标题样式
	title: {
		text: "全国新增趋势",
		textStyle: {
			color: 'rgba(255,255,255,.5)',
		},

		left: 'left',
	},
	//图形位置
	grid: {
		left: '4%',
		right: '6%',
		bottom: '4%',
		top: 50,
		containLabel: true
	},
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
		// boundaryGap : true,
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
		data: []
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

		//y轴线设置显示
		axisLine: {
			lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
		},
		axisLabel: {
			show: true,
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
		name: "新增确诊",
		type: 'line',
		smooth: true,
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
		data: []
	}, {
		name: "新增疑似",
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
		data: []
	}]
};

ec_left2.setOption(ec_left2_Option)
