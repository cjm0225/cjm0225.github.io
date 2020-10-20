export const state = () => {
    return {
        history: [],
    }
}

export const mutations = {
    // 接收两个参数state和data
    // state是储存数据的地方
    // data是改变数据时接收的新数据参数
    addHistory(state, data) {
        state.history.unshift(data);
    }
}
