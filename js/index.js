$(function () {
    // 得到数据
    var heatmapData;
    $.getScript('../../../LayuiMini//LayuiMini//js/book.js', data => {
        heatmapData = data
    })


    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 10,
        center: [114.347428, 30.509923],
        feature: ['bg', 'road'],
        viewMode: '2D', // 开启 3D 模式
        pitch: 0,  //地图倾斜角度   查看参考手册
        // rotation: 0,
        mapStyle: 'amap://styles/normal'
    });

    //判断浏览区是否支持canvas
    if (!isSupportCanvas()) {
        alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
    }

    // 加载各种控件
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.ControlBar'],
        function () {
            map.addControl(new AMap.ToolBar())
            map.addControl(new AMap.Scale())
            map.addControl(new AMap.ControlBar());
        })


    //展示/隐藏热力图
    var heatmap;
    map.plugin(["AMap.HeatMap"], function () {
        //初始化heatmap对象
        heatmap = new AMap.HeatMap(map, {
            radius: 25, //给定半径
            opacity: [0, 0.8]
        });
        //设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
            data: heatmapData,
            // max: 100
            max: 2
        });
    });

    console.log(heatmapData)
    console.log(heatmap)


    //实时路况
    var trafficMap = new AMap.TileLayer.Traffic('container', {
        zIndex: 10
    })
    map.add(trafficMap)

    var isVisible = true
    $('#viewRoad').on('click', () => {
        if (isVisible == true) {
            trafficMap.hide();
            isVisible = false;
        } else {
            trafficMap.show();
            isVisible = true;
        }
    })

    var markers = []
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8080/database/pois',
        headers: { 'Accept': 'application/json', 'Authorization': localStorage.getItem('token') },
        success: (res) => {
            $('#showLab').on('click', () => {
                for (var i = 0; i < 1000; i++) {
                    let marker = new AMap.Marker({
                        map: map,
                        // icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                        position: [res.data[i]['longitude'], res.data[i]['latitude']],
                        offset: new AMap.Pixel(-13, -30),
                    });
                    markers.push(marker)

                    marker.id = res.data[i]['id']
                    marker.name = res.data[i]['name']
                    marker.address = res.data[i]['address']
                    marker.longitude = res.data[i]['longitude']
                    marker.latitude = res.data[i]['latitude']
                    marker.introduce = res.data[i]['introduce']
                    marker.room = res.data[i]['room']
                    marker.on('mouseover', (res) => {
                        infoWindow.setContent(
                            "<ul class='main'><li> ID: <span style='color:blue'>" + res.target.id + "</span></li>"
                            + "<li>  隔离场所名 : <span style='color:blue'>" + res.target.name + "  </span></li>"
                            + "<li>  经度 : <span style='color:blue'>" + res.target.longitude + "  </span></li>"
                            + "<li>  纬度 : <span style='color:blue'>" + res.target.latitude + "  </span></li>"
                            + "<li>  详细信息 : <span style='color:blue'>" + res.target.address + "  </span></li></ul>"
                            + "<li>  介绍 : <span style='color:blue'>" + res.target.introduce + "  </span></li>"
                            + "<li>  空房间数 : <span style='color:blue'>" + res.target.room + "  </span></li></ul>");
                        infoWindow.open(map, res.lnglat);
                    });
                    marker.on('mouseout', (res) => {
                        infoWindow.close(map, res.lnglat)
                    });
                }
            })

            var infoWindow = new AMap.InfoWindow({
                isCustom: true,
                draggable: true,  //是否可拖动
                offset: new AMap.Pixel(0, -31),
                content: ""
            });
        }
    })

    $('#removeLab').on('click', () => {
        map.remove(markers)
    })

    //判断浏览区是否支持canvas
    function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }




    // 测试数据
    var data = [{ "ID": '0001', 'name': '武汉左邻商务宾馆', 'area': '武昌区', 'bed': '34', 'log': '114.301074', 'lat': '30.533111', 'meg': '面向所有人', },
    { "ID": '0002', 'name': '如家酒店(武汉黄鹤楼昙华林粮道街店)', 'area': '武昌区', 'bed': '25', 'log': '114.309591', 'lat': '30.547346	', 'meg': '面向所有人', },
    { "ID": '0003', 'name': '武汉锦绣宾馆', 'area': '江汉区', 'bed': '33', 'log': '114.252537', 'lat': '30.62365', 'meg': '面向所有人', },
    { "ID": '0004', 'name': '武汉凯莱假日酒店', 'area': '洪山区', 'bed': '45', 'log': '114.398147	', 'lat': '30.500495', 'meg': '面向所有人', },
    ]
    // 查询按钮点击 在搜索框下方显示
    // 实际代码中根据搜索框关键字 返回筛选的信息进行如下操作
    // 方便后期删除数据
    var markers = []
    $(".input-search").on('click', function () {

        document.getElementById('panel').style.display = 'block';
        var marker;
        for (var i = 0; i < data.length; i++) { //for-begin
            // 在搜索弹出列表 中生成每个点的信息 
            var list_a = $("<a id='list'><div>ID：" + data[i].ID + "</div>"
                + "<div>隔离场所名：" + data[i].name + "</div>"
                + "<div>所属区：" + data[i].area + "</div>"
                + "<div>床位：" + data[i].bed + "</div>"
                + "<div>经度：" + data[i].log + "</div>"
                + "<div>纬度：" + data[i].lat + "</div>"
                + "<div>详细信息：" + data[i].meg + "</div></a>")
            $("#panel").append(list_a);


            // 实现多点标注marker的动态信息窗体显示
            var jfong = [data[i].log, data[i].lat];
            marker = new AMap.Marker({
                position: jfong,
                zIndex: 101,
                map: map,
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
                // icon:'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            });

            // 方便后期删除数据
            markers[i] = marker
            marker.setMap(map);
            marker.ID = data[i].ID;
            marker.name = data[i].name;
            marker.area = data[i].area;
            marker.bed = data[i].bed;
            marker.log = data[i].log;
            marker.lat = data[i].lat;
            marker.meg = data[i].meg;
            marker.on('mouseover', function (e) {
                // alert("你好")
                infoWindow.setContent("<ul class='main'><li> ID： <span style='color:blue'>" + e.target.ID + "</span></li>"
                    + "<li>  隔离场所名 : <span style='color:blue'>" + e.target.name + "  </span></li>"
                    + "<li>  所属区 : <span style='color:blue'>" + e.target.area + "  </span></li>"
                    + "<li>  床位 : <span style='color:blue'>" + e.target.bed + "  </span></li>"
                    + "<li>  经度 : <span style='color:blue'>" + e.target.log + "  </span></li>"
                    + "<li>  纬度 : <span style='color:blue'>" + e.target.lat + "  </span></li>"
                    + "<li>  详细信息 : <span style='color:blue'>" + e.target.meg + "  </span></li></ul>");//// e.target表示被点击的目标
                infoWindow.open(map, e.lnglat);
            });
            marker.on('mouseout', function (e) {
                infoWindow.close(map, e.lnglat);
            })

            // 鼠标点击事件,设置地图中心点及放大显示级别   新增！！！
            marker.on('click', function (e) {
                //map.setCenter(e.target.getPosition());
                map.setZoomAndCenter(15, e.target.getPosition());
                // marker.setIcon('http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png');
                // 不管点击那个点 都是最后一个图标变化

                var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            })

            // map.on('click',function(e){
            //     map.remove([marker])
            //     marker = new AMap.Marker({
            //         icon:'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            //         position:[e.lnglat.lng,e.lnglat.lat],
            //         offset:new AMap.Pixel(-10,-20)
            //     });
            //     map.add([marker]);
            // })
        } //for-end
        var infoWindow = new AMap.InfoWindow({
            isCustom: true,
            draggable: true,  //是否可拖动
            offset: new AMap.Pixel(0, -31),
            content: ""
        });
        // 获取列表点击时候 移到对应点
        // 这个a指的是列表的a
        $(document).ready(function () {
            var num
            $("a").mouseover(function () {
                // alert($(this).html())
                var array = new Array();//声明一个新的数组
                var all = $(this).children().each(function (index, element) {//遍历每个对象
                    array.push($(this).html());//往数组中存入值
                })
                num = array[0].substr(3)
                // 循环判断点击的列表序号 对应的点标记
                for (var i = 0; i < data.length; i++) {
                    // alert(markers[i].ID==num)
                    if (markers[i].ID == num) {
                        markers[i].setIcon('http://webapi.amap.com/theme/v1.3/markers/n/mark_r' + (i + 1) + '.png')
                        // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',  默认的蓝色
                    }
                }
                // var zoom =  20; //zoom大小 无法修改
                // map.panTo([x,y]);  //改变中心点位置
                // 点击时 移动到点标记
                $("a").click(function () {
                    if (markers[i].ID == num) {
                        e = markers[i]
                        // 点击时 放大地图 有待实现
                        map.setZoomAndCenter(15, e.target.getPosition());
                    }
                })
            })


            // 移出时全部变回蓝色
            $("a").mouseout(function () {
                for (var i = 0; i < data.length; i++) {
                    // alert(markers[i].ID==num)
                    markers[i].setIcon('https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png')
                }
            })
        })
    })
    $(".close_list").on('click', function () {
        document.getElementById('panel').style.display = 'none';
        map.remove(markers);
        $("#panel a").remove();
    })
})