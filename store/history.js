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
        // 判断:需要判断历史记录是否已经搜索过了,如果没有搜索过,才加入历史记录
        // 条件:数据全等的时候就不加入历史记录
        state.history.unshift(data);
    }
}
