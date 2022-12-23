<script setup lang="ts">

import { useToken } from '@/stores/storeToken';
import { useUI } from '@/stores/storeUi'

import ComponentAPY from '@/components/ComponentAPY.vue';
import ComponentTVL from '@/components/ComponentTVL.vue';
import CardnotConnect from '@/components/main/CardnotConnect.vue'
import CardConnect from '@/components/main/CardConnect.vue'
import ActiveStake from '@/components/main/ActiveStake.vue';
import PopupConnectWallet from '@/components/popups/PopupConnectWallet.vue';
import PopupStake from '@/components/popups/PopupStake.vue'
import PopupClaim from '@/components/popups/PopupClaim.vue'
import PopupUnstake from '@/components/popups/PopupUnstake.vue';
import PopupEnableTransaction from './popups/PopupEnableTransaction.vue';
import Alert from '@/components/base/Alert.vue';


const storeToken = useToken();
const storeUi = useUI();

</script>

<template>
    <div class="container">
        <div class="title">
            <div class="title-left">Flexible</div>
            <div class="title-right">Staking</div>
        </div>
        <div class="container-content">
            <div class="container-content-apy-tvl">
                <ComponentAPY />
                <ComponentTVL />
            </div>
            <CardnotConnect v-if="storeUi.content === 'not-connect'" />
            <CardConnect v-if="storeUi.content === 'connect'" />
        </div>
        <div>
            <ActiveStake />
        </div>
    </div>
    <PopupConnectWallet />
    <PopupEnableTransaction />
    <PopupStake />
    <PopupClaim />
    <PopupUnstake />
    <Alert :status="storeUi.alert.status" :header="storeUi.alert.header" :description="storeUi.alert.description"
        :visible="storeUi.alert.visible" />

</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 110px;

    .title {
        display: flex;
        justify-content: center;
        align-items: center;

        &-left,
        &-right {
            font-weight: 900;
            font-size: 64px;
        }

        &-left {
            color: $main-color;
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        border-radius: 24px;
        padding: 40px 0 40px 0;

        &-apy-tvl {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

    }

}
</style>
