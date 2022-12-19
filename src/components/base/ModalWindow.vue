<template>
    <div class="modal-window" v-if="storeUi.isShowModal">
        <div class="modal-content">
            <div class="modal-content-close" @click="storeUi.showModal">
                <img src="../../assets/img/close-circle.png" alt="">
            </div>
            <div v-if="storeUi.content === 'connect-card'" class="modal-content-connect">
                <div class="modal-content-connect-title">Connect wallet</div>
                <div class="modal-content-connect-subtitle">To perform actions on this page you need to connect your
                    wallet</div>
                <ButtonComponent variant='btn-metamask' @click="showConnectCard">
                    <div class="modal-content-main">
                        <img src="@/assets/img/logo-mask.png" alt="MetaMask" />
                        <div class="modal-content-main-text">MetaMask Provider</div>
                    </div>
                </ButtonComponent>
            </div>
            <div v-if="storeUi.content === 'connect-enable-transaction'" class="modal-content-connect">
                <div class="modal-content-connect-title">Enable transaction</div>
                <div class="modal-content-connect-subtitle">By pressing Confirm you allow the staking contract to
                    transfer tokens from your wallet address</div>
                <div class="connect-enable-transaction-btns">
                    <ButtonComponent variant='btn-mini' @click="cancelTransaction">Cancel</ButtonComponent>
                    <ButtonComponent variant='btn-mini' class="btn-mini-bcg" @click="confirmTransaction">Confirm
                    </ButtonComponent>
                </div>
            </div>
            <div v-if="storeUi.content === 'connect-waitnig-confirmation'" class="modal-content-connect">
                <div class="modal-content-connect-title">Waiting for confirmation</div>
                <div class="modal-content-connect-subtitle">It will take some time for the confirmation to be completed.
                </div>
                <div class="connect-waitnig-confirmation-preloader" v-if="!isBtnShow">
                    <half-circle-spinner :animation-duration="1000" :size="60" color="#007CFF" />
                </div>
                <ButtonComponent variant='btn-mini' v-if="isBtnShow">Ok</ButtonComponent>
            </div>
            <div v-if="storeUi.content === 'unstake'" class="modal-content-unstake">
                <div class="modal-content-connect-title">Unstake</div>
                <div class="modal-content-connect-subtitle">By pressing Unstake you are withdrawing the amount of tokens
                    you
                    both staked and earned. Your current stake stops accumulating rewards in
                    this case.
                </div>
                <div class="connect-unstake-btns">
                    <ButtonComponent variant='btn-mini'>Cancel</ButtonComponent>
                    <ButtonComponent variant='btn-mini' class="btn-mini-bcg">Unstake</ButtonComponent>
                </div>
            </div>
            <div v-if="storeUi.content === 'claim'" class="modal-content-claim">
                <div class="modal-content-connect-title">Claim</div>
                <div class="modal-content-connect-subtitle">By pressing Claim you are withdrawing only the tokens you
                    earned while staking. Your stake stays active and continues to accumulate rewards.
                </div>
                <div class="connect-unstake-btns">
                    <ButtonComponent variant='btn-mini'>Cancel</ButtonComponent>
                    <ButtonComponent variant='btn-mini' class="btn-mini-bcg">Claim</ButtonComponent>
                </div>
            </div>
            <div v-if="storeUi.content === 'unstake-clame-waiting'" class="modal-content-connect">
                <div class="modal-content-connect-title">Waiting for your tokens</div>
                <div class="modal-content-connect-subtitle">It will take some time for the transaction to be completed.
                </div>
                <div class="connect-waitnig-confirmation-preloader">
                    <half-circle-spinner :animation-duration="1000" :size="60" color="#007CFF" />
                </div>
                <ButtonComponent variant='btn-mini'>Okay</ButtonComponent>
            </div>
            <div v-if="storeUi.content === 'stake'" class="modal-content-stake">
                <div class="modal-content-connect-title">Stake</div>
                <div class="modal-content-connect-subtitle">By pressing Comfirm you are staking 1000 Coins.
                </div>
                <div class="connect-stake-btns">
                    <ButtonComponent variant='btn-mini'>Cancel</ButtonComponent>
                    <ButtonComponent variant='btn-mini' class="btn-mini-bcg">Confirm</ButtonComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { HalfCircleSpinner } from 'epic-spinners'

import { useUI } from '@/stores/storeUi'
import { useConnect } from '@/stores/storeConnect'

import ButtonComponent from '@/components/base/ButtonComponent.vue'

const storeUi = useUI();
const storeConnect = useConnect();
const isBtnShow = ref(false);

const showConnectCard = async () => {
    await storeConnect.connectMetamask()
    await storeConnect.balanceOf()
    await storeConnect.getSymbol()
    storeUi.showModal()
    console.log('balance', storeConnect.balance);

}

const cancelTransaction = () => {
    storeUi.changeContent('connect-card')
}

const confirmTransaction = async () => {
    storeUi.changeContent('connect-waitnig-confirmation')
    await storeConnect.approve()
    isBtnShow.value = true;

}


</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.modal-window {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2.5px);
    position: fixed;
    display: flex;

    .modal-content {
        margin: auto;
        background: #ffffff;
        border: 1px solid #f3f3f5;
        box-shadow: 0px 32px 64px rgba(36, 37, 38, 0.12);
        border-radius: 16px;
        min-width: 560px;
        min-height: 252px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 28px;
        position: relative;

        &-close {
            position: absolute;
            top: 28px;
            right: 28px;
            cursor: pointer;
        }

        &-main {
            display: flex;
            justify-content: center;
            align-items: center;

            &-text {
                font-weight: 500;
                font-size: 20px;
                color: #191A1B;
            }
        }

        &-connect {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            &-title {
                font-weight: 700;
                font-size: 32px;
                color: #191A1B;
                margin-bottom: 8px;
            }

            &-subtitle {
                font-weight: 400;
                font-size: 16px;
                color: #58595C;
                margin-bottom: 32px;
            }
        }

        .connect-enable-transaction {
            &-btns {
                display: flex;
                width: 50%;
                justify-content: space-between;

                .btn-mini-bcg {
                    background: $main-color;
                    font-weight: 500;
                    font-size: 16px;
                    color: #FFFFFF;
                }
            }
        }
    }
}
</style>