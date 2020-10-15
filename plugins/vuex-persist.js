import VuexPersistence from 'vuex-persist'

// 该插件可以让vuex自动保持持久化,因为vuex没有实现数据持久化,
// 插件会监听vuex的数据改变并在客户端的时候触发函数,将vuex的数据复制回复给vuex
// store是vuex中的this.$store,通过向nuxt解构赋值出来的存储数据的地方
export default ({ store }) => {
    window.onNuxtReady(() => {
        new VuexPersistence({
            // key是本地储存的名字,如不填写此属性,就默认为vuex
            key: "store"
        }).plugin(store);
    });
}