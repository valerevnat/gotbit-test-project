<script lang="ts" setup>
import { ref } from 'vue';
import { HalfCircleSpinner } from 'epic-spinners'
import { parseEther } from 'ethers/lib/utils';

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
    storeUi.changeContent('connect-card')
    storeUi.showModal()
    console.log('balance', storeConnect.balance);

}

const cancelTransaction = () => {
    storeUi.changeContent('connect-card')
}

const confirmTransaction = async () => {
    storeUi.changeContentModal('connect-waitnig-confirmation')
    await storeConnect.approve()
    await storeConnect.getUserActiveStake()
    isBtnShow.value = true;

}

const showActiveStake = () => {
    storeUi.changeContent('connect-card')
    storeUi.changeContentStake('active-stake')
    storeUi.showModal()

}

const unstake = async () => {
    storeUi.changeContentModal('unstake-clame-waiting')
    await storeConnect.withdraw()
    isBtnShow.value = true;
}

const handlerClaim = async () => {
    storeUi.changeContentModal('connect-waitnig-confirmation')
    await storeConnect.claim()
    isBtnShow.value = true;
}

const approveStake = async () => {
    const num = parseEther(storeUi.amountStake);
    await storeConnect.stake(num)
    await storeConnect.balanceOf()
    storeUi.amountStake = ''
    storeUi.showModal()
}


</script>

<template>
    <div class="modal-window" v-if="storeUi.isShowModal">
        <div class="modal-content">
            <div class="modal-content-close" @click="storeUi.showModal">
                <img src="../../assets/img/close-circle.png" alt="">
            </div>
            <div v-if="storeUi.contentModal === 'connect-card-modal'" class="modal-content-connect">
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

            <div v-if="storeUi.contentModal === 'connect-enable-transaction'" class="modal-content-connect">
                <div class="modal-content-connect-title">Enable transaction</div>
                <div class="modal-content-connect-subtitle">By pressing Confirm you allow the staking contract to
                    transfer tokens from your wallet address</div>
                <div class="connect-enable-transaction-btns">
                    <ButtonComponent variant='btn-mini' @click="cancelTransaction">Cancel</ButtonComponent>
                    <ButtonComponent variant='btn-mini' class="btn-mini-bcg" @click="confirmTransaction">Confirm
                    </ButtonComponent>
                </div>
            </div>

            <div v-if="storeUi.contentModal === 'connect-waitnig-confirmation'" class="modal-content-connect">
                <div class="modal-content-connect-title">Waiting for confirmation</div>
                <div class="modal-content-connect-subtitle">It will take some time for the confirmation to be completed.
                </div>
                <div class="connect-waitnig-confirmation-preloader" v-if="!isBtnShow">
                    <half-circle-spinner :animation-duration="1000" :size="60" color="#007CFF" />
                </div>
                <ButtonComponent variant='btn-mini' v-if="isBtnShow" @click="showActiveStake">Ok</ButtonComponent>
            </div>
            <div v-if="storeUi.contentModal === 'unstake'" class="modal-content-unstake modal-content-connect">
                <div class="modal-content-connect-title">Unstake</div>
                <div class="modal-content-connect-subtitle">By pressing Unstake you are withdrawing the amount of tokens
                    you
                    both staked and earned. Your current stake stops accumulating rewards in
                    this case.
                </div>
                <div class="connect-unstake-btns connect-enable-transaction-btns">
                    <ButtonComponent variant='btn-mini'>Cancel</ButtonComponent>
                    <ButtonComponent variant='btn-mini' class="btn-mini-bcg" @click="unstake">Unstake
                    </ButtonComponent>
                </div>
            </div>
            <div v-if="storeUi.contentModal === 'claim'" class="modal-content-claim modal-content-connect">
                <div class="modal-content-connect-title">Claim</div>
                <div class="modal-content-connect-subtitle">By pressing Claim you are withdrawing only the tokens you
                    earned while staking. Your stake stays active and continues to accumulate rewards.
                </div>
                <div class="connect-enable-transaction-btns connect-unstake-btns">
                    <ButtonComponent variant='btn-mini'>Cancel</ButtonComponent>
                    <ButtonComponent variant='btn-mini' class="btn-mini-bcg" @click="handlerClaim">Claim
                    </ButtonComponent>
                </div>
            </div>
            <div v-if="storeUi.contentModal === 'unstake-clame-waiting'" class="modal-content-connect">
                <div class="modal-content-connect-title">Waiting for your tokens</div>
                <div class="modal-content-connect-subtitle">It will take some time for the transaction to be completed.
                </div>
                <div class="connect-waitnig-confirmation-preloader" v-if="!isBtnShow">
                    <half-circle-spinner :animation-duration="1000" :size="60" color="#007CFF" />
                </div>
                <ButtonComponent variant='btn-mini' v-if="isBtnShow">Okay</ButtonComponent>
            </div>
            <div v-if="storeUi.content === 'stake'" class="modal-content-stake">
                <div class="modal-content-connect-title">Stake</div>
                <div class="modal-content-connect-subtitle">By pressing Comfirm you are staking 1000 Coins.
                </div>
                <div class="connect-stake-btns connect-enable-transaction-btns">
                    <ButtonComponent variant='btn-mini'>Cancel</ButtonComponent>
                    <ButtonComponent variant='btn-mini' class="btn-mini-bcg">Confirm
                    </ButtonComponent>
                </div>
            </div>

            <div class="modal-content-connect" v-if="storeUi.contentModal === 'stake-ok'">
                <div class="modal-content-connect-title">Stake</div>
                <div class="modal-content-connect-subtitle">By pressing Comfirm you are staking {{ storeUi.amountStake
                }} Coins.
                </div>
                <ButtonComponent variant='btn-mini' class="btn-mini-bcg btn-mini-bcg-color-white" @click="approveStake">
                    Stake
                </ButtonComponent>

            </div>
        </div>
    </div>
</template>

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
        max-width: 560px;
        max-height: 252px;
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
                text-align: center;

            }

            &-subtitle {
                font-weight: 400;
                font-size: 16px;
                color: #58595C;
                margin-bottom: 32px;
                text-align: center;

            }

            .btn-mini-bcg-color-white {
                color: #fff
            }
        }

        // &-claim {
        //     width: 50%;
        // }

        .connect-enable-transaction {
            &-btns {
                display: flex;
                width: 70%;
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