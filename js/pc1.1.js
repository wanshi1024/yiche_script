document.write(`
<script src="https://wanshi1024.github.io/ws_lib/js_util/jquery.min.js"></script>
<script src="https://wanshi1024.github.io/ws_lib/js_util/vue.min.js"></script>
<link rel="stylesheet" href="https://wanshi1024.github.io/yiche_script/iviewer/iviewer.min.css">
<script src="https://wanshi1024.github.io/yiche_script/iviewer/iviewer.min.js"></script>

<style>
    body {
        background: #DFE6C7;
    }
    
    .show-cout {
        padding-bottom: 20px;
        font-size: 14px;
        color: #606266;
        overflow: hidden;
        border-top: 1px solid #ebeef5;
        font-weight: 700;
        padding: 15px;
    }
    /*top*/
    
    .top {
        background-color: #f4f7fa;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #dfe1e6;
    }
    
    .top ._1 p:last-child {
        font-size: 12px;
        font-weight: normal;
    }
    
    .top ._3 p:last-child {
        color: rgb(204, 0, 0);
    }
    
    .top>span {
        margin-right: 4em;
        background: #DFE6C7;
        cursor: pointer;
    }
    
    .btn {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }
    
    .delete_btn {
        color: #fff;
        background-color: #f56c6c !important;
    }
    
    .yijiajing_btn {
        color: #fff;
        background-color: #a3d9ab !important;
    }
    /*middle*/
    
    .middle {
        display: flex;
        justify-content: start;
    }
    
    .middle>* {
        font-weight: normal;
        font-size: 14px;
        color: #606266;
    }
    
    .middle ._1 {
        background: white;
        cursor: pointer;
    }
    
    .middle ._2 {
        margin-left: 5em;
    }
    /*buttom*/
    
    .bottom {
        display: flex;
        flex-wrap: wrap;
    }
    
    .bottom img {
        width: 150px;
        height: 100px;
        margin: 5px 10px;
        border: 1px rgb(241, 239, 239) dashed;
        cursor: zoom-in;
    }
    
    .bottom img:hover {
        border: 1px red dashed;
    }
    /****/
    
    .oper>p>span {
        margin: 3em;
        font-weight: normal;
    }
    /****/
    
    .find {
        position: fixed;
        top: 20%;
        right: 0;
    }
    
    .find>div {
        width: 70px;
        height: 50px;
        background: #19be6b;
        line-height: 50px;
        color: white;
        margin-top: 10px;
        cursor: pointer;
        text-align: center;
        opacity: 0.3;
    }
    
    .tip {
        text-align: center;
    }
    /******/
    
    .delete_select {
        position: fixed;
        left: 40%;
        top: 20%;
        background: white;
        width: 230px;
        height: 400px;
        padding-left: 20px;
    }
    
    .delete_select label {
        cursor: pointer;
    }
    
    .delete_select label:hover {
        color: #409eff;
    }
    
    .delete_select label>input {
        margin: 10px 0;
    }
    
    .delete_select>p:last-child>span {}
    
    .delete_select>p:last-child>span:last-child {
        color: #fff;
        background-color: #409eff;
    }
    /***/
</style>
<div id="app_wanshi">
    <div class="tip" v-if="shouConts.length == 0">无数据,请点击查询</div>
    <div class="show-cout" v-if="shouConts.length>0" v-for="(showCont,sc_index) in shouConts">
        <div class="top">
            <div class="_1">
                <p>{{showCont.carInfo.masterBrandName}} {{showCont.carInfo.carBaseInfos.carYear}}款 {{showCont.carInfo.carBaseInfos.carName}}</p>
                <p>{{showCont.topicInfo.title}}</p>
            </div>
            <div class="_2">{{showCont.carInfo.serialName}}</div>
            <div class="_3">
                <p>{{showCont.user.showname}}({{showCont.user.uid}})</p>
                <p>{{showCont.topicInfo.level != 0 ? ('账号等级'+showCont.topicInfo.level):'' }}</p>
            </div>
            <!-- isDigest 0未加精 1 已加精 -->
            <span class="btn" v-if="showCont.topicInfo.deleteStatus==0">已删除</span>
            <span class="btn yijiajing_btn" v-else-if="showCont.topicInfo.isDigest==1" @click="cancelJiaJing(showCont)">已加精</span>
            <span class="btn delete_btn" v-else-if="showCont.topicInfo.deleteStatus==1" @click="deleteDianPingBefore(showCont)">删除</span>
        </div>
        <div class="middle">
            <div class="_1" @click="copyId(showCont.topicInfo.id)">
                点评ID: {{showCont.topicInfo.id}}
            </div>
            <div class="_2">
                发表时间:{{showCont.topicInfo.createTime}}
            </div>
        </div>
        <div class="bottom" :id="'ws' + sc_index">
            <img v-for="src in showCont.topicInfo.picList.split(',')" :data-original="imgBaseURL + src" :src="imgBaseURL + src" @click="showImg('ws' + sc_index)">
        </div>
        <div class="oper">
            <p>
                <span>操作人: {{showCont.operInfo[0].operUserName}}</span>
                <span>操作时间: {{showCont.operInfo[0].operTime}}</span>
                <span>操作内容: {{showCont.operInfo[0].operContent}}</span>
            </p>
        </div>
    </div>

    <div class="find">
        <div class="findAll" @click="findAll">
            查询全部
        </div>
        <div class="findJiaJing" @click="findJiaJing">
            查询加精
        </div>
        <div class="returnTop" @click="returnTop">
            返回顶部
        </div>
    </div>
    <div class="delete_select" v-if="deleteBoxIsShow">
        <p>删除原因 {{ds_value}}</p>
        <div v-for="(ds,index) in deleteSelect">
            <label :for="'r' + index">
                <input type="radio" v-model="ds_value" name="delete_select" :value="ds"  :id="'r' + index" >
                {{ds}}
            </label>
        </div>
        <p>
            <span class="btn" title="取消关闭模态框" @click="deleteBoxIsShow=false">取消</span>
            <span class="btn" title="确认删除点评" @click="deleteDianPing()">确定</span>
        </p>
    </div>
</div>
<script>
    const BaseURL = 'http://ms.yiche.com/koubeiapi/api/admin/getAllTopicListByMoreCondition'
    new Vue({
        el: '#app_wanshi',
        data() {
            return {
                shouConts: [],
                imgBaseURL: 'http://image.bitautoimg.com/koubei/pics/',
                deleteSelect: ['图片质量问题', '文字质量问题', '点评内容重复', '车款信息错误', '购车信息错误', '账号问题', '其它问题'],
                deleteBoxIsShow: false,
                userData: localStorage.getItem('userData'),
                ds_value: '点评内容重复',
                findType: 0
            }
        },
        created() {
            // deleteStatus: 0 已删  1未删
            // topicType: 0 普通 1 加精
        },

        methods: {
            getShowConts(serialId, trimId, topicType) {
                let url = BaseURL + '?serialId=' + serialId + '&trimId=' + trimId + '&pageSize=20&isHavePic=1'
                if (topicType != undefined || topicType != null) {
                    url += "&topicType=" + topicType
                }
                $.get(url, res => this.shouConts = res.data.result)
            },
            findAll() {
                this.findType = 1;
                let serialId = localStorage.getItem('serialId');
                let trimId = localStorage.getItem('trimId')
                this.getShowConts(serialId, trimId)
                // this.getShowConts(2273, 135818)F
            },
            findJiaJing() {
                this.findType = 2;
                let serialId = localStorage.getItem('serialId');
                let trimId = localStorage.getItem('trimId')
                this.getShowConts(serialId, trimId, 1)
            },
            copyId(id) {
                copy(id)
            },
            returnTop() {
                scrollTo(0, 0);
            },
            showImg(id) {
                new Viewer(document.querySelector('#' + id), {
                    url: 'data-original'
                })
            },
            deleteDianPingBefore(showCont) {
                this.deleteBoxIsShow = true;
                localStorage.setItem('showCont', JSON.stringify(showCont))
                    // console.log(JSON.parse(localStorage.getItem('showCont')));
            },
            deleteDianPing() {
                let showCont = JSON.parse(localStorage.getItem('showCont'));
                let userData = JSON.parse(this.userData);
                // console.log(userData.user);
                let obj = {
                        operReason: this.ds_value,
                        operUserId: userData.user.userId, // wb_zhangdd 8224
                        operUserName: userData.user.userName,
                        //{{showCont.carInfo.masterBrandName}} {{showCont.carInfo.carBaseInfos.carYear}}款 {{showCont.carInfo.carBaseInfos.carName}}
                        //奔驰 2021款E 260 L 运动型
                        title: showCont.carInfo.masterBrandName + ' ' + showCont.carInfo.carBaseInfos.carYear + showCont.carInfo.carBaseInfos.carName,
                        topicId: showCont.topicInfo.id,
                        uid: showCont.user.uid
                    }
                    // console.log(obj);
                $.post("http://ms.yiche.com/koubeiapi/api/admin/delete", obj,
                    (data, textStatus, jqXHR) => {
                        promptBox(data.message)
                        console.log(data);
                        this.deleteBoxIsShow = false;
                        if (this.findType == 1) this.findAll()
                        else if (this.findType == 2) this.findJiaJing()
                    }
                );
            },
            cancelJiaJing(showCont) {
                console.log(showCont);
                let userData = JSON.parse(this.userData);
                let obj = {
                    digestType: 0,
                    operUserId: userData.user.userId,
                    operUserName: userData.user.userName,
                    title: showCont.carInfo.masterBrandName + ' ' + showCont.carInfo.carBaseInfos.carYear + showCont.carInfo.carBaseInfos.carName,
                    topicId: showCont.topicInfo.id,
                    uid: showCont.user.uid
                }
                $.post("http://ms.yiche.com/koubeiapi/api/admin/digest", obj,
                    (data, textStatus, jqXHR) => {
                        promptBox("取消加精" + data.message)
                            // console.log(data);
                        if (this.findType == 1) this.findAll()
                        else if (this.findType == 2) this.findJiaJing()
                    }
                );
            }

        },

    })

    function copy(value) {
        console.log(value);
        var currentFocus = document.activeElement;
        let input = document.createElement('input');
        document.body.appendChild(input);
        input.style.opacity = 0;
        input.value = value;
        let scrollY = window.scrollY;
        input.focus();
        input.setSelectionRange(0, input.value.length);
        var res = document.execCommand('copy', true);
        currentFocus.focus();
        document.body.removeChild(input);
        window.scrollTo(0, scrollY);
        promptBox('复制成功')
        return res;
    }

    function promptBox(str) {
        let pb = document.createElement('div');
        pb.innerHTML = str;
        let cssObj = {
            position: 'fixed',
            left: '50%',
            top: '0%',
            border: '1px solid #EBEEF5',
            padding: '15px 15px 15px 20px',
            background: '#f0f9eb',
            color: '#67C23A',
            opacity: 0,
            transition: 'all 1s'
        };
        for (let key in cssObj) {
            pb.style[key] = cssObj[key];
        }
        pb.id = 'ws';
        document.body.append(pb);
        setTimeout(() => {
            pb.style.top = '10%';
            pb.style.opacity = 1;
            setTimeout(() => {
                pb.remove()
            }, 2000);
        }, 50);

    }
    /*************************************/
</script>
`)