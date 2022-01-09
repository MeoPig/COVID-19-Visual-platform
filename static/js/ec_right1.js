var ec_right1 = echarts.init(document.getElementById('r1'));
var ec_right1_option ={
    title: {
		text: "国外确诊人数Top10",
		textStyle: {
            color: '#fff',
			fontSize:'16'
        },

		left: 'left',
	},
    tooltip: {
        // backgroundColor: 'rgba(255,255,255,0.7)',
        trigger: 'item'
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
         orient: 'vertical',
        left: 'right',
        top:'bottom',
        color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        textStyle: {
            color: '#fff',
			fontSize:'12'
        },

    },
    series: [
        {
            name: '确诊人数',
            type: 'pie',
            radius: ['40%', '70%'],
            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab','#0ef0c5'],
            avoidLabelOverlap: false,
            // itemStyle: {
            //     borderRadius: 10,
            //     borderColor: '#fff',
            //     borderWidth: 2
            // },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data:[]
        }
    ]
};
ec_right1.setOption(ec_right1_option)