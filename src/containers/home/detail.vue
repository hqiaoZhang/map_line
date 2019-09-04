/*
* @Author: xiexiaoying
* @Date: 2019-04-10 10:40:00
* @Email: 634021337@qq.com
* @Description: 网格事件详情
* @Last Modified by: xiexiaoying
* @Last Modified time:
*/

<template>
  <div class="detail">
    <!-- 头部 -->
    <!-- <header class="flex">
      <div class="flex1">XX网格</div>
      <div class="close">
        ╳
      </div>
    </header> -->
    <div class="continer">
      <!-- 左边块 -->
      <section class="left_layout">
          <div id="delMap" class="detail_map"></div>
          <div class="right_top_control">
          <i class="refresh_icon" title="刷新" ></i>
        </div>
        <footer>
          <div class="head_img">
            <img src="/static/images/face.png">
          </div>
          <div>
            <p>曾洪 1850123xxxx</p>
            <p class="addr">幸福区 安居街道</p>
          </div>
          <div></div>
          <!-- <div>
            <ul>
              <li><img src="./images/home_source_fold2x.png"></li>
              <li>任务一</li>
              <li class="active">任务二</li>
              <li>任务三</li>
              <li>任务四</li>
              <li>任务五</li>
              <li>任务六</li>
              <li><img src="./images/home_source_fold2x.png"></li>
            </ul>
          </div> -->
        </footer>
      </section>
      <!--  右边块 -->
      <section class="right_layout">
        <h3>事件反馈</h3>
        <div class="pad list">
          <section class="item flex"
                   v-for="(event, index) in eventList"
                   :key="index">
            <!-- 图标状态 -->
            <div class="status">
              <div class="icon"
                   :class="{problem: event.type == 2}">
                <span v-if="event.type == 1">没有<br />问题</span>
                <span v-if="event.type == 2">存在<br />问题</span>
              </div>
              <div class="line"
                   v-show="index != eventList.length - 1"></div>
            </div>
            <div class="flex1 info_wrapper">
              <div class="flex">
                <div class="flex1">{{event.time}}</div>
                <div class="name">{{event.name}}</div>
              </div>
              <div class="flex desc"
                   :class="{active: event.show}"
                   @click="handleShowDesc(event, index)">
                <div class="flex1">
                  <p class="title" v-html="event.title" /> 
                  <p class="content" v-html="event.content"></p>
                </div>
                <div class="img_wrapper"><img :src="event.image" /> <span>更多</span></div>
              </div>
              <el-collapse-transition>
                <p class="remark"
                  v-show="event.show" v-html="'详细描述：' + event.content"></p>
              </el-collapse-transition>
            </div>
          </section>
        </div>
      </section>
    </div>
  
  </div>
</template>


<script>
import "./styles/detail.scss";
import { fetch } from "@/util/request";
export default {
  data() {
    return {
      eventList: [],
      map: null,
      zoom: 18,
      fitZoom: 12.6,
      userMarks: [],
      userMarksIds: [],
      activeId: '',
      activeImte: {},
    };
  },
  props: {
    cityName: String,
    zoomStyleMapping: Object,
    
  },
  mounted() {
    this.initMap();
    this.requestEventList();
  },
  methods: {
     // 查询事件列表
    requestEventList() {
      fetch("fetchEventList", null, data => {
        this.eventList = data;
        data.map(item => {
          if(item.type == 2) {
            this.addUserFaceMarker(item)
            this.userMarksIds.push(item.id)
          }
        })
        // 添加网格员
        this.addGridUserMarker()
      });
    },
    
    initMap(el) {
      this.map = new AMap.Map("delMap", {
        // skyColor: '#29396a', // 调整天空颜色
        center: [104.15900003089999,30.620814691900006],
        pitch: 65, // 地图俯仰角度，有效范围 0 度- 83 度 75
        zoom: this.zoom, //级别
        defaultCursor: "default",
        viewMode: "3D", //使用3D视图
        // zooms: [this.minZoom, this.maxZoom], //设置地图级别范围 取值范围为 3 - 18
        mapStyle: "amap://styles/7cc31ad659bee16981b8598e9e2f0224" // 设置地图样式
      });
      this.loadBasicControl()
      this.renderLines()
      this.map.on('click', (p) => {
        console.log(p.lnglat.R + ',' + p.lnglat.P)
      })
    },
    // 使用基础控件
    loadBasicControl() {
      AMapUI.loadUI(["control/BasicControl"], BasicControl => {
        //添加一个缩放控件
        this.map.addControl(
          new BasicControl.Zoom({
            position: "rt"
          })
        );
      });
    },
    // 添加网格员
    addGridUserMarker() {
      // let markerBg = new AMap.ElasticMarker({
      //   position: [104.15888286352163,30.620964578368245],
      //   cursor: "default",
      //   map: this.map,
      //   styles: [
      //     {
      //       icon: {
      //         img: "/static/images/p1.png",
      //         size: [14, 10], //  可见区域大小
      //         imageSize: [14, 10], // 图片本身大小
      //         ancher: [7, 5], //锚点
      //         maxScale: 1,
      //         minScale: 0.5,
      //         fitZoom: this.fitZoom //最合适的级别
      //       }
      //     }
      //   ],
      //   zoomStyleMapping: this.zoomStyleMapping
      // }); 
       
      let marker = new AMap.ElasticMarker({
         map: this.map,
        position: [104.15888286352163,30.620964578368245],
        cursor: "default",
        // zIndex: 109,
        styles: [
          {
            icon: {
              img: "/static/images/people2.png",
              size: [44, 43], //  可见区域大小
              imageSize: [44, 43], // 图片本身大小
              ancher: [22, 43], //锚点
              maxScale: 1,
              minScale: 0.5,
              fitZoom: this.fitZoom //最合适的级别
            }
          }
        ],
        zoomStyleMapping: this.zoomStyleMapping
      });

      let arrow = new AMap.ElasticMarker({
         map: this.map,
          position: [104.15858613073823,30.620808184646805],
          cursor: "default",
          styles: [
            {
              icon: {
                img: "/static/images/arrow.png",
                size: [32, 32], //  可见区域大小
                imageSize: [32, 32], // 图片本身大小
                ancher: [12, 24], //锚点
                maxScale: 1,
                minScale: 0.5,
                fitZoom: this.fitZoom //最合适的级别
              }
            }
          ],
        zoomStyleMapping: this.zoomStyleMapping
      });
    },
    /**
     * 添加用户头像
     * @param {Object} item 当前marker数据
     */
    addUserFaceMarker(item) {
      let resLnglat = [item.lng, item.lat];
      let userFace = new AMap.ElasticMarker({
        position: resLnglat,
        map: this.map,
        zIndex: 104,
        cursor: "default",
        styles: [
          {
            icon: {
              img: item.image,
              size: [50, 50], //  可见区域大小
              imageSize: [50, 50], // 图片本身大小
              ancher: [25, 35], //锚点
              maxScale: 1,
              minScale: 0.5,
              fitZoom: this.fitZoom  //最合适的级别
            }
          }
        ],
        zoomStyleMapping: this.zoomStyleMapping
      });
      this.userMarks.push(userFace)
    },
    
    // 画线路
    renderLines() {
      let lines = [
        [104.16279353901746,30.624694329656975],
        [104.162539575398,30.62427456012528],
        [104.1626041857898,30.62401315346664],
        [104.16066829606893,30.62264740988051],
        [104.16090058073405,30.62228843069941],
        [104.16095138043164,30.621277122985628],
        [104.16091075703503,30.62105568259594],
        [104.1597643701732,30.62108644496812],
        [104.1595238739252,30.621045054543192],
        [104.15947624459864,30.62013495352001],
        [104.15945178955792,30.62102878065974],
        [104.1589914983511,30.620980496801277],
        [104.15886863037946,30.622014798096664],
        [104.15888286352163,30.620964578368245],
        [104.15830117553475,30.62078716146761]
      ]
      
      let path = []
      lines.map(item => {
        path.push(new AMap.LngLat(item[0], item[1]))
      })
     
      let routeLine = new AMap.Polyline({
          path: path,
          isOutline: false,
          outlineColor: '#ADB2C0',
          strokeColor: '#ADB2C0',
          strokeStyle: 'dashed',
          //  strokeDasharray: [2, 10],
          strokeWeight: 6,
          lineJoin: 'round',
          lineCap: 'round',
          map: this.map
      })
      // 首次添加起点终点
      this.renderstartMarker(path)
      //  // 第二条线
      let lines2 = [
        [104.15888286352163,30.620964578368245],
        [104.15830117553475,30.62078716146761]
      ]
      let path2 = []
      lines2.map(item => {
        path2.push(new AMap.LngLat(item[0], item[1]))
      })

      let routeLine2 = new AMap.Polyline({
          path: path2,
          isOutline: false,
          outlineColor:'#F93148',
          strokeColor: '#F93148',
          strokeStyle: 'dashed',
          //  strokeDasharray: [2, 10],
          strokeWeight: 6,
          lineJoin: 'round',
          lineCap: 'round',
          map: this.map,
      })
      this.renderendMarker(path2)
    },
    // 结束点
    renderendMarker(path) {
       // 结束点
      let endMarker = new AMap.ElasticMarker({
           position: path[path.length - 1],
            map: this.map,
            cursor: "default",
            styles: [
              {
                icon: {
                  img: "/static/images/oval1@2x.png",
                  size: [24, 20], //  可见区域大小
                  imageSize: [24, 20], // 图片本身大小
                  ancher: [12, 15], //锚点
                  maxScale: 0.8,
                  minScale: 0.5,
                  fitZoom: this.fitZoom  //最合适的级别
                }
              }
            ],
          zoomStyleMapping: this.zoomStyleMapping
        });
        // 添加大头针
      let pinMarker = new AMap.ElasticMarker({
         map: this.map,
        position: path[path.length - 1],
        cursor: "default",
        styles: [
          {
            icon: {
              img: "/static/images/pin.png",
              size: [24, 120], //  可见区域大小
              imageSize: [24, 48], // 图片本身大小
              imageOffset: [0, -10],
              ancher: [12, 60], //锚点
              maxScale: 0.7,
              minScale: 0.5,
              fitZoom: this.fitZoom  //最合适的级别
            }
          }
        ],
        zoomStyleMapping: this.zoomStyleMapping
      });
    },
    renderstartMarker(path) {
      // 开始点
      let startMarker = new AMap.ElasticMarker({
          position: path[0],
          map: this.map,
          cursor: "default",
          styles: [
          {
            icon: {
              img: "/static/images/oval1@2x.png",
              size: [24, 20], //  可见区域大小
              imageSize: [24, 20], // 图片本身大小
              ancher: [12, 9], //锚点
              maxScale: 0.8,
              minScale: 0.5,
              fitZoom: this.fitZoom  //最合适的级别
            }
          }
        ],
          zoomStyleMapping: this.zoomStyleMapping
      });
    },
    // 点击描述
    handleShowDesc(item, index) {
       
       this.activeImte = item
      // 隐藏除当前条的全部
        this.eventList.map((item, i) => {
          if(index != i) {
             this.$set(item, 'show', false)
          }
        }) 
      item.show = !item.show;
    }
  },
  watch: {
    activeImte() {
      this.userMarksIds.map((id, index) => {
       
        if(id == this.activeImte.id) {
          this.map.remove(this.userMarks[index])
          this.addUserFaceMarker(this.activeImte)
        }
      })
    }
  }
};
</script>
