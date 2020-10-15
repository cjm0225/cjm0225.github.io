export default function ({ $axios }) {
    // 数据访问前缀
    $axios.defaults.baseURL = "http://127.0.0.1:1337";
}