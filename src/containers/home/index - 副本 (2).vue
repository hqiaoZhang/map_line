/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-06-08 21:31:55
* @Description: 首页入口组件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-04 15:02:06
*/

 <template>
  <div class="wdispatcher_home">
    <div class="map_container"
         :class="{is_full_screen: isFullScreen}">

      <div id="map"
           class="map"></div>
    </div>

  </div>
</template>
 
 <script>
import "./styles/index.scss";
import DigitRoll from "@/assets/plugin/digitroll.js";
import { mapGetters } from "vuex";

import { pathData } from "./lineData48.js";
const colors = [
  "#77E750",
  "#FFDF02",
  "#F67825",
  "#F93148",
  "#A4036E",
  "#F07825",
  "#E93048"
];

const colors2 = [
  "#d8ffca",
  "#fff6b6",
  "#ffcfb0",
  "#ffc8ce",
  "#ffccee",
  "#ffcfae",
  "#ffb9c2"
];

export default {
  data() {
    return {
      // marker层级关系:报警<--网格员 <--污染源
      map: null,
      zoom: 9,
      fitZoom: 13, // 图标最适合级别
      minZoom: 8,
      isShowDetail: false, // 是否显示弹层
      maxZoom: 20,
      isFullScreen: true // 是否全屏
    };
  },
  computed: mapGetters({
    cityId: "cityId",
    cityName: "cityName"
  }),
  mounted() {
    // 初始化地图
    this.initMap();
    // 加载基础控件
    this.loadBasicControl();
  },
  methods: {
    // 初始化地图
    initMap() {
      this.map = new AMap.Map("map", {
        zoom: this.zoom, //级别
        pitch: 65, // 地图俯仰角度，有效范围 0 度- 83 度 75
        viewMode: "3D", //使用3D视图
        // zooms: [this.minZoom, this.maxZoom], //设置地图级别范围 取值范围为 3 - 18
        mapStyle: "amap://styles/7cc31ad659bee16981b8598e9e2f0224" // 设置地图样式
      });

      this.setMapCenter();
    },
    // 初始化行政区
    initPro(code, dep) {
      let adCode = 130000;
      let depth = 2;
      let self = this;

      // 创建省份图层
      let disProvince;

      dep = typeof dep == "undefined" ? 2 : dep;
      adCode = code;
      depth = dep;

      disProvince && disProvince.setMap(null);

      disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [code],
        depth: dep,
        styles: {
          fill: "#7c91d4",
          "fill-opacity": "0.5",
          stroke: "red",
          "province-stroke": "cornflowerblue",
          "city-stroke": "white", // 中国地级市边界
          "county-stroke": "rgba(255,255,255,0.5)" // 中国区县边界
        }
      });

      disProvince.setMap(this.map);
    },

    // 切换地图
    setMapCenter() {
      this.initPro("510100");
      // 设置当前城市地图
      this.map.setCity(this.cityName, resLnglat => {
        this.map.setZoomAndCenter(this.zoom, [104.059, 30.576]);
        this.renderPath();
        // this.handleZoomOutMap()
      });
    },

    renderPath() {
      pathData.map((item, index) => {
        this.renderWalking(item, index);
      });
    },

    // 画轨迹线
    renderWalking(lines, index) {
      // let path = this.parseRouteToPath(route)

      let path = [];
      lines.map(item => {
        path.push(new AMap.LngLat(item[1], item[0]));
      });
      console.log('path', path)
      var object3Dlayer = new AMap.Object3DLayer();
      var numberOfPoints = 100;
      var minHeight = 20;
      // gps经纬度转高德
      // AMap.convertFrom(path, "gps", (status, result) => {
      //   if (result.info === "ok") {
     
      //     let lnglats = result.locations;
      //     for (let i = 0, len = lnglats.length; i < len; i++) {
            // this.routeLine = new AMap.Polyline({
            //   path: path,
            //   isOutline: true,
            //   outlineColor: colors[index],
            //   borderWeight: 1,
            //   strokeColor: colors2[index],
            //   strokeOpacity: 0.1,
            //   strokeWeight: 2,
            //   strokeStyle: "solid",
            //   lineJoin: 'round',
            //   lineCap: 'round',
            // });
            // this.routeLine.setMap(this.map);
           
            var meshLine = new AMap.Object3D.MeshLine({
              // path: path,
              path: computeBezier(path, numberOfPoints, minHeight),
               height: getEllipseHeight(numberOfPoints, 200000, minHeight),
              color: colors[index],
              width: 3
            });
            meshLine.transparent = true;
            object3Dlayer.add(meshLine);
            meshLine["backOrFront"] = "both";
            this.map.add(object3Dlayer);
          // }
          function pointOnCubicBezier(cp, t) {
            var ax, bx, cx;
            var ay, by, cy;
            var tSquared, tCubed;
          
            cx = 2.0 * (cp[1].lng - cp[0].lng);
            bx = 2.0 * (cp[2].lng - cp[1].lng) - cx;
            ax = cp[3].lng - cp[0].lng - cx - bx;

            cy = 2.0 * (cp[1].lat - cp[0].lat);
            by = 2.0 * (cp[2].lat - cp[1].lat) - cy;
            ay = cp[3].lat - cp[0].lat - cy - by;

            tSquared = t * t;
            tCubed = tSquared * t;

            var lng = ax * tCubed + bx * tSquared + cx * t + cp[0].lng;
            var lat = ay * tCubed + by * tSquared + cy * t + cp[0].lat;

            return new AMap.LngLat(lng, lat);
          }

          function computeBezier(points, numberOfPoints) {
            var dt;
            var i;
            var curve = [];
            dt = 1.0 / (numberOfPoints - 1);
            for (i = 0; i < numberOfPoints; i++) {
              curve[i] = pointOnCubicBezier(points, i * dt);
 
            }
            return curve;
          }

          function getEllipseHeight(count, maxHeight, minHeight) {
            var height = [];
            var radionUnit = Math.PI / 180;
            for (var i = 0; i < count; i++) {
              var radion = i * radionUnit;
              height.push(minHeight + Math.sin(radion) * maxHeight);
            }
            return height;
          }
        // } // if end

        // this.rendeMoveMarker(path)
      // });
    },

    rendeMoveMarker(path) {
      var icon = new AMap.Icon({
        size: [10, 5],
        image: "https://webapi.amap.com/images/car.png",
        imageSize: [10, 5]
      });
      var marker = new AMap.Marker({
        map: this.map,
        position: path[0],
        icon: icon,
        autoRotation: true,
        angle: -90,
        offset: new AMap.Pixel(0, 0)
      });
      marker.moveAlong(
        path.reverse(),
        200000,
        function(k) {
          return k;
        },
        true
      );
    },
    // 使用基础控件
    loadBasicControl() {
      // 添加 3D 罗盘控制
      this.map.plugin(["AMap.ControlBar"], () => {
        this.map.addControl(new AMap.ControlBar());
      });
      AMapUI.loadUI(["control/BasicControl"], BasicControl => {
        //添加一个缩放控件
        this.map.addControl(
          new BasicControl.Zoom({
            position: "rt"
          })
        );
      });
    }
  },
  watch: {
    cityName: "setMapCenter"
  }
};
</script>
 