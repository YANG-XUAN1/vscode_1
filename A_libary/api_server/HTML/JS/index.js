$(function () {
    $('#input').on('mouseover', function () {
        $('#input').css("color", "red")
    });

    $('#input').on('mouseout', function () {
        $('#input').css("color", "black")
    })

    var map = new AMap.Map('container', {
        // resizeEnable:true,
        zoom: 10,
        center: [114.347428, 30.509923],
        feature: ['bg', 'road'],
        viewMode: '3D', // 开启 3D 模式
        pitch: 55,
        rotation: 35,
        // mapstyle:'amap://styles/2a663db8a864d8b13001bcbb79db8500'
        mapStyle: 'amap://styles/normal'
    })

    var trafficMap = new AMap.TileLayer.Traffic('container', {  //实时路况
        zIndex: 10
    })
    map.add(trafficMap)

    $('#background').on('change', () => {
        var $bg = $('#background')
        if ($bg.val() == '标准') {
            map.setMapStyle('amap://styles/normal')
        }
        else if ($bg.val() == '远山黛') {
            map.setMapStyle('amap://styles/whitesmoke')
        }
        else if ($bg.val() == '极夜蓝') {
            map.setMapStyle('amap://styles/darkblue')
        }
        else if ($bg.val() == '涂鸦') {
            map.setMapStyle('amap://styles/graffiti')
        }
        else if ($bg.val() == '月光银') {
            map.setMapStyle('amap://styles/light')
        }
    })


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
                for (var i = 0; i < 10; i++) {
                    let marker = new AMap.Marker({
                        map: map,
                        // icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                        position: [res.data[i]['x'], res.data[i]['y']],
                        offset: new AMap.Pixel(-13, -30),
                    });
                    markers.push(marker)
                    // marker.setMap(map)


                    marker.count = res.data[i]['count']
                    marker.name = res.data[i]['name']
                    marker.adname = res.data[i]['adname']
                    marker.x = res.data[i]['x']
                    marker.y = res.data[i]['y']
                    marker.on('mouseover', (res) => {
                        infoWindow.setContent(
                            "<ul class='main'><li> ID: <span style='color:blue'>" + res.target.count + "</span></li>"
                            + "<li>  隔离场所名 : <span style='color:blue'>" + res.target.name + "  </span></li>"
                            + "<li>  经度 : <span style='color:blue'>" + res.target.x + "  </span></li>"
                            + "<li>  纬度 : <span style='color:blue'>" + res.target.y + "  </span></li>"
                            + "<li>  详细信息 : <span style='color:blue'>" + res.target.adname + "  </span></li></ul>");
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

    $('#loginBtn').on('click', () => {
        // alert('ok')
        location.href = './login.html'
    })

    //判断浏览区是否支持canvas
    // function isSupportCanvas() {
    //     var elem = document.createElement('canvas');
    //     return !!(elem.getContext && elem.getContext('2d'));
    // }
})