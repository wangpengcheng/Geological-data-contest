var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;

// 秋雁南飞：
// 此版本通过设置geoindex && seriesIndex: [1] 属性来实现geo和map共存，来达到hover散点和区域显示tooltip的效果
// 默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。
// 当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
// http://echarts.baidu.com/option.html#series-map.geoIndex
// 并且加了pin气泡图标以示数值大小
// // 全局变量区:参考江西绿色金融（谢谢：本来想用闭包实现接口数据调用，没时间了）

// 本图作者：参考秋雁南飞的《投票统计》一图，网址：http://gallery.echartsjs.com/editor.html?c=xrJU-aE-LG
var name_title = " 冀中坳陷地温梯度、大地热流值";
var subname = '数据源自知网';
var nameColor = " rgb(55, 75, 113)";
var name_fontFamily = '等线';
var subname_fontSize = 15;
var name_fontSize = 18;
var mapName = 'china';
var data = [
    {name:"北京",value:177},
    {name:"天津",value:42},
    {name:"河北",value:102},
    {name:"山西",value:81},
    {name:"内蒙古",value:47},
    {name:"辽宁",value:67},
    {name:"吉林",value:82},
    {name:"黑龙江",value:66},
    {name:"上海",value:24},
    {name:"江苏",value:92},
    {name:"浙江",value:114},
    {name:"安徽",value:109},
    {name:"福建",value:116},
    {name:"江西",value:91},
    {name:"山东",value:119},
    {name:"河南",value:137},
    {name:"湖北",value:116},
    {name:"湖南",value:114},
    {name:"重庆",value:91},
    {name:"四川",value:125},
    {name:"贵州",value:62},
    {name:"云南",value:83},
    {name:"西藏",value:9},
    {name:"陕西",value:80},
    {name:"甘肃",value:56},
    {name:"青海",value:10},
    {name:"宁夏",value:18},
    {name:"新疆",value:67},
    {name:"广东",value:123},
    {name:"广西",value:59},
    {name:"海南",value:14},
];
//定义数据
var geoCoordMap1 = {};
//地温梯度和大地热流
var data1=[
    {"井号":"单 60","坐标":[118.0833333,37.46666667],"参数":[{"深度(m)": "400～1130", "地温梯度G(°C/km）": "37.2±0.12", "大地热流q(mW/m2)": 74.7}]},
    {"井号":"郑 16","坐标":[118.25,37.6],"参数":[{"深度(m)": "400～700", "地温梯度G(°C/km）": "31.4±0.04", "大地热流q(mW/m2)": 64.1},{"深度(m)": "800～1800", "地温梯度G(°C/km）": "30.6±0.09", "大地热流q(mW/m2)": 65.8}]},
    {"井号":"郑 17","坐标":[118.2833333,37.58333333],"参数":[{"深度(m)": "500～1850", "地温梯度G(°C/km）": "32.3±0.14", "大地热流q(mW/m2)": 70.8}]},
    {"井号":"夏 33","坐标":[116.8333333,37.06666667],"参数":[{"深度(m)": "1290～3500", "地温梯度G(°C/km）": "28.0±0.19", "大地热流q(mW/m2)": 52.9}]},
    {"井号":"阳 8","坐标":[117.4,37.56666667],"参数":[{"深度(m)": "900～2000", "地温梯度G(°C/km）": "33.4±0.13", "大地热流q(mW/m2)": 63.5},{"深度(m)": "3000～3800", "地温梯度G(°C/km）": "28.0±0.07", "大地热流q(mW/m2)": 55.4}]},
    {"井号":"义 37-31","坐标":[118.6166667,37.9],"参数":[{"深度(m)": "400～1330", "地温梯度G(°C/km）": "33.6±0.10", "大地热流q(mW/m2)": 68.5},{"深度(m)": "3500～4194", "地温梯度G(°C/km）": "38.9±0.10", "大地热流q(mW/m2)": 77}]},
    {"井号":"义 118","坐标":[118.6166667,37.91666667],"參數":[{"深度(m)": "3200～3800", "地温梯度G(°C/km）": "37.0±0.10", "大地热流q(mW/m2)": 66.6}]},
    {"井号":"桩 11","坐标":[118.9666667,38.01666667],"参数":[{"深度(m)": "2700～3800", "地温梯度G(°C/km）": "31.8±0.13", "大地热流q(mW/m2)": 65.6}]},
    {"井号":"孤北21-10","坐标":[118.7333333,37.9],"参数":[ {"深度(m)": "2000～2900", "地温梯度G(°C/km）": "35.3±0.13", "大地热流q(mW/m2)": 67.8}]},
    {"井号":"孤南131-4","坐标":[118.9666667,37.86666667],"参数":[{"深度(m)": "2250～2450", "地温梯度G(°C/km）": "33.1±0.03", "大地热流q(mW/m2)": 65.2}, {"深度(m)": "2750～2850", "地温梯度G(°C/km）": "34.8±0.02", "大地热流q(mW/m2)": 72.7},{"深度(m)": "3450～3550", "地温梯度G(°C/km）": "34.1±0.04", "大地热流q(mW/m2)": 61.7}]},
    {"井号":"车古 8","坐标":[118.0333333,37.91666667],"参数":[
            {"深度(m)": "350～1300", "地温梯度G(°C/km）": "33.4±0.10", "大地热流q(mW/m2)": 68.8}
        ]},
    {"井号":"大 673","坐标":[118.25,38.03333333],"参数":[
            {"深度(m)": "500～1000", "地温梯度G(°C/km）": "30.0±0.05", "大地热流q(mW/m2)": 61.2},
            {"深度(m)": "2200～2650", "地温梯度G(°C/km）": "38.2±0.06", "大地热流q(mW/m2)": 70}
        ]},
    {"井号":"埕北 30","坐标":[118.9333333,38.21666667],"参数":[
            {"深度(m)": "2200～3400", "地温梯度G(°C/km）": "30.0±0.19", "大地热流q(mW/m2)": 57.5}
        ]},

];
var temp_data1=[
    {name: "单 60", value: 37.2},
    {name: "郑 16", value: 31.4},
    {name: "郑 17", value: 32.3},
    {name: "夏 33", value: 28},
    {name: "阳 8", value: 33.4},
    {name: "义 37-31", value: 33.6},
    {name: "义 118", value: 37},
    {name: "桩 11", value: 31.8},
    {name: "孤北21-10", value: 35.3},
    {name: "孤南131-4", value: 33.1},
    {name: "车古 8", value: 33.4},
    {name: "大 673", value: 30},
    {name: "埕北 30", value: 30}
];

var max=37.2
    ,min=28;

//獲取臨時數據
var temp_data=[].concat(temp_data1);
/*获取地图数据*/
myChart.showLoading();
myChart.hideLoading();


var true_data; // todo
var maxSize4Pin = 100,
    minSize4Pin = 20;
//更改

data1.forEach(function (v) {
    //井號
    var name=v["井号"];
    geoCoordMap1[name] = v["坐标"];

});
//滑動顯示數據
true_data=data1;
//返回实际数据
var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap1[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    //返回数据
    return res;
};
//設置option參數；
option = {
    title: {
        text: name_title,
        subtext: subname,
        x: 'center',
        textStyle: {
            color: nameColor,
            fontFamily: name_fontFamily,
            fontSize: name_fontSize
        },
        subtextStyle:{
            fontSize:subname_fontSize,
            fontFamily:name_fontFamily
        }
    },
    /*
     toolbox: {
        feature: {
            magicType: {
                type: ['stack', 'tiled']
            },
            dataView: {}
        }
    },
    */
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            var toolTiphtml = '';
            for(var i = 0;i<true_data.length;i++){
                if(params.name==true_data[i]["井号"]){
                    toolTiphtml += true_data[i]["井号"]+':<br>';
                    for(var key in true_data[i]["参数"][0]){
                        toolTiphtml+=key+":"+true_data[i]["参数"][0][key]+"<br> ";
                    }
                    toolTiphtml+="<br>";


                }
            }
            return toolTiphtml;
        }
    },
    // legend: {
    //     orient: 'vertical',
    //     y: 'bottom',
    //     x: 'right',
    //     data: ['credit_pm2.5'],
    //     textStyle: {
    //         color: '#fff'
    //     }
    // },
    visualMap: {
        show: true,
        min: 0,
        max: 200,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
        seriesIndex: [1],
        inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿

        }
    },
    /*工具按钮组*/
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {
                readOnly: false
            },
            restore: {},
            saveAsImage: {}
        }
    },
    geo: {
        show: true,
        map: mapName,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
            }
        },
        //设置地图中心;
        center: [118.6166667,37.9],
        //缩放级别
        zoom:30,
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
            },
            emphasis: {
                areaColor: '#2B91B7',
            }
        }
    },
    series: [{
        name: '散点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(temp_data1),
        symbolSize: function(val) {
            return val[2] / 10;
        },
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
                textStyle: {
                    color: '#13083f',
                    fontSize: 16,//设置标注字体
                }
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#05C3F9'
            }
        }
    },
        //地图底图
        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        },
        {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function(val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
                return a * val[2] + b;
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,//设置标注字体
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#F62157', //标志颜色
                }
            },
            zlevel: 6,
            data: convertData(temp_data1),
        },
        {//前五个数据
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(temp_data1),
            symbolSize: function(val) {
                return val[2]/2;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true,
                    textStyle: {
                        // color: '#fff',
                        fontSize: 16,//设置标注字体
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: 'yellow',
                    shadowBlur: 10,
                    shadowColor: 'yellow'
                }
            },
            zlevel: 1
        },

    ]
};
myChart.setOption(option);


//數據顯示部分
//實現數據顯示框可拖動
//div可拖动函数
function dragPanelMove(downDiv,moveDiv){
    $(downDiv).mousedown(function (e) {
        var isMove = true;
        var div_x = e.pageX - $(moveDiv).offset().left;
        var div_y = e.pageY - $(moveDiv).offset().top;
        $(document).mousemove(function (e) {
            if (isMove) {
                var obj = $(moveDiv);
                obj.css({"left":e.pageX - div_x, "top":e.pageY - div_y});
            }
        }).mouseup(
            function () {
                isMove = false;
            });
    });

}
//设计函数按照值来进行快速排序
function sortA(arr){
    // 如果只有一位，就没有必要比较
    if(arr.length<=1){
        return arr;
    }
    // 获取中间值的索引
    var len = Math.floor(arr.value/2);
    // 截取中间值
    var cur = arr.splice(len,1);
    // 小于中间值放这里面
    var left = [];
    // 大于的放着里面
    var right = [];
    for(var i=0;i<arr.length;i++){
        // 判断是否大于
        if(cur>arr[i]){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    // 通过递归，上一轮比较好的数组合并，并且再次进行比较。
    return sortA(left).concat(cur,sortA(right));
};
//设置app1全局变量
//显示排序表
var temp_sort_data1=sortA(temp_data1);
var app1 = new Vue({
    el: '#table',
    data: {
        titles: ["序号" ,"名称", "值"],
        datas:temp_sort_data1.slice(0,10),
    }
});

function show_sort(temp_data2,arc){
    if(temp_data2==null||temp_data2.length<1){
        alert("数据为空");
    }else {
        var temp_data2=sortA(temp_data2);
    }
    if(arc===1){//如果最大
        temp_data3=temp_data2.slice(0,10);
    }else if(arc===2){
        var length=temp_data2.length-1;
        temp_data3=temp_data2.slice(length-10,length);
    }
    app1.$data.datas=temp_data3;
};
//设置div可拖动
dragPanelMove("#show","#show");
dragPanelMove("#subchart","#subchart");

//设置函数更新右侧信息面板
//捕獲顯示板節點
/*
    meassage 定義
    title；住標題h
    subtitle:子標題
    msg1:第一信息
    msg2:第二信息
    parameter：主要參數
    var test_msg={
    title:"显示最终",
    subtitle:"你想干啥"
    };
*/
var show_data1={
    title:"井号",
    number:"雄 104",
    subtitle:"",
    remark:"",
    level:[1,2,3,4,5],
    massages1:"坐标",
    massages2:"115.5445, 37.9356",
    opt:{
        title:"主要参数",
        para:[{name:"深度",value:"30～750"},
            {name:"地温梯度G(°C/km)",value:56.1},
            {name:"大地热流q(mW/m2)",value:153.1},
            {name:"层位",value:"Nm-Ng"}
        ]
    },
};
//设置函数展示数据
var app2 = new Vue({
    el: '#today-quality',
    data:show_data1,
});
//console.log(show_data1.subtitle);

//绑定单击事件
myChart.on('click', function(p) {
    if (p.seriesType == 'scatter') {
        $("#subchart").slideDown();
        app2.$data.number=p.name;
        //app2.$data.massages1=p.name;
        app2.$data.massages2=p.value.toString();
        //更新参数
        var new_para=[];
        for(var i = 0;i<data1.length;i++){
            console.log("<<<<<<","歡迎")
            if(p.name==data1[i]["井号"]){
                for(var j=0;j<data1[i]["参数"].length;j++){
                    for(var key in data1[i]["参数"][j]){
                        new_para.push({name:key,value:data1[i]["参数"][j][key]+""});
                    }
                }
            }
        }
        app2.$data.opt.para=new_para;
        console.log(new_para);
    };
});
//设置按钮绑定事件
var temp_data2=sortA(temp_data1);
$("#top").click(
    function () {
        show_sort([].concat(temp_data2),1);
    }
)
$("#bottom").click(
    function () {
        show_sort([].concat(temp_data2),2);
    }
);