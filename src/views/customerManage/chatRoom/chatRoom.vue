<template>
    <div>
        <Input
            v-model="nick"
            style="width: 220px; margin-right: 10px"
            placeholder="请输入名字"
        />
        <Input
            v-model="keyword"
            style="width: 220px; margin-right: 10px"
            placeholder="请输入发送内容"
        />
        <Button type="primary" @click="submite">发送</Button>
    </div>
</template>
<script>
const wx = new WebSocket("ws://8.142.171.247:5000/ws")
export default {
    data(){
        return{
            nick:"",
            keyword:""
        }
    },
    methods:{
        submite(){
            console.log(wx.readyState)
            var msg = {
                    action: 'join',
                    msg: this.keyword,
                    nick: this.nick
                };
                console.log(msg)
                wx.send(JSON.stringify(msg));
        },
        getChatData(){
            // 创建websocket
            // 监听连接
            wx.onopen = () =>{
                this.$Message.success('连接成功')
            }
            // 监听异常
            wx.onerror = (error) =>{
                this.$Message.error('连接失败',error)
            }
            // 监听关闭
            wx.onclose= () =>{
                this.$Message.error('连接已关闭')
            }
            // 监听数据
            wx.onmessage = (msg) =>{
                console.log('后端返回的数据=>',msg)
            }
        },
       
    },
    created(){
        this.getChatData()
    },
}
</script>