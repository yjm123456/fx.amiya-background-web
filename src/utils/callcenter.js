const Events = require("./events");
const handlerMap = {};

function CallCenter() {
    this.event = new Events();
    this.ws = null;
    this.isConnected = false;
    this.userInfo = null;

    /**
     * 拨打电话
     * calloutData结构为：
     * {CallableID:'',CallOutPhoneNumber:'13549789',InLineCode:null,IsRedirectCall:false}
     */
    this.callOut = function(calloutData) {
        if (this.isConnected) {
            let callOutMessage = { ID: this.uuid(), Header: 2, Body: {} };
            callOutMessage.Body = calloutData;
            let jsonString = JSON.stringify(callOutMessage);
            this.ws.send(jsonString);
        } else {
            throw '未连接到呼叫组件！';
        }
    }

    this.uuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * 连接呼叫组件
     */
    this.connect = function(userInfo) {
        this.userInfo = userInfo;
        this.ws = new WebSocket('ws://127.0.0.1:8888/ws');
        // 建立连接
        this.ws.onopen = () => {
                this.isConnected = true;
                registerUserInfo.call(this, this.userInfo);
                getCallables.call(this);
                // console.log("电话连接成功");
            }
            // 错误
        this.ws.onerror = function() {
            // console.log("电话连接错误");
        };
        // 接收服务端消息
        this.ws.onmessage = (message) => {
            //接收到数据的处理方法
            const { data } = message;
            let result = JSON.parse(data);
            handlerMap[result.Header].call(this, result);
        };
        // 监听关闭
        this.ws.onclose = () => {
            this.isConnected = false;
            handlerMap.onClose.call(this);
            // console.log("呼叫组件关闭");
        };
    }

    /**
     * 挂断电话
     *hangOnData 结构 {CallableID:''}
     */
    this.hangOn = function(hangOnData) {
        if (this.isConnected) {
            let hangOnMessage = { ID: this.uuid(), Header: 4, Body: {} };
            hangOnMessage.Body = hangOnData;
            let jsonString = JSON.stringify(hangOnMessage);
            this.ws.send(jsonString);
            // console.log('挂断电话消息发送成功！');
        } else {
            throw '未连接到呼叫组件！';
        }
    }

    /**
     * 设置默认设备
     * 结构 {CallableID:''}
     */
    this.setDefaultCallable = function(callable) {
        if (this.isConnected) {
            let defaultCallableMessage = { ID: this.uuid(), Header: 6, Body: {} };
            defaultCallableMessage.Body = callable;
            let jsonString = JSON.stringify(defaultCallableMessage);
            this.ws.send(jsonString);
            // console.log('设置默认设备消息发送成功！');
        } else {
            throw '未连接到呼叫组件！';
        }
    }

    /**
     * 选择设备
     * 结构 {CallableID:''}
     */
    this.changeSelectedCallable = function(callable) {
        if (this.isConnected) {
            let changeSelectedCallableMessage = { ID: this.uuid(), Header: 5, Body: {} };
            changeSelectedCallableMessage.Body = callable;
            let jsonString = JSON.stringify(changeSelectedCallableMessage);
            this.ws.send(jsonString);
            // console.log('选择设备消息发送成功！');
        } else {
            throw '未连接到呼叫组件！';
        }
    }

    /**
     * 关闭与呼叫组件的通讯
     */
    this.close = function() {
        if (this.isConnected) {
            this.ws.close();
            // console.log('关闭消息发送成功！');
        } else {
            throw '未连接到呼叫组件！';
        }
    }

    /**
     * 接听
     */
    this.answer = function(answerData) {
        if (this.isConnected) {
            let answerMessage = { ID: this.uuid(), Header: 9, Body: {} };
            answerMessage.Body = answerData;
            let jsonString = JSON.stringify(answerMessage);
            this.ws.send(jsonString);
            // console.log('接听电话消息发送成功！');
        } else {
            throw '未连接到呼叫组件！';
        }
    }
}

// 注册服务信息
function registerUserInfo(userInfo) {
    if (this.isConnected) {
        let authMessage = { ID: this.uuid(), Header: 0, Body: {} };
        authMessage.Body = userInfo;
        let jsonString = JSON.stringify(authMessage);
        this.ws.send(jsonString);
        // console.log('用户信息发送成功！');
    } else {
        throw '未连接到呼叫组件！';
    }
}

// 请求通话设备列表
function getCallables() {
    if (this.isConnected) {
        let requestCallableListMessage = { ID: this.uuid(), Header: 1, Body: {} };
        let jsonString = JSON.stringify(requestCallableListMessage);
        this.ws.send(jsonString);
        // console.log('请求通话设备列表消息发送成功！');
    } else {
        throw '未连接到呼叫组件！';
    }
}

function handleConfirmCode(data) {
    // console.log(`处理确认消息...${data.ID}`);
    this.event.dispatchEvent('confirm');
}

function handleExceptionCode(data) {
    // console.log(data.Body)
    // console.log(`触发异常事件...${data.Body.ExceptionString}`);
    this.event.dispatchEvent('exception', data.Body.ExceptionString);
}

function handleCallableComponentInfo(data) {
    // console.log(JSON.stringify(data))
    // console.log(`触发呼叫组件信息事件...${data.Body}`);
    this.event.dispatchEvent('callableComponentInfo', data.Body);
}

function handleCallableStatusChanged(data) {
    // console.log(`触发设备状态改变事件...${data.Body}`);
    this.event.dispatchEvent('callableStatusChanged', data.Body);
}

function handleVoiceCardLineHookStateChanged(data) {
    // console.log(`触发固话设备摘挂机状态改变事件...${data.Body}`);
    this.event.dispatchEvent('voiceCardLineHookStateChanged', data.Body);
}

function handleDefaultCallableChanged(data) {
    // console.log(`触发默认设备改变事件...${data.Body}`);
    this.event.dispatchEvent('defaultCallableChanged', data.Body);
}

function handleSelectedCallableChanged(data) {
    // console.log(`触发当前设备改变事件...${data.Body}`);
    this.event.dispatchEvent('selectedC allableChanged', data.Body);
}

function handleTelComing(data) {
    // console.log("触发来电事件")
    this.event.dispatchEvent('telComing', data.Body);
}

function callSuccessConfirm(data) {
    // console.log("呼叫成功")
    this.event.dispatchEvent('callSuccessConfirm', data.Body);
}

function onClose() {
    this.event.dispatchEvent('onClose');
}

handlerMap[0] = handleConfirmCode;
handlerMap[1] = handleExceptionCode;
handlerMap[2] = handleCallableComponentInfo;
handlerMap[3] = handleCallableStatusChanged;
handlerMap[4] = handleVoiceCardLineHookStateChanged;
handlerMap[5] = handleDefaultCallableChanged;
handlerMap[6] = handleSelectedCallableChanged;
handlerMap[7] = handleTelComing;
handlerMap[8] = callSuccessConfirm;
handlerMap.onClose = onClose;
module.exports = CallCenter