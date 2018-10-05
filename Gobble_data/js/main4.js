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
    {"井号": "容 1", "坐标":[ 115.8809,  39.0126],"参数":[{"深度(m)": "30～750", "岩性": "-", "岩石热导率(W/(m·K))": 2.73, "层位": "-"}]},
    {"井号": "雄 104", "坐标":[ 116.0521,  38.9615],"参数":[{"深度(m)": "30～930", "岩性": "-", "岩石热导率(W/(m·K))": 1.74, "层位": "-"}]},
    {"井号": "雄 101", "坐标":[ 116.0864,  38.9799],"参数":[{"深度(m)": "62～582", "岩性": "-", "岩石热导率(W/(m·K))": 2.09, "层位": "-"}]},
    {"井号": "淀 6", "坐标":[ 116.0984,  38.9569],"参数":[{"深度(m)": "100～1290", "岩性": "-", "岩石热导率(W/(m·K))": 2.34, "层位": "-"}]},
    {"井号": "淀 6-3", "坐标":[ 116.091,  38.961],"参数":[{"深度(m)": "50～1060", "岩性": "-", "岩石热导率(W/(m·K))": 1.76, "层位": "-"}]},
    {"井号": "霸 8", "坐标":[ 116.2724,  39.163],"参数":[{"深度(m)": "100～1390", "岩性": "-", "岩石热导率(W/(m·K))": 3.42, "层位": "-"}]},
    {"井号": "牛 8-2", "坐标":[ 116.4734,  39.2324],"参数":[{"深度(m)": "100～620", "岩性": "-", "岩石热导率(W/(m·K))": 1.75, "层位": "-"}]},
    {"井号": "淀 6-1", "坐标":[ 116.108,  38.9522],"参数":[{"深度(m)": "70～1080", "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "留 13", "坐标":[ 116.0876,  38.2932],"参数":[{"深度(m)": "100～1800", "岩性": "-", "岩石热导率(W/(m·K))": 2, "层位": "-"}]},
    {"井号": "高 17", "坐标":[ 115.6812,  38.603],"参数":[{"深度(m)": "50～1764", "岩性": "-", "岩石热导率(W/(m·K))": 1.9, "层位": "-"}]},
    {"井号": "高 7", "坐标":[ 115.7405,  38.7423],"参数":[{"深度(m)": "70～1420", "岩性": "-", "岩石热导率(W/(m·K))": 1.78, "层位": "-"}]},
    {"井号": "任 47", "坐标":[ 116.0868,  38.6659],"参数":[{"深度(m)": "150～1810", "岩性": "-", "岩石热导率(W/(m·K))": 2.02, "层位": "-"}]},
    {"井号": "任 96", "坐标":[ 116.0562,  38.7376],"参数":[{"深度(m)": "40～1884.5", "岩性": "-", "岩石热导率(W/(m·K))": 1.98, "层位": "-"}]},
    {"井号": "霸 60", "坐标":[ 116.3211,  39.171],"参数":[{"深度(m)": "40～1600", "岩性": "-", "岩石热导率(W/(m·K))": 2.01, "层位": "-"}]},
    {"井号": "任 104", "坐标":[ 116.0757,  38.7019],"参数":[{"深度(m)": "120～2020", "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "泽深 1", "坐标":[ 115.4738,  38.0893],"参数":[{"深度(m)": "40～1900", "岩性": "-", "岩石热导率(W/(m·K))": 2.22, "层位": "-"}]},
    {"井号": "马 81", "坐标":[ 116.113,  38.3975],"参数":[{"深度(m)": "120～1604", "岩性": "-", "岩石热导率(W/(m·K))": 1.83, "层位": "-"}]},
    {"井号": "强 3", "坐标":[ 115.9433,  37.9992],"参数":[{"深度(m)": "20～1800", "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "岔 9", "坐标":[ 116.1768,  39.075],"参数":[{"深度(m)": "50～1550", "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "水 10", "坐标":[ 116.4903,  39.2902],"参数":[{"深度(m)": "50～1500", "岩性": "-", "岩石热导率(W/(m·K))": 2.08, "层位": "-"}]},
    {"井号": "虎 1", "坐标":[ 115.7083,  37.859],"参数":[{"深度(m)": "40～900", "岩性": "-", "岩石热导率(W/(m·K))": 1.86, "层位": "-"}]},
    {"井号": "岔 2", "坐标":[ 116.2395,  39.1401],"参数":[{"深度(m)": "50～1200", "岩性": "-", "岩石热导率(W/(m·K))": 1.82, "层位": "-"}]},
    {"井号": "淀 5", "坐标":[ 116.0554,  38.9156],"参数":[{"深度(m)": "80～1740", "岩性": "-", "岩石热导率(W/(m·K))": 2.68, "层位": "-"}]},
    {"井号": "马 40", "坐标":[ 116.0898,  38.5419],"参数":[{"深度(m)": "80～644", "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "高 23", "坐标":[ 115.7797,  38.5991],"参数":[{"深度(m)": "60～580", "岩性": "-", "岩石热导率(W/(m·K))": 1.87, "层位": "-"}]},
    {"井号": "高 4", "坐标":[ 115.684,  38.7027],"参数":[{"深度(m)": "50～1430", "岩性": "-", "岩石热导率(W/(m·K))": 1.87, "层位": "-"}]},
    {"井号": "观 3", "坐标":[ 116.0461,  38.6033],"参数":[{"深度(m)": "30～600", "岩性": "-", "岩石热导率(W/(m·K))": 2.07, "层位": "-"}]},
    {"井号": "观 5", "坐标":[ 116.0276,  38.6132],"参数":[{"深度(m)": "30～770", "岩性": "-", "岩石热导率(W/(m·K))": 2.18, "层位": "-"}]},
    {"井号": "束探 1H", "坐标":[ 115.2117,  37.8144],"参数":[{"深度(m)": 4006, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "极 4", "坐标":[ 114.8072,  38.0922],"参数":[{"深度(m)": 2100, "岩性": "-", "岩石热导率(W/(m·K))": 2.27, "层位": "-"}]},
    {"井号": "泽古 16", "坐标":[ 115.1924,  38.0771],"参数":[{"深度(m)": 3147, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "胜 1", "坐标":[ 116.7436,  39.0314],"参数":[{"深度(m)": 2224, "岩性": "-", "岩石热导率(W/(m·K))": 2.58, "层位": "-"}]},
    {"井号": "葛 5", "坐标":[ 116.8076,  39.1509],"参数":[{"深度(m)": 3249, "岩性": "-", "岩石热导率(W/(m·K))": 2.25, "层位": "-"}]},
    {"井号": "葛 8", "坐标":[ 116.8547,  39.1073],"参数":[{"深度(m)": 2777, "岩性": "-", "岩石热导率(W/(m·K))": 2.44, "层位": "-"}]},
    {"井号": "曹 10", "坐标":[ 116.5669,  39.4883],"参数":[{"深度(m)": 3908, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "务 16", "坐标":[ 116.7426,  39.5074],"参数":[{"深度(m)": 3638, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "路 30", "坐标":[ 116.0201,  38.0564],"参数":[{"深度(m)": 1740, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "泽古 10", "坐标":[ 115.5532,  38.1406],"参数":[{"深度(m)": 3875, "岩性": "-", "岩石热导率(W/(m·K))": 2.18, "层位": "-"}]},
    {"井号": "泽古 5", "坐标":[ 115.5733,  38.0874],"参数":[{"深度(m)": 3454, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "泽 96", "坐标":[ 115.3258,  37.9528],"参数":[{"深度(m)": 3717, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "泽 95", "坐标":[ 115.4833,  37.889],"参数":[{"深度(m)": 3101, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "泽古 18", "坐标":[ 115.3442,  38.0862],"参数":[{"深度(m)": 2899, "岩性": "-", "岩石热导率(W/(m·K))": 1.87, "层位": "-"}]},
    {"井号": "文 35", "坐标":[ 116.4309,  38.9207],"参数":[{"深度(m)": 2055, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "文 99", "坐标":[ 116.4216,  38.8342],"参数":[{"深度(m)": 1499, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "文 86", "坐标":[ 116.2897,  38.747],"参数":[{"深度(m)": 1914, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "西 5", "坐标":[ 116.2617,  38.6685],"参数":[{"深度(m)": 1661, "岩性": "-", "岩石热导率(W/(m·K))": 1.76, "层位": "-"}]},
    {"井号": "西 55", "坐标":[ 116.2698,  38.5759],"参数":[{"深度(m)": 1172, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "西 23", "坐标":[ 116.2377,  38.519],"参数":[{"深度(m)": 1666, "岩性": "-", "岩石热导率(W/(m·K))": 1.77, "层位": "-"}]},
    {"井号": "楚 17", "坐标":[ 115.7816,  38.1246],"参数":[{"深度(m)": 2720, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "宁 52", "坐标":[ 115.761,  38.4939],"参数":[{"深度(m)": 2870, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "高 23", "坐标":[ 115.7797,  38.5991],"参数":[{"深度(m)": 2880, "岩性": "-", "岩石热导率(W/(m·K))": 1.87, "层位": "-"}]},
    {"井号": "宁 41", "坐标":[ 115.9946,  39.5136],"参数":[{"深度(m)": 3477, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "西柳 8", "坐标":[ 115.9409,  38.5351],"参数":[{"深度(m)": 3483, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "宁 621", "坐标":[ 115.8822,  38.4772],"参数":[{"深度(m)": 2628, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "路 16", "坐标":[ 116.0029,  38.2781],"参数":[{"深度(m)": 1803, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "楚 37", "坐标":[ 115.9066,  38.1766],"参数":[{"深度(m)": 2799, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "强 44", "坐标":[ 115.9398,  38.0876],"参数":[{"深度(m)": 2594, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "榆 9", "坐标":[ 115.6756,  37.9945],"参数":[{"深度(m)": 3295, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "王 4", "坐标":[ 117.3429,  39.549],"参数":[{"深度(m)": 1950, "岩性": "-", "岩石热导率(W/(m·K))": 2.13, "层位": "-"}]},
    {"井号": "苏 50", "坐标":[ 116.7607,  39.299],"参数":[{"深度(m)": 5104, "岩性": "-", "岩石热导率(W/(m·K))": 2.13, "层位": "-"}]},
    {"井号": "高 20", "坐标":[ 115.8593,  38.7818],"参数":[{"深度(m)": 2599, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "鄚 25", "坐标":[ 116.0973,  38.8352],"参数":[{"深度(m)": 3389, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "衡探 1", "坐标":[ 115.5445,  37.9356],"参数":[{"深度(m)": 4433, "岩性": "-", "岩石热导率(W/(m·K))": 2.01, "层位": "-"}]},
    {"井号": "固 2", "坐标":[ 116.2868,  39.4251],"参数":[{"深度(m)": 2279, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "桐 7", "坐标":[ 116.6842,  39.6159],"参数":[{"深度(m)": 2178, "岩性": "-", "岩石热导率(W/(m·K))": 2.06, "层位": "-"}]},
    {"井号": "苏 1", "坐标":[ 116.5687,  39.0557],"参数":[{"深度(m)": 4175, "岩性": "-", "岩石热导率(W/(m·K))": 2.1, "层位": "-"}]},
    {"井号": "牛 28", "坐标":[ 116.3434,  39.2337],"参数":[{"深度(m)": 1366, "岩性": "-", "岩石热导率(W/(m·K))": 2.76, "层位": "-"}]},
    {"井号": "霸 95", "坐标":[ 116.4943,  39.182],"参数":[{"深度(m)": 2763, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "霸 34", "坐标":[ 116.455,  39.1985],"参数":[{"深度(m)": 2380, "岩性": "-", "岩石热导率(W/(m·K))": 1.77, "层位": "-"}]},
    {"井号": "雁 1", "坐标":[ 115.9658,  38.769],"参数":[{"深度(m)": 3065, "岩性": "-", "岩石热导率(W/(m·K))": 1.73, "层位": "-"}]},
    {"井号": "雁 50", "坐标":[ 115.9509,  38.8123],"参数":[{"深度(m)": 2723, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "雁 42", "坐标":[ 115.9612,  38.7612],"参数":[{"深度(m)": 3017, "岩性": "-", "岩石热导率(W/(m·K))": 1.73, "层位": "-"}]},
    {"井号": "淀 40", "坐标":[ 116.0175,  38.7193],"参数":[{"深度(m)": 3239, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "淀 35", "坐标":[ 115.8996,  38.7063],"参数":[{"深度(m)": 3229, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "淀 3", "坐标":[ 116.0113,  38.8251],"参数":[{"深度(m)": 3055, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "任 13", "坐标":[ 116.0718,  38.6342],"参数":[{"深度(m)": 3687, "岩性": "-", "岩石热导率(W/(m·K))": 2.06, "层位": "-"}]},
    {"井号": "任 879", "坐标":[ 116.1244,  38.7543],"参数":[{"深度(m)": 3001, "岩性": "-", "岩石热导率(W/(m·K))": 1.78, "层位": "-"}]},
    {"井号": "西柳 22", "坐标":[ 115.9061,  38.6488],"参数":[{"深度(m)": 3444, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "楚 105", "坐标":[ 115.8274,  38.1635],"参数":[{"深度(m)": 3098, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "强 103", "坐标":[ 115.8484,  38.0271],"参数":[{"深度(m)": 3197, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "容 2", "坐标":[ 115.9277,  38.9697],"参数":[{"深度(m)": 1469, "岩性": "-", "岩石热导率(W/(m·K))": 1.95, "层位": "-"}]},
    {"井号": "博 2", "坐标":[ 115.3176,  38.2638],"参数":[{"深度(m)": 2500, "岩性": "-", "岩石热导率(W/(m·K))": 1.93, "层位": "-"}]},
    {"井号": "泽 43", "坐标":[ 115.4982,  38.0078],"参数":[{"深度(m)": 3929, "岩性": "-", "岩石热导率(W/(m·K))": 1.82, "层位": "-"}]},
    {"井号": "虎 22", "坐标":[ 115.6234,  37.904],"参数":[{"深度(m)": 2519, "岩性": "-", "岩石热导率(W/(m·K))": 1.77, "层位": "-"}]},
    {"井号": "虎 20", "坐标":[ 115.6828,  37.9328],"参数":[{"深度(m)": 2895, "岩性": "-", "岩石热导率(W/(m·K))": 2.68, "层位": "-"}]},
    {"井号": "高 30", "坐标":[ 115.7384,  38.6825],"参数":[{"深度(m)": 2538, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "马 41", "坐标":[ 116.1439,  38.4657],"参数":[{"深度(m)": 2496, "岩性": "-", "岩石热导率(W/(m·K))": 1.9, "层位": "-"}]},
    {"井号": "马 12", "坐标":[ 116.062,  38.4196],"参数":[{"深度(m)": 2046, "岩性": "-", "岩石热导率(W/(m·K))": 1.87, "层位": "-"}]},
    {"井号": "马 2", "坐标":[ 116.2122,  38.6233],"参数":[{"深度(m)": 1900, "岩性": "-", "岩石热导率(W/(m·K))": 1.81, "层位": "-"}]},
    {"井号": "留 30", "坐标":[ 116.0287,  38.3437],"参数":[{"深度(m)": 3300, "岩性": "-", "岩石热导率(W/(m·K))": 1.74, "层位": "-"}]},
    {"井号": "留古 1", "坐标":[ 115.8855,  38.3368],"参数":[{"深度(m)": 4000, "岩性": "-", "岩石热导率(W/(m·K))": 1.86, "层位": "-"}]},
    {"井号": "家 23", "坐标":[ 116.1635,  38.9465],"参数":[{"深度(m)": 2995, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "赵 117", "坐标":[ 114.7515,  37.7019],"参数":[{"深度(m)": 3082, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "西柳 105", "坐标":[ 115.8742,  38.5986],"参数":[{"深度(m)": 3101, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "文安 1", "坐标":[ 116.3323,  38.9627],"参数":[{"深度(m)": 4176, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "苏 61", "坐标":[ 116.5033,  39.0472],"参数":[{"深度(m)": 3132, "岩性": "-", "岩石热导率(W/(m·K))": 1.76, "层位": "-"}]},
    {"井号": "赵 61", "坐标":[ 114.6833,  37.5925],"参数":[{"深度(m)": 2484, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "赵 36", "坐标":[ 114.8072,  37.6717],"参数":[{"深度(m)": 2317, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "强 52", "坐标":[ 115.85,  37.9825],"参数":[{"深度(m)": 2554, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "牛东 1", "坐标":[ 116.1996,  38.9832],"参数":[{"深度(m)": 5534, "岩性": "-", "岩石热导率(W/(m·K))": 1.85, "层位": "-"}]},
    {"井号": "宁 50", "坐标":[ 115.87,  38.3712],"参数":[{"深度(m)": 3128, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "家 101", "坐标":[ 116.2122,  38.9043],"参数":[{"深度(m)": 3337, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "泽古 9", "坐标":[ 115.5249,  37.9671],"参数":[{"深度(m)": 2320, "岩性": "-", "岩石热导率(W/(m·K))": 1.77, "层位": "-"}]},
    {"井号": "西 58", "坐标":[ 116.2009,  38.5532],"参数":[{"深度(m)": 2287, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "文古 3", "坐标":[ 116.2578,  38.85],"参数":[{"深度(m)": 3578, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "淀 25", "坐标":[ 116.0269,  38.7597],"参数":[{"深度(m)": 3278, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "西柳 6", "坐标":[ 115.8361,  38.5461],"参数":[{"深度(m)": 3102, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "强 62", "坐标":[ 1155.842,  38.0737],"参数":[{"深度(m)": 2881, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "苏 15", "坐标":[ 116.4719,  38.9571],"参数":[{"深度(m)": 2160, "岩性": "-", "岩石热导率(W/(m·K))": 1.85, "层位": "-"}]},
    {"井号": "高 55", "坐标":[ 115.9574,  38.7216],"参数":[{"深度(m)": 3133, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "苏 101", "坐标":[ 116.5202,  39.0122],"参数":[{"深度(m)": 2130, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "马 100", "坐标":[ 116.0942,  38.4872],"参数":[{"深度(m)": 3293, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "宁 68", "坐标":[ 115.8384,  38.3562],"参数":[{"深度(m)": 3318, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "宁 81", "坐标":[ 116.057,  38.4645],"参数":[{"深度(m)": 3647, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "文 108", "坐标":[ 116.4109,  38.8011],"参数":[{"深度(m)": 1477, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "淀 30", "坐标":[ 115.9158,  38.7588],"参数":[{"深度(m)": 2806, "岩性": "-", "岩石热导率(W/(m·K))": 1.72, "层位": "-"}]},
    {"井号": "高 3", "坐标":[ 115.6343,  38.622],"参数":[{"深度(m)": 2453, "岩性": "-", "岩石热导率(W/(m·K))": 1.83, "层位": "-"}]}
];
var temp_data1=[
    {name: "霸 8", value: 3.42},
    {name: "牛 28", value: 2.76},
    {name: "容 1", value: 2.73},
    {name: "淀 5", value: 2.68},
    {name: "虎 20", value: 2.68},
    {name: "胜 1", value: 2.58},
    {name: "葛 8", value: 2.44},
    {name: "淀 6", value: 2.34},
    {name: "极 4", value: 2.27},
    {name: "葛 5", value: 2.25},
    {name: "泽深 1", value: 2.22},
    {name: "观 5", value: 2.18},
    {name: "泽古 10", value: 2.18},
    {name: "王 4", value: 2.13},
    {name: "苏 50", value: 2.13},
    {name: "苏 1", value: 2.1},
    {name: "雄 101", value: 2.09},
    {name: "水 10", value: 2.08},
    {name: "观 3", value: 2.07},
    {name: "桐 7", value: 2.06},
    {name: "任 13", value: 2.06},
    {name: "任 47", value: 2.02},
    {name: "霸 60", value: 2.01},
    {name: "衡探 1", value: 2.01},
    {name: "留 13", value: 2},
    {name: "任 96", value: 1.98},
    {name: "容 2", value: 1.95},
    {name: "博 2", value: 1.93},
    {name: "高 17", value: 1.9},
    {name: "马 41", value: 1.9},
    {name: "高 23", value: 1.87},
    {name: "高 4", value: 1.87},
    {name: "泽古 18", value: 1.87},
    {name: "高 23", value: 1.87},
    {name: "马 12", value: 1.87},
    {name: "虎 1", value: 1.86},
    {name: "留古 1", value: 1.86},
    {name: "牛东 1", value: 1.85},
    {name: "苏 15", value: 1.85},
    {name: "马 81", value: 1.83},
    {name: "高 3", value: 1.83},
    {name: "岔 2", value: 1.82},
    {name: "泽 43", value: 1.82},
    {name: "马 2", value: 1.81},
    {name: "高 7", value: 1.78},
    {name: "任 879", value: 1.78},
    {name: "西 23", value: 1.77},
    {name: "霸 34", value: 1.77},
    {name: "虎 22", value: 1.77},
    {name: "泽古 9", value: 1.77},
    {name: "淀 6-3", value: 1.76},
    {name: "西 5", value: 1.76},
    {name: "苏 61", value: 1.76},
    {name: "牛 8-2", value: 1.75},
    {name: "雄 104", value: 1.74},
    {name: "留 30", value: 1.74},
    {name: "雁 1", value: 1.73},
    {name: "雁 42", value: 1.73},
    {name: "淀 6-1", value: 1.72},
    {name: "任 104", value: 1.72},
    {name: "强 3", value: 1.72},
    {name: "岔 9", value: 1.72},
    {name: "马 40", value: 1.72},
    {name: "束探 1H", value: 1.72},
    {name: "泽古 16", value: 1.72},
    {name: "曹 10", value: 1.72},
    {name: "务 16", value: 1.72},
    {name: "路 30", value: 1.72},
    {name: "泽古 5", value: 1.72},
    {name: "泽 96", value: 1.72},
    {name: "泽 95", value: 1.72},
    {name: "文 35", value: 1.72},
    {name: "文 99", value: 1.72},
    {name: "文 86", value: 1.72},
    {name: "西 55", value: 1.72},
    {name: "楚 17", value: 1.72},
    {name: "宁 52", value: 1.72},
    {name: "宁 41", value: 1.72},
    {name: "西柳 8", value: 1.72},
    {name: "宁 621", value: 1.72},
    {name: "路 16", value: 1.72},
    {name: "楚 37", value: 1.72},
    {name: "强 44", value: 1.72},
    {name: "榆 9", value: 1.72},
    {name: "高 20", value: 1.72},
    {name: "鄚 25", value: 1.72},
    {name: "固 2", value: 1.72},
    {name: "霸 95", value: 1.72},
    {name: "雁 50", value: 1.72},
    {name: "淀 40", value: 1.72},
    {name: "淀 35", value: 1.72},
    {name: "淀 3", value: 1.72},
    {name: "西柳 22", value: 1.72},
    {name: "楚 105", value: 1.72},
    {name: "强 103", value: 1.72},
    {name: "高 30", value: 1.72},
    {name: "家 23", value: 1.72},
    {name: "赵 117", value: 1.72},
    {name: "西柳 105", value: 1.72},
    {name: "文安 1", value: 1.72},
    {name: "赵 61", value: 1.72},
    {name: "赵 36", value: 1.72},
    {name: "强 52", value: 1.72},
    {name: "宁 50", value: 1.72},
    {name: "家 101", value: 1.72},
    {name: "西 58", value: 1.72},
    {name: "文古 3", value: 1.72},
    {name: "淀 25", value: 1.72},
    {name: "西柳 6", value: 1.72},
    {name: "强 62", value: 1.72},
    {name: "高 55", value: 1.72},
    {name: "苏 101", value: 1.72},
    {name: "马 100", value: 1.72},
    {name: "宁 68", value: 1.72},
    {name: "宁 81", value: 1.72},
    {name: "文 108", value: 1.72},
    {name: "淀 30", value: 1.72}
];

var max=3.42,min=1.72;

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
var option_data;
//更改option_data參數
function change_option_data(temp_data){
    option_data=convertData(temp_data);
}
//使用更改參數
change_option_data(temp_data1);
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
        center: [115.8384,38.3562],
        //缩放级别
        zoom:50,
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
        data: option_data,
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
            data: option_data,
        },
        {//前五个数据
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: option_data,
            symbolSize: function(val) {
                return val[2]*10;
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