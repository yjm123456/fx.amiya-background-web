import * as api from "./../../api/chat";
import { wsUrl } from "./../../http/baseUrl";
// 默认页面显示
let pageDisplay = true;
(function() {
    let hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
    let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    let onVisibilityChange = function() {
        if (!document[hiddenProperty]) {
            pageDisplay = true;
            // console.log("页面显示")
        } else {
            pageDisplay = false;
            // console.log("页面隐藏")
        }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
}())

function notifyMe(userMessage) {
    // 先检查浏览器是否支持
    if (!("Notification" in window)) {
        console.log("此浏览器不支持桌面通知");
    }
    // 检查用户是否同意接受通知
    else if (Notification.permission === "granted") {
        const notification = new Notification(`${userMessage.name}：`, {
            body: userMessage.content,
            icon: userMessage.img,
            requireInteraction: true
        });
        notification.onclick = function(event) {
            event.preventDefault();
            window.focus();
            notification.close();
        };
    }
    // 否则我们需要向用户获取权限
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            // 如果用户接受权限，就可以发起一条消息
            if (permission === "granted") {
                const notification = new Notification(`${userMessage.name}：`, {
                    body: userMessage.content,
                    icon: userMessage.img,
                    requireInteraction: true,
                });
                notification.onclick = function(event) {
                    event.preventDefault();
                    window.focus();
                    notification.close();
                };
            }
        });
    }
}

// 获取聊天用户列表
let getChatUserListParams = {
    pageNum: 1,
    pageSize: 20,
    chatlist: [],
    nextPage: true
};

// 获取用户编号获取聊天记录
let getChatRecordListParams = {
    pageNum: 1,
    pageSize: 20,
    chatRecordList: [],
    nextPage: true
};

const chat = {
    // 用于在全局引用此文中的方法时标识这一个的文件名
    namespaced: true,

    state: {
        // 输入的搜索值
        searchText: "",

        // 当前登录用户
        user: {
            name: "",
            img: "",
        },

        // 对话好友列表
        chatlist: [],

        //emoji表情
        emojis: [{
                file: "100.gif",
                code: "/::)",
                title: "[微笑]",
                reg: /\/::\)|\[微笑]/g,
            },
            {
                file: "101.gif",
                code: "/::~",
                title: "[伤心]",
                reg: /\/::~|\[伤心]/g
            },
            {
                file: "102.gif",
                code: "/::B",
                title: "[美女]",
                reg: /\/::B|\[美女]/g
            },
            {
                file: "103.gif",
                code: "/::|",
                title: "[发呆]",
                reg: /\/::\||\[发呆]/g,
            },
            {
                file: "104.gif",
                code: "/:8-)",
                title: "[墨镜]",
                reg: /\/:8-\)|\[墨镜]/g,
            },
            {
                file: "105.gif",
                code: "/::<",
                title: "[哭]",
                reg: /\/::<|\[哭]/g
            },
            {
                file: "106.gif",
                code: "/::$",
                title: "[羞]",
                reg: /\/::\$|\[羞]/g
            },
            {
                file: "107.gif",
                code: "/::X",
                title: "[哑]",
                reg: /\/::X|\[哑]/g
            },
            {
                file: "108.gif",
                code: "/::Z",
                title: "[睡]",
                reg: /\/::Z|\[睡]/g
            },
            {
                file: "109.gif",
                code: "/::'(",
                title: "[大哭]",
                reg: /\/::'\(|\[大哭]/g,
            },
            {
                file: "110.gif",
                code: "/::-|",
                title: "[囧]",
                reg: /\/::-\||\[囧]/g
            },
            {
                file: "111.gif",
                code: "/::@",
                title: "[怒]",
                reg: /\/::@|\[怒]/g
            },
            {
                file: "112.gif",
                code: "/::P",
                title: "[调皮]",
                reg: /\/::P|\[调皮]/g
            },
            {
                file: "113.gif",
                code: "/::D",
                title: "[笑]",
                reg: /\/::D|\[笑]/g
            },
            {
                file: "114.gif",
                code: "/::O",
                title: "[惊讶]",
                reg: /\/::O|\[惊讶]/g
            },
            {
                file: "115.gif",
                code: "/::(",
                title: "[难过]",
                reg: /\/::\(|\[难过]/g,
            },
            {
                file: "116.gif",
                code: "/::+",
                title: "[酷]",
                reg: /\/::\+|\[酷]/g
            },
            {
                file: "117.gif",
                code: "/:--b",
                title: "[汗]",
                reg: /\/:--b|\[汗]/g
            },
            {
                file: "118.gif",
                code: "/::Q",
                title: "[抓狂]",
                reg: /\/::Q|\[抓狂]/g
            },
            {
                file: "119.gif",
                code: "/::T",
                title: "[吐]",
                reg: /\/::T|\[吐]/g
            },
            {
                file: "120.gif",
                code: "/:,@P",
                title: "[偷笑]",
                reg: /\/:,@P|\[偷笑]/g,
            },
            {
                file: "121.gif",
                code: "/:,@-D",
                title: "[快乐]",
                reg: /\/:,@-D|\[快乐]/g,
            },
            {
                file: "122.gif",
                code: "/::d",
                title: "[奇]",
                reg: /\/::d|\[奇]/g
            },
            {
                file: "123.gif",
                code: "/:,@o",
                title: "[傲]",
                reg: /\/:,@o|\[傲]/g
            },
            {
                file: "124.gif",
                code: "/::g",
                title: "[饿]",
                reg: /\/::g|\[饿]/g
            },
            {
                file: "125.gif",
                code: "/:|-)",
                title: "[困]",
                reg: /\/:\|-\)|\[困]/g
            },
            {
                file: "126.gif",
                code: "/::!",
                title: "[恐怖]",
                reg: /\/::!|\[恐怖]/g
            },
            {
                file: "127.gif",
                code: "/::L",
                title: "[流汗]",
                reg: /\/::L|\[流汗]/g
            },
            {
                file: "128.gif",
                code: "/::>",
                title: "[高兴]",
                reg: /\/::>|\[高兴]/g
            },
            {
                file: "129.gif",
                code: "/::,@",
                title: "[闲]",
                reg: /\/::,@|\[闲]/g
            },
            {
                file: "130.gif",
                code: "/:,@f",
                title: "[努力]",
                reg: /\/:,@f|\[努力]/g,
            },
            {
                file: "131.gif",
                code: "/::-S",
                title: "[骂]",
                reg: /\/::-S|\[骂]/g
            },
            {
                file: "133.gif",
                code: "/:,@x",
                title: "[秘密]",
                reg: /\/:,@x|\[秘密]/g,
            },
            {
                file: "134.gif",
                code: "/:,@@",
                title: "[乱]",
                reg: /\/:,@@|\[乱]/g
            },
            {
                file: "135.gif",
                code: "/::8",
                title: "[疯]",
                reg: /\/::8|\[疯]/g
            },
            {
                file: "136.gif",
                code: "/:,@!",
                title: "[哀]",
                reg: /\/:,@!|\[哀]/g
            },
            {
                file: "137.gif",
                code: "/:!!!",
                title: "[鬼]",
                reg: /\/:!!!|\[鬼]/g
            },
            {
                file: "138.gif",
                code: "/:xx",
                title: "[打击]",
                reg: /\/:xx|\[打击]/g
            },
            {
                file: "139.gif",
                code: "/:bye",
                title: "[bye]",
                reg: /\/:bye|\[bye]/g
            },
            {
                file: "142.gif",
                code: "/:handclap",
                title: "[鼓掌]",
                reg: /\/:handclap|\[鼓掌]/g,
            },
            {
                file: "145.gif",
                code: "/:<@",
                title: "[什么]",
                reg: /\/:<@|\[什么]/g
            },
            {
                file: "147.gif",
                code: "/::-O",
                title: "[累]",
                reg: /\/::-O|\[累]/g
            },
            {
                file: "153.gif",
                code: "/:@x",
                title: "[吓]",
                reg: /\/:@x|\[吓]/g
            },
            {
                file: "155.gif",
                code: "/:pd",
                title: "[刀]",
                reg: /\/:pd|\[刀]/g
            },
            {
                file: "156.gif",
                code: "/:<W>",
                title: "[水果]",
                reg: /\/:<W>|\[水果]/g,
            },
            {
                file: "157.gif",
                code: "/:beer",
                title: "[酒]",
                reg: /\/:beer|\[酒]/g
            },
            {
                file: "158.gif",
                code: "/:basketb",
                title: "[篮球]",
                reg: /\/:basketb|\[篮球]/g,
            },
            {
                file: "159.gif",
                code: "/:oo",
                title: "[乒乓]",
                reg: /\/:oo|\[乒乓]/g
            },
            {
                file: "195.gif",
                code: "/:circle",
                title: "[跳舞]",
                reg: /\/:circle|\[跳舞]/g,
            },
            {
                file: "160.gif",
                code: "/:coffee",
                title: "[咖啡]",
                reg: /\/:coffee|\[咖啡]/g,
            },
        ],

        // 得知当前选择的是哪个对话
        selectId: null,

        // 推送消息
        imMessages: {},

        websocket: "",

        connectState: false,

        // 正在发送消息
        isSendMessage: false,
    },
    mutations: {
        // websocket初始化
        initWebsocket(state) {
            const token = sessionStorage.getItem("token");
            const url = `${wsUrl}/fximserver/fxwschat?token=${token}`;
            state.websocket = new WebSocket(url);
            // 建立连接
            state.websocket.onopen = function() {
                // console.log("聊天连接成功");
                state.connectState = true;
            };
            // 错误
            state.websocket.onerror = function() {
                // console.log("聊天连接错误");
            };
            // 接收服务端消息
            state.websocket.onmessage = function(e) {
                const {
                    Body,
                    Header
                } = JSON.parse(`${e.data}`);
                const result = state.chatlist.find((friend) => friend.id === Header.From.Id);
                // 不存在该客户
                if (!result) {
                    api.getUserInfo([Header.From.Id]).then((res) => {
                        if (res.code === 0) {
                            const { userList } = res.data;
                            const userMessage = {
                                name: userList[0].nickName ? userList[0].nickName : '未知用户',
                                img: userList[0].avatar ? userList[0].avatar : 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2048642745,1378977913&fm=26&gp=0.jpg',
                                content: Header.MsgType === "text" ? Body.Content : '图片',
                            }
                            pageDisplay || notifyMe(userMessage)
                            state.chatlist.unshift({
                                id: Header.From.Id,
                                unReadedCount: 1,
                                user: {
                                    name: userList[0].nickName ? userList[0].nickName : '未知用户',
                                    img: userList[0].avatar ? userList[0].avatar : 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2048642745,1378977913&fm=26&gp=0.jpg',
                                    encryptPhone: userList[0].encryptPhone
                                },
                                messages: [{
                                    content: Header.MsgType === "text" ? Body.Content : Body.ImageUrl,
                                    contentType: Header.MsgType,
                                    date: Header.Date,
                                    self: false,
                                }],
                            });
                        }
                    });
                    // 存在该客户
                } else {
                    const index = state.chatlist.findIndex((friend) => friend.id === result.id);
                    if (index !== -1) {
                        const userMessage = {
                            name: state.chatlist[index].user.name,
                            img: state.chatlist[index].user.img,
                            content: Header.MsgType === "text" ? Body.Content : '图片',
                        }
                        pageDisplay || notifyMe(userMessage)
                            // 当前客户已经置顶，追加消息即可
                        if (index === 0) {
                            // 是否选中当前客户，如果选中unReadedCount设置为0，未选中unReadedCount+1
                            if (state.chatlist[index].id === state.selectId) {
                                state.chatlist[index].unReadedCount = 0;
                            } else {
                                state.chatlist[index].unReadedCount += 1;
                            }
                            state.chatlist[index].messages.push({
                                content: Header.MsgType === "text" ? Body.Content : Body.ImageUrl,
                                contentType: Header.MsgType,
                                date: Header.Date,
                                self: false,
                            });
                            // 当前客户没有置顶，删除客户并置顶
                        } else {
                            const [friend] = state.chatlist.splice(index, 1);
                            // 是否选中当前客户，如果选中unReadedCount设置为0，未选中unReadedCount+1
                            if (friend.id === state.selectId) {
                                friend.unReadedCount = 0;
                            } else {
                                friend.unReadedCount += 1;
                            }
                            friend.messages.push({
                                content: Header.MsgType === "text" ? Body.Content : Body.ImageUrl,
                                contentType: Header.MsgType,
                                date: Header.Date,
                                self: false,
                            });
                            state.chatlist.unshift(friend);
                        }
                    }
                }
            };
            // 监听关闭
            state.websocket.onclose = function() {
                // console.log("聊天已经关闭");
                state.connectState = false;
            };
        },

        //关闭WebSocket连接
        closeWebSocket(state) {
            state.websocket.close();
        },

        setChatUserList(state, chatlist) {
            state.chatlist = chatlist;
        },

        // 获取搜索值
        search(state, value) {
            state.searchText = value;
        },

        setChatRecordList(state, { chatRecordList, userId }) {
            // 当前选中客户
            state.selectId = userId;
            // 设置聊天记录
            state.chatlist.forEach((session) => {
                if (session.id === state.selectId) {
                    session.unReadedCount = 0;
                    session.messages = chatRecordList;
                }
            });
        },

        // 发送信息
        sendMessage(state, msg) {
            if (msg.contentType === "text") {
                state.websocket.send(
                    JSON.stringify({
                        // 客户id
                        ToUserName: state.selectId,
                        // 客服id
                        FromUserName: sessionStorage.getItem("employeeId"),
                        // 消息类型
                        MsgType: msg.contentType,
                        // 文本
                        Content: msg.content,
                    })
                );
            }

            if (msg.contentType === "image") {
                state.websocket.send(
                    JSON.stringify({
                        // 客户id
                        ToUserName: state.selectId,
                        // 客服id
                        FromUserName: sessionStorage.getItem("employeeId"),
                        // 消息类型
                        MsgType: msg.contentType,
                        // 图片
                        ImageUrl: msg.content,
                    })
                );
            }

            const result = state.chatlist.find((session) => session.id === state.selectId);
            result.messages.push({
                content: msg.content,
                contentType: msg.contentType,
                date: new Date(),
                self: true,
            });
            state.isSendMessage = true;
        },

        resetIsSendMessage(state) {
            state.isSendMessage = false;
        },

        resetSelectId(state) {
            state.selectId = null;
        },

        resetGetChatUserListParams(state) {
            getChatUserListParams = {
                pageNum: 1,
                pageSize: 20,
                chatlist: [],
                nextPage: true
            }
            state.selectId = null;
        },

        resetGetChatRecordListParams() {
            getChatRecordListParams = {
                pageNum: 1,
                pageSize: 20,
                chatRecordList: [],
                nextPage: true
            };
        }
    },
    actions: {
        // 获取聊天用户列表
        getChatUserList({ commit, state }) {
            if (!getChatUserListParams.nextPage) {
                return new Promise(resolve => {
                    resolve(false)
                })
            }
            const data = {
                employeeId: sessionStorage.getItem("employeeId"),
                pageNum: getChatUserListParams.pageNum,
                pageSize: getChatUserListParams.pageSize,
                // 1=阿美雅员工,2=医院雅员工
                type: sessionStorage.getItem("employeeType") === 'amiyaEmployee' ? 1 : 2
            };
            return api.getChatUserList(data).then((res) => {
                const { list, totalCount } = res.data.chatUserList;
                const userIds = [];
                list.forEach(item => {
                        userIds.push(item.userId);
                    })
                    // 通过用户id获取用户信息并设置
                return api.getUserInfo(userIds).then((userInfo) => {
                    if (userInfo.code === 0) {
                        const { userList } = userInfo.data;
                        list.forEach((item) => {
                            userList.forEach((i) => {
                                if (item.userId === i.userId) {
                                    item.user = {
                                        name: i.nickName ? i.nickName : '未知用户',
                                        img: i.avatar ? i.avatar : 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2048642745,1378977913&fm=26&gp=0.jpg',
                                        encryptPhone: i.encryptPhone
                                    };
                                }
                            });
                        });
                        const chatlist = list.map((item) => {
                            return {
                                // 用户id
                                id: item.userId,
                                // 用户信息
                                user: item.user,
                                // 用户未读条数
                                unReadedCount: item.unReadedCount,
                                // 用户聊天记录
                                messages: [{
                                    content: item.chatContent,
                                    contentType: item.msgType,
                                    date: item.date
                                }],
                            };
                        });
                        getChatUserListParams.chatlist = [...getChatUserListParams.chatlist, ...chatlist]
                        getChatUserListParams.pageNum++;
                        return new Promise((resolve) => {
                            commit("setChatUserList", getChatUserListParams.chatlist);
                            if (state.chatlist.length === totalCount) {
                                getChatUserListParams.nextPage = false;
                            }
                            resolve(getChatUserListParams.nextPage)
                        })
                    }
                });
            });
        },

        // 搜索聊天用户
        search: ({ commit }, value) => {
            setTimeout(() => {
                commit("search", value);
            }, 100);
        },

        // 根据用户编号获取聊天记录
        getChatRecordList({ commit, state }, userId) {
            const data = {
                userId: userId,
                pageNum: getChatRecordListParams.pageNum,
                pageSize: getChatRecordListParams.pageSize,
                // 1=阿美雅员工,2=医院雅员工
                type: sessionStorage.getItem("employeeType") === 'amiyaEmployee' ? 1 : 2
            };
            return api.getChatRecordList(data).then((res) => {
                if (res.code === 0) {
                    const { list, totalCount } = res.data.chatRecordList;
                    const messages = list.map((item) => {
                        return {
                            content: item.content,
                            contentType: item.msgType,
                            date: item.date,
                            self: item.sender === 0 ? false : true,
                        };
                    });
                    getChatRecordListParams.chatRecordList = [...messages, ...getChatRecordListParams.chatRecordList, ]
                    getChatRecordListParams.pageNum++;
                    return new Promise((resolve) => {
                        commit("setChatRecordList", {
                            chatRecordList: getChatRecordListParams.chatRecordList,
                            userId: userId
                        });
                        const session = state.chatlist.find((session) => session.id === state.selectId)
                        if (session.messages.length === totalCount) {
                            getChatRecordListParams.nextPage = false;
                        }
                        resolve(getChatRecordListParams.nextPage)
                    })
                }
            });
        },

        sendMessage: ({
            commit
        }, msg) => commit("sendMessage", msg),

        resetIsSendMessage: ({
            commit
        }) => commit("resetIsSendMessage"),

        resetSelectId: ({
            commit
        }) => commit("resetSelectId"),

        resetGetChatUserListParams: ({
            commit
        }) => commit("resetGetChatUserListParams"),

        resetGetChatRecordListParams: ({
            commit
        }) => commit("resetGetChatRecordListParams")
    },
    getters: {
        // 筛选出含有搜索值的聊天列表
        searchedChatlist(state) {
            let sessions = state.chatlist.filter((sessions) => sessions.user.name.includes(state.searchText));
            return sessions;
        },

        // 通过当前选择是哪个对话匹配相应的对话
        selectedChat(state) {
            let session = state.chatlist.find((session) => session.id === state.selectId);
            return session;
        },

        // 监听发送信息
        messages(state) {
            let session = state.chatlist.find((session) => session.id === state.selectId);
            return session.messages;
        },

        // 是否正在发送消息
        isSendMessage(state) {
            return state.isSendMessage;
        },
    },
};
export default chat;