export default {
  // 全局页面的head元素
  head: {
    title: 'journey',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '这是description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  plugins: [
    '@/plugins/element-ui',
    { src: '~/plugins/vuex-persist', ssr: false },
    '~/plugins/axios',
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // axios设置基础路径:$axios.defaults.baseURL
    // baseURL: "http://127.0.0.1:1337"
  },

  build: {
    transpile: [/^element-ui/],
  }
}
