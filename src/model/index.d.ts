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


interface PageParam {
    current?: number;
    pageSize?: number;
    keywords?: string;
}

/**
 * User，用户表
 */
interface User extends PageParam {
    account?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 创建时间
     */
    createTime?: Date;
    /**
     * 主键ID
     */
    id?: string;
    /**
     * 真名
     */
    name?: string;
    /**
     * 昵称
     */
    nickname?: string;
    password?: string;
    /**
     * 手机
     */
    phone?: string;
    /**
     * 状态
     */
    status?: number;
    /**
     * 更新时间
     */
    updateTime?: Date;
    /**
     * 微信openid 一般微信用户有 但不保证管理员没有
     */
    wxOpenId?: string;
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
    User
};
