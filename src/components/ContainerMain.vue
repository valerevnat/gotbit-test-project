<script setup lang="ts">

import { ref } from 'vue';
import { useConnect } from '@/stores/store'

import ModalWindow from './base/ModalWindow.vue';
import StartContent from './StartContent.vue';
import ButtonComponent from './base/ButtonComponent.vue';
import ConnectCard from './ConnectCard.vue';

const storeConnect = useConnect()

const show = ref<boolean>(false)
const content = ref<'not-connect' | 'connect-card'>('not-connect')

const handlerShowModal = () => {
    show.value = !show.value
}

const showConnectCard = async () => {
    await storeConnect.connectMetamask()
    await storeConnect.balanceOf()
    content.value = 'connect-card'
    console.log('balance', storeConnect.balance);

}

</script>

<template>
    <div class="container">
        <div class="title">
            <div class="title-left">Flexible</div>
            <div class="title-right">Staking</div>
        </div>
        <div class="container-content">
            <StartContent v-if="content === 'not-connect'" :handlerShowModal="handlerShowModal" :content="content" />
            <ConnectCard v-if="content === 'connect-card'" />
            <ModalWindow @showModal="handlerShowModal" :show="show">
                <ButtonComponent variant='btn-metamask' @click="showConnectCard">
                    <div class="modal-content-main">
                        <img src="../assets/img/logo-mask.png" alt="MetaMask" />
                        <div class="modal-content-main-text">MetaMask Provider</div>
                    </div>
                </ButtonComponent>
            </ModalWindow>
        </div>

    </div>
    <!-- <ModalWindow @showModal="handlerShowModal" :show="show" />
    <ToolTip @showTooltip="showTooltip" :tooltip="tooltip" />
    <ButtonComponent variant='btn-mini' />
    <button @click="showTooltip">Нажать</button> -->
</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 44px;

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
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        border-radius: 24px;
        // width: 70vw;
        // height: 60vh;
        padding: 40px 0 40px 0;

        .modal-content-main {
            display: flex;
            justify-content: center;
            align-items: center;

            &-text {
                font-weight: 500;
                font-size: 20px;
                color: #191A1B;
            }
        }
    }

}
</style>
