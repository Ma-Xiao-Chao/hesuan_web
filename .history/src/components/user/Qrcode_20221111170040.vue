<template>
        <div style="width: 100%" class="center">
                <van-divider>个人信息二维码</van-divider>
                <div class="qrcode" ref="qrCodeUrl"></div>
                <button @click="createQrcode()">生成试管二维码</button>
        </div>
</template>
<script>
        import QRCode from 'qrcodejs2'
        import { getUrlParam } from "@/components/js/GetUrlParam";
        import { Dialog, Toast } from "vant";
        export default {
                data() {
                        return {

                        }
                },
                methods: {
                        creatQrCode() {
                                new QRCode(this.$refs.qrCodeUrl, {
                                        text: 'af1111', // 需要转换为二维码的内容
                                        width: 180,
                                        height: 180,
                                        colorDark: '#000000',
                                        colorLight: '#ffffff',
                                        correctLevel: QRCode.CorrectLevel.H
                                })
                        },
                }
        }
</script>
<style>
        .qrcode {
                width: 180px;
                height: 180px;
                margin: 0 auto;
        }
</style>