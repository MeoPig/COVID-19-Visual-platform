$(function(){
	changeMap();
})
function changeMap(){
	var myChart= echarts.init(document.getElementById('c2'));
	var provinceoption = {
    title: {
        text: '中国各地区疫情数据地图',
        textStyle: {
			color: 'rgba(255,255,255,.5)',
		},
        subtext: '',
        x: 'left'
    },
    tooltip: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        alwaysShowContent: false,
        trigger: 'item'
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            saveAsImage: {}
        }
    },
    //左侧小导航图标
    visualMap: {
        show: true,
        x: 'left',
        y: 'bottom',
        textStyle: {
            fontSize: 12,
            color: '#fff',
        },
        splitList: [{ start: 1,end: 9 },
            {start: 10, end: 99 },
			{ start: 100, end: 999 },
            {  start: 1000, end: 9999 },
            { start: 10000 }],
        color: ['#0f0593', '#1d39c6', '#4a87e5', '#95b6f2', '#dce1f9']
    },
    //配置属性
    series: [{
        name: '累计确诊人数',
        type: 'map',
        mapType: 'china',
        roam: false, //拖动和缩放
        itemStyle: {
            normal: {
                borderWidth: .5, //区域边框宽度
                borderColor: '#282828', //区域边框颜色
                areaColor: "#edffe3", //区域颜色
            },
            emphasis: { //鼠标滑过地图高亮的相关设置
                borderWidth: .5,
                borderColor: '#4b0082',
                areaColor: "#fff",
            }
        },
        label: {
            normal: {
                show: true, //省份名称
                fontSize: 15,
                 color: '#fff7a3',
            },
            emphasis: {
                show: true,
                fontSize: 11,
            }
        },
        data:[] //mydata //数据
    }]
};
 $.ajax({
        url:"/c2",
        success: function(data) {
            provinceoption.series[0].data=data.data
            myChart.setOption(provinceoption)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
	var Province = "";
    myChart.clear();
    myChart.off('click')
	myChart.on('click', function (params){
		var myChart= echarts.init(document.getElementById('c2'));

		Province = params.name;
		var cityoption = {
		    tooltip: {
		        backgroundColor: 'rgba(255,255,255,0.7)',
		        alwaysShowContent: false,
		        trigger: 'item'
		    },
            toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            saveAsImage: {}
        }
    },
            visualMap: {
        show: true,
        x: 'left',
        y: 'bottom',
        textStyle: {
            fontSize: 12,
            color: '#fff',
        },
        splitList: [{ start: 1,end: 9 },
            {start: 10, end: 99 },
			{ start: 100, end: 999 },
            {  start: 1000, end: 9999 },
            { start: 10000 }],
        color: ['#0f0593', '#1d39c6', '#4a87e5', '#95b6f2', '#dce1f9']
    },
		    series: [
		        {
		            name: '累计确诊人数',
		            type: 'map',
		            mapType: Province,
		            selectedMode : 'single',
                    itemStyle: {
            normal: {
                borderWidth: .5, //区域边框宽度
                borderColor: '#282828', //区域边框颜色
                areaColor: "#edffe3", //区域颜色
            },
            emphasis: { //鼠标滑过地图高亮的相关设置
                borderWidth: .5,
                borderColor: '#4b0082',
                areaColor: "#fff",
            }
        },
        label: {
            normal: {
                show: true, //省份名称
                fontSize: 15,
                 color: '#fff7a3',
            },
            emphasis: {
                show: true,
                fontSize: 11,
            }
        },
		             data:[]
		        }
		    ]
		};
		$.ajax({
        url:"/c2",
        success: function(data) {
            cityoption.series[0].data=data.data1
            myChart.setOption(cityoption)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
        myChart.clear();
        myChart.off('click')
		myChart.on('click', function (params){
			changeMap();
		});
		myChart.setOption(cityoption);
 		window.addEventListener("resize",function(){
       	 	myChart.resize();
   		});
	});
	myChart.setOption(provinceoption);
 	window.addEventListener("resize",function(){
        myChart.resize();
   });
}
