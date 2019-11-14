import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
        UrlPort:"/api",
        // 导入订单历史跳转到对应的数据源的时候带过去的批次号
        picihao:'',
        // 导入历史传参，什么的导入历史
        daoruHistory:'',
        // 线上地址
        xianshang:'',
        //查看收发存明细
        SFCmingxi:'',
        //a刷新路由
        routerShow:0,
    },
    mutations: {
        increment(state) {
            state.count++
        },
        //鼠标拖拽改变大小,全局通用方法
        
        //页面使用：
        /*
            div结构：
             <div id="div2">
                 <!--  -->
                 <div id="content">
                      存放内容区域
                 </div>
                 <div id="right" style="display: none"></div>
                 <div id="div1" style="display: none"></div>
                 <div id="bottom"></div>
             </div>

            js结构：传入对应的di
            this.$store.commit("changeSize",{wai:'div2',rightBottom:'div1',right:'right',bottom:'bottom',content:'content'});
        */
        changeSize(state,json){
            var oDiv = document.getElementById(json.rightBottom);
            var oDiv2 = document.getElementById(json.wai);
            var right = document.getElementById(json.right);
            var bottom = document.getElementById(json.bottom);
            var content = document.getElementById(json.content);
            $('#'+json.content).css({
                'height':'100%',
                'overflow':'auto',
            })
            $('#'+json.right).css({
                'width':'4px',
                'height':'100%',
                'background':'#c6c6c6',
                'float':'right',
                'position':'absolute',
                'right':'0',
                'top':'0',
                'cursor':'e-resize',
                'overflow':'hidden',
                'opacity':'0.4',
                'z-index':'1',
            })
            $('#'+json.bottom).css({
			    'width':'100%',
			    'height':'4px',
			    'background':'#c6c6c6',
			    'position':'absolute',
			    'left':'0',
			    'bottom':'0',
			    'cursor':'n-resize',
			    'overflow':'hidden',
			    'opacity':'0.4',
			    'z-index':'1',
            })
            $('#'+json.rightBottom).css({
			    'width':'6px',
			    'height':'6px',
			    'background':'#c6c6c6',
			    'position':'absolute',
			    'right':'0px',
			    'bottom':'0px',
			    'cursor':'nw-resize',
			    'overflow':'hidden',
			    'font-size':'12px',
			    'text-align':'center',
			    'color':'#FFFFFF',
			    'float':'right',
			    'z-index':'3',
            })
            $('#'+json.wai).css({
    			'position':'relative',
                // 'height':'500px',
                'min-height': '40px',
                'min-width': '40px',
                'display': 'inline-block',
                'width': '100%',
                'padding-bottom':'20px',
            })
            var mouseStart = {};
            var divStart = {};
            var rightStart = {};
            var bottomStart = {};
            //往右拽
            right.onmousedown = function(ev) {
                var oEvent = ev || event;
                mouseStart.x = oEvent.clientX;
                mouseStart.y = oEvent.clientY;
                rightStart.x = right.offsetLeft;
                if (right.setCapture) {
                    right.onmousemove = doDrag1;
                    right.onmouseup = stopDrag1;
                    right.setCapture();
                } else {
                    document.addEventListener("mousemove", doDrag1, true);
                    document.addEventListener("mouseup", stopDrag1, true);
                }
            };
            function doDrag1(ev) {
                var oEvent = ev || event;
                var l = oEvent.clientX - mouseStart.x + rightStart.x;
                var w = l + oDiv.offsetWidth;

                if (w < oDiv.offsetWidth) {
                    w = oDiv.offsetWidth;
                } else if (w > document.documentElement.clientWidth - oDiv2.offsetLeft) {
                    w = document.documentElement.clientWidth - oDiv2.offsetLeft - 2;
                }
                oDiv2.style.width = w + "px";
            };
            function stopDrag1() {
                if (right.releaseCapture) {
                    right.onmousemove = null;
                    right.onmouseup = null;
                    right.releaseCapture();
                } else {
                    document.removeEventListener("mousemove", doDrag1, true);
                    document.removeEventListener("mouseup", stopDrag1, true);
                }
            };
            //往下拽
            bottom.onmousedown = function(ev) {
                var oEvent = ev || event;
                mouseStart.x = oEvent.clientX;
                mouseStart.y = oEvent.clientY;
                bottomStart.y = bottom.offsetTop;
                if (bottom.setCapture) {
                    bottom.onmousemove = doDrag2;
                    bottom.onmouseup = stopDrag2;
                    bottom.setCapture();
                } else {
                    document.addEventListener("mousemove", doDrag2, true);
                    document.addEventListener("mouseup", stopDrag2, true);
                }
            };
            function doDrag2(ev) {
                var oEvent = ev || event;
                var t = oEvent.clientY - mouseStart.y + bottomStart.y;
                var h = t + oDiv.offsetHeight;

                if (h < oDiv.offsetHeight) {
                    h = oDiv.offsetHeight;
                } else if (h > document.documentElement.clientHeight - oDiv2.offsetTop) {
                    h = document.documentElement.clientHeight - oDiv2.offsetTop - 2;
                }

                oDiv2.style.height = h + "px";
            };
            function stopDrag2() {
                if (bottom.releaseCapture) {
                    bottom.onmousemove = null;
                    bottom.onmouseup = null;
                    bottom.releaseCapture();
                } else {
                    document.removeEventListener("mousemove", doDrag2, true);
                    document.removeEventListener("mouseup", stopDrag2, true);
                }
            };
            //往左右同时拽
            oDiv.onmousedown = function(ev) {
                var oEvent = ev || event;
                mouseStart.x = oEvent.clientX;
                mouseStart.y = oEvent.clientY;
                divStart.x = oDiv.offsetLeft;
                divStart.y = oDiv.offsetTop;
                if (oDiv.setCapture) {
                    oDiv.onmousemove = doDrag;
                    oDiv.onmouseup = stopDrag;
                    oDiv.setCapture();
                } else {
                    document.addEventListener("mousemove", doDrag, true);
                    document.addEventListener("mouseup", stopDrag, true);
                }
            };
            function doDrag(ev) {
                var oEvent = ev || event;
                var l = oEvent.clientX - mouseStart.x + divStart.x;
                var t = oEvent.clientY - mouseStart.y + divStart.y;

                var w = l + oDiv.offsetWidth;
                var h = t + oDiv.offsetHeight;

                if (w < oDiv.offsetWidth) {
                    w = oDiv.offsetWidth;
                } else if (w > document.documentElement.clientWidth - oDiv2.offsetLeft) {
                    w = document.documentElement.clientWidth - oDiv2.offsetLeft - 2;
                }
                if (h < oDiv.offsetHeight) {
                    h = oDiv.offsetHeight;
                } else if (h > document.documentElement.clientHeight - oDiv2.offsetTop) {
                    h = document.documentElement.clientHeight - oDiv2.offsetTop - 2;
                }

                oDiv2.style.width = w + "px";
                oDiv2.style.height = h + "px";
            };
            function stopDrag() {
                if (oDiv.releaseCapture) {
                    oDiv.onmousemove = null;
                    oDiv.onmouseup = null;
                    oDiv.releaseCapture();
                } else {
                    document.removeEventListener("mousemove", doDrag, true);
                    document.removeEventListener("mouseup", stopDrag, true);
                }
            };
            function doDrag3(ev) {
                var oEvent = ev || event;
                var l = oEvent.clientX - mouseStart.x + divStart.x;
                var t = oEvent.clientY - mouseStart.y + divStart.y;
                if (l < 0) {
                    l = 0;
                } else if (l > document.documentElement.clientWidth - oDiv2.offsetWidth) {
                    l = document.documentElement.clientWidth - oDiv2.offsetWidth;
                }
                if (t < 0) {
                    t = 0;
                } else if (t > document.documentElement.clientHeight - oDiv2.offsetHeight) {
                    t = document.documentElement.clientHeight - oDiv2.offsetHeight;
                }
                oDiv2.style.left = l + "px";
                oDiv2.style.top = t + "px";
            };

        }
    }
})

export default store
