import type { Res } from "@/model";
import { Method } from "@/enums";

const getUrl = (path: string, needLoading: boolean = false) => {
  if (needLoading) {
    uni
      .showLoading({
        title: "加载中...",
      })
      .then();
  }
  let url = "";
  // #ifndef H5
  url = `${import.meta.env.VITE_DOMAIN}`;
  // #endif

  // #ifdef H5
  url += `${import.meta.env.VITE_H5_BASE_URL}`;
  // #endif
  url += `${import.meta.env.VITE_REST_PATH || ""}${path}`;
  return url;
};
const uploadFile = <T>(
  path: string,
  filePath: string,
  name: string = "file",
  needLoading: boolean = false,
  fileType?: "image" | "video" | "audio"
) => {
  let url = getUrl(path, needLoading);
  return new Promise<T>((resolve, reject) => {
    uni.uploadFile({
      url,
      fileType,
      filePath,
      name,
      header: {
        "user-type": 2,
        "client-type": uni.getSystemInfoSync().uniPlatform,
        Authorization: uni.getStorageSync("token") || "",
      },
      success: (res) => processSuccess(res, resolve, needLoading),
      fail: (err) => {
        if (needLoading) {
          uni.hideLoading();
        }
        uni
          .showToast({
            title: "网络异常",
            mask: true,
            icon: "error",
          })
          .then();
        reject(err);
      },
      complete: () => {
        if (needLoading) {
          uni.hideLoading();
        }
      },
    });
  });
};

const callApi = <T>(
  path: string,
  method:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT" = Method.GET,
  param?: any,
  needLoading: boolean = false
) => {
  let url = getUrl(path, needLoading);
  return new Promise<T>((resolve, reject) => {
    uni.request({
      url,
      data: param,
      method,
      header: {
        "user-type": 2,
        "client-type": uni.getSystemInfoSync().uniPlatform,
        Authorization: uni.getStorageSync("token") || "",
      },
      success: (res) => processSuccess(res, resolve, needLoading),
      fail: (err) => {
        if (needLoading) {
          uni.hideLoading();
        }
        uni
          .showToast({
            title: "网络异常",
            mask: true,
            icon: "error",
          })
          .then();
        reject(err);
      },
      complete: () => {
        if (needLoading) {
          uni.hideLoading();
        }
      },
    });
  });
};
const processSuccess = <T>(
  res: any,
  resolve: any,
  needLoading: boolean = false
) => {
  let data: Res<T> = res.data as Res<T>;
  if (typeof data === "string") {
    data = JSON.parse(data);
  }
  if (res.statusCode !== 200 || !data.success) {
    if (needLoading) {
      uni.hideLoading();
    }
    uni
      .showToast({
        title: data.tips || "网络异常",
        icon: "error",
        mask: true,
      })
      .then();
    return;
  }
  resolve(data.data as T);
};

export { callApi, uploadFile };
