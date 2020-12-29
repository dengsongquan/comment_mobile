
// const prov = 'http://10.100.234.19:9999/evaluate'// 远程主机 开发

// 本地
// const prov = "http://172.30.94.172:8088/evaluate"  // 测试本地环境
// const wss = 'ws://172.30.94.172:8088/evaluate' // websocket测试
// const img = 'http://172.30.94.172:8088/evaluate' // 头像测试

// const prov = "http://127.0.0.1:8088/evaluate"  // 测试本地环境
// const wss = 'ws://127.0.0.1:8088/evaluate' // websocket测试
// const img = 'http://127.0.0.1:8088/evaluate' // 头像测试

// 测试环境
// const prov = 'http://10.5.221.23:8089/test/evaluate'  // 测试线上环境 2020-11-28新增接口地址

// const prov = "http://10.99.44.150:8088/evaluate"  // 测试线上环境 2020-11-28新增接口地址
const prov = "http://10.100.220.173:8088/evaluate"  // 测试线上环境 2020-11-28新增接口地址
// const prov = "http://10.99.44.150:8089/test/evaluate"  // 测试线上环境 2020-11-28新增接口地址
// const prov = "http://10.99.44.150:8089/evaluate"  // 测试线上环境 2020-11-28新增接口地址
// const prov = "http://10.100.223.111:8088/evaluate"  // 测试线上环境

// const prov = "http://10.5.221.23:8088/evaluate"  //生产环境


// const wss = 'ws://10.100.234.111:8088/evaluate' // websocket测试
// const wss = 'ws://10.5.221.23:8089/test/evaluate' // websocket 线上环境测试
// const wss = 'ws://10.99.44.150:8088/evaluate' // websocket测试
const wss = 'ws://10.100.220.173:8088/evaluate' // websocket测试
// const wss = 'ws://10.99.44.150:8089/test/evaluate' // websocket测试
// const wss = 'ws://10.99.44.150:8089/test/evaluate' // websocket测试


// const img = 'http://10.5.221.23:8089/test/evaluate' // 头像测试 2020-11-28新增接口地址
// const img = 'http://10.99.44.150:8088/evaluate' // 头像测试 2020-11-28新增接口地址
const img = 'http://10.100.220.173:8088/evaluate' // 头像测试 2020-11-28新增接口地址
// const img = 'http://10.99.44.150:8089/test/evaluate' // 头像测试 2020-11-28新增接口地址
// const img = 'http://10.5.221.23:8088/evaluate' // 头像测试 2020-11-28新增接口地址 生產環境
// const img = 'http://10.99.44.150:8089/evaluate' // 头像测试 2020-11-28新增接口地址

// const img = 'http://10.100.223.111:8088/evaluate' // 头像测试

// 正式环境
// const prov = "https://m.szpt.edu.cn/evaluate" // 线上环境
// const wss = 'wss://m.szpt.edu.cn/evaluate' // websocket 线上
// const img = 'https://m.szpt.edu.cn/evaluate' // 头像线上

export default {
    baseURL: prov, //基本ip传到main.js组件
    logout: prov + '/api/evaluate/logout',//登出退出跳转
    findImage: img + '/api/employee/findImageByEmployeeId/', //被评价人员头像照片
    message: wss + '/socket/employee/message', //websocket接口
}
