<template>
  <div class="bg-left"></div>
  <div class="bg-right"></div>
  <div p-60rpx>
    <div flex="~ items-center" text-42rpx>
      欢迎使用
      <div ml-10rpx font-500>{{ brand }}</div>
    </div>
    <div class="description mt-20rpx">登录后可{{ fun }}，享受优质服务</div>
    <div class="logo"></div>
    <button v-if="agree.length > 0" open-type="getPhoneNumber" flex="~ justify-center items-center"
      @getphonenumber="getPhoneNumber" mt-20rpx rd-66rpx type="primary">
      <!-- #ifdef MP-WEIXIN -->
      <div class="i-ic:baseline-wechat text-38rpx mr-10rpx"></div>
      <!-- #endif -->
      <!-- #ifdef MP-ALIPAY -->
      <div class="i-ant-design:alipay-outlined mt-3rpx text-38rpx mr-10rpx"></div>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      微信用户一键登录
      <!-- #endif -->
      <!-- #ifdef MP-ALIPAY -->
      支付宝用户一键登录
      <!-- #endif -->
    </button>
    <button v-else flex="~ justify-center items-center" @click="noAgree" mt-20rpx rd-66rpx type="primary">
      <!-- #ifdef MP-WEIXIN -->
      <view class="i-ic:baseline-wechat text-38rpx mr-10rpx"></view>
      <!-- #endif -->
      <!-- #ifdef MP-ALIPAY -->
      <view class="i-ant-design:alipay-outlined mt-3rpx text-38rpx mr-10rpx"></view>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      微信用户一键登录
      <!-- #endif -->
      <!-- #ifdef MP-ALIPAY -->
      支付宝用户一键登录
      <!-- #endif -->
    </button>
    <div class="agreement">
      <uni-data-checkbox @change="agreeChange" v-model="agree" multiple :localdata="agreeItem" />
      <div mt--3rpx @click.stop="approve">
        我已同意绑定{{ platformName }}账号,并且已阅读并同意
        <text class="url" @click.stop="toUserAgreement">《用户服务协议》</text>
        <text class="url" @click.stop="toPrivacy">《隐私权政策》</text>
        ；未注册手机号码在登录后将自动为我注册{{ brand }}账号。
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Login } from "@/model";
import { info, login } from "@/apis/user";

const platformName = ref("");
// #ifdef MP-WEIXIN
platformName.value = "微信";
// #endif
// #ifdef MP-ALIPAY
platformName.value = "支付宝";
// #endif
const fun = import.meta.env.VITE_FUNCTION
const brand = import.meta.env.VITE_BRAND;
const toUserAgreement = () => {
  uni.navigateTo({
    url: "/pages/user-agreement/index",
  });
};
const toPrivacy = () => {
  uni.navigateTo({
    url: "/pages/privacy/index",
  });
};
const loginParam = ref<Login>({});
const agree = ref<number[]>([]);
const agreeItem = ref([{ value: 1 }]);
const getPhoneNumber = async ({ detail }: any) => {
  if (detail.code || detail.encryptedData) {
    loginParam.value.phoneCode =
      detail.code || detail.encryptedData;
    uni.login().then(async (res) => {
      loginParam.value.authCode = res.code;
      const token = await login(loginParam.value);
      if (token) {
        uni.setStorageSync("token", token);
        const user = await info();
        uni.setStorageSync("user", user);
        uni.navigateBack().then();
      }
    });
  } else {
    uni
      .showToast({
        title: "您已拒绝授权手机号!",
        icon: "none",
      })
      .then();
    return;
  }
};
const agreeChange = () => {
};
const approve = () => {
  agree.value = agree.value.length > 0 ? [] : [1];
};
const noAgree = () => {
  uni.showToast({
    title: `请先阅读并同意《用户协议》《隐私权政策》`,
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
.agreement {
  display: flex;
  color: $uni-text-color-grey;
  font-size: $uni-font-size-base;
  margin-top: 100rpx;
}

.logo {
  position: relative;
  background-image: url("@/static/images/logo.png");
  height: 600rpx;
  width: auto;
  background-size: 36%;
  background-position: center;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
}

.bg-left {
  width: 620rpx;
  height: 620rpx;
  position: absolute;
  background-size: 600rpx auto !important;
  background: url("@/static/images/logo.png") no-repeat;
  opacity: 0.1;
  top: 160rpx;
  left: -300rpx;
}

:deep(.checklist-box) {
  margin-right: 0 !important;
  margin-top: auto !important;
}

.url {
  color: $uni-primary;
}

.bg-right {
  width: 360rpx;
  height: 360rpx;
  position: absolute;
  background-size: 360rpx auto !important;
  background: url("@/static/images/logo.png") no-repeat;
  opacity: 0.1;
  right: -160rpx;
}

:deep(.checkbox__inner) {
  border-radius: 50% !important;
  justify-content: center;
  align-items: center;
}

.description {
  font-size: $uni-font-size-sm;
  color: $uni-text-color-grey;
}
</style>
