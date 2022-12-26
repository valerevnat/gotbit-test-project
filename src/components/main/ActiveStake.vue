<script setup lang="ts">
import { onMounted } from 'vue';

import { useUI } from '@/stores/storeUi'
import { useToken } from '@/stores/storeToken';
import { useStaking } from '@/stores/storeStaking'

import ButtonComponent from '@/components/base/ButtonComponent.vue';

const storeUi = useUI();
const storeToken = useToken();
const storeStaking = useStaking();

const updateUSerStake = () => {
    storeStaking.getUserActiveStake();
    storeToken.balanceOf();
}

onMounted(() => {
    setInterval(updateUSerStake, 1000)
})

</script>

<template>
    <div class="active-stake">
        <div class="active-stake-title">Active Stake</div>
        <div class="active-stake-info">
            <div class="active-stake-info-main">
                <div class="active-stake-info-main-subtitle">
                    <div class="active-stake-info-text">You have staked</div>
                    <div class="active-stake-info-coin">
                        <div class="active-stake-info-coin-number">{{ +storeStaking.userStake[0] / Math.pow(10, 18) }}
                        </div>
                        <div class="active-stake-info-coin-text">Coin</div>
                    </div>
                </div>
                <div class="active-stake-info-main-subtitle">
                    <div class="active-stake-info-text">Earned</div>
                    <div class="active-stake-info-coin">
                        <div class="active-stake-info-coin-number">{{ +storeStaking.userStake[1] / Math.pow(10, 18) }}
                        </div>
                        <div class="active-stake-info-coin-text">Coin</div>
                    </div>
                </div>
                <div class="active-stake-info-btn">
                    <ButtonComponent variant='btn-mini-bcg' @click="storeUi.changePopupClaim">Claim</ButtonComponent>
                </div>
            </div>
            <ButtonComponent variant='btn-connect-border' @click="storeUi.changePopupUnstake">Unstake
            </ButtonComponent>
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
        border-radius: 16px;
        padding: 24px 31px;

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

        &-text {
            color: #9799A1;
            font-size: 16px;
        }

        &-coin {
            display: flex;
            color: #000000;
            font-size: 20px;
        }
    }
}

@media (max-width: 768px) {
    .active-stake {
        min-width: 343px;

        &-title {
            font-size: 32px;
        }

        &-info {
            width: 343px;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 32px;

            &-main {
                width: 100%;
                flex-direction: column;
                gap: 16px;
            }

            &-btn {
                margin-top: 16px;
            }
        }

    }
}
</style>
