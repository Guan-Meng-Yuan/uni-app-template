<script setup lang="ts">
onLaunch(() => {
    uni.getSetting().then((res) => {
        uni.setStorageSync(
            "locationPermission",
            res.authSetting["scope.userLocation"]
        );
    });
    // #ifdef MP-ALIPAY
    // @ts-ignore
    my.setNavigationBar({
        frontColor: "#000000",
        backgroundColor: "#FFFFFF",
    });
    // #endif
});
</script>
<style></style>
