<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

import { useUI } from '@/stores/storeUi'
import { useConnect } from '@/stores/storeConnect'

import ButtonComponent from './base/ButtonComponent.vue';

const storeUi = useUI();
const storeConnect = useConnect();

const updateUSerStake = () => {
    storeConnect.getUserActiveStake();
    storeConnect.balanceOf();
}

onMounted(() => {
    setInterval(updateUSerStake, 1000)
})

onBeforeUnmount(() => {
    clearInterval(updateUSerStake)
})


const handlerUnstake = () => {
    storeUi.showModal()
    storeUi.changeContentModal('unstake')
}

const handlerShowClaim = () => {
    storeUi.showModal()
    storeUi.changeContentModal('claim')
}

</script>

<template>
    <div class="active-stake">
        <div class="active-stake-title">Active Stake</div>
        <div class="active-stake-info">
            <div class="active-stake-info-main">
                <div class="active-stake-info-main-subtitle">
                    <div class="active-stake-info-text">You have staked</div>
                    <div class="active-stake-info-coin">
                        <div class="active-stake-info-coin-number">{{ +storeConnect.userStake[0] / Math.pow(10, 18) }}
                        </div>
                        <div class="active-stake-info-coin-text">Coin</div>
                    </div>
                </div>
                <div class="active-stake-info-main-subtitle">
                    <div class="active-stake-info-text">Earned</div>
                    <div class="active-stake-info-coin">
                        <div class="active-stake-info-coin-number">{{ +storeConnect.userStake[1] / Math.pow(10, 18) }}
                        </div>
                        <div class="active-stake-info-coin-text">Coin</div>
                    </div>
                </div>
                <div class="active-stake-info-btn">
                    <ButtonComponent variant='btn-mini-bcg' @click="handlerShowClaim">Claim</ButtonComponent>
                </div>
            </div>
            <ButtonComponent variant='btn-connect-border' @click="handlerUnstake">Unstake</ButtonComponent>
            <!-- <ButtonComponent variant='btn-connect-border' @click="() => storeConnect.mint()">Mint</ButtonComponent> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.active-stake {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 621px;
    min-height: 204px;
    margin: 40px 0;

    &-title {
        font-weight: 700;
        font-size: 38px;
        color: #000000;
    }

    &-info {
        width: 100%;
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #FFFFFF;
        border-radius: 24px;
        padding: 24px 31px;

        // display: flex;
        &-main {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;

            &-subtitle {
                display: flex;
                flex-direction: column;
            }
        }

        &-coin {
            display: flex;
        }
    }
}
</style>
