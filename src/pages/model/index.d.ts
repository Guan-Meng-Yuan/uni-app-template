// noinspection JSUnusedGlobalSymbols

/**
 * Res<T>，全局响应
 */
interface Res<T> {
    /**
     * 响应数据,所有的数据响应都会在外层包装此类型
     */
    data?: T;
    /**
     * 响应消息
     */
    message?: string;
    /**
     * 是否成功<br/>true 操作成功<br/>false 操作失败
     */
    success?: boolean;
    /**
     * 用户提示
     */
    tips?: string;
    /**
     * 请求ID
     */
    traceId?: string;
}

/**
 * Login，登录请求数据
 */
interface Login {
    /**
     * 认证code
     */
    authCode?: string;
    /**
     * 手机号认证code
     */
    phoneCode?: string;
}



/**
 * PageRes<T>，全局分页响应
 */
interface PageRes<T> {
    /**
     * 分页数据
     */
    records?: T[];
    /**
     * 当前页
     */
    pageNumber: number;
    /**
     * 每页条数
     */
    pageSize: number;
    /**
     * 总数
     */
    totalRow?: number;

    /**
     * 总页数
     */
    totalPage: number;
    hasNext?: boolean;
}


export {
    Res,
    PageRes,
    Login,

};
