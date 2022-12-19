<script setup lang="ts">
import { useUI } from '@/stores/storeUi'
import { useConnect } from '@/stores/storeConnect'

import ButtonComponent from './base/ButtonComponent.vue';

const storeUi = useUI();
const storeConnect = useConnect();

const handlerUnstake = () => {
    storeUi.showModal()
    storeUi.changeContent('unstake')
}

const handlerShowClaim = () => {
    storeUi.showModal()
    storeUi.changeContent('claim')
}

</script>

<template>
    <div class="active-stake">
        <div class="active-stake-title">Active Stake</div>
        <div class="active-stake-info">
            <div class="active-stake-info-main">
                <div>
                    <div class="active-stake-info-text">You have staked</div>
                    <div class="active-stake-info-coin">
                        <div class="active-stake-info-coin-number">{{ storeConnect.userStake[0] }}</div>
                        <div class="active-stake-info-coin-text">Coin</div>
                    </div>
                </div>
                <div>
                    <div class="active-stake-info-text">Earned</div>
                    <div class="active-stake-info-coin">
                        <div class="active-stake-info-coin-number">{{ storeConnect.userStake[1] }}</div>
                        <div class="active-stake-info-coin-text">Coin</div>
                    </div>
                </div>
                <div class="active-stake-info-btn">
                    <ButtonComponent variant='btn-mini' @click="handlerShowClaim">Claim</ButtonComponent>
                </div>
            </div>
            <ButtonComponent variant='btn-mini' @click="handlerUnstake">Unstake</ButtonComponent>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
