<script setup lang="ts">

import { ref } from 'vue';
import ModalWindow from './base/ModalWindow.vue';
import BasicContent from './BasicContent.vue';
import ButtonComponent from './base/ButtonComponent.vue';
import ConectMetaMask from './ConectMetaMask.vue'
// import ToolTip from './base/ToolTip.vue'


const show = ref<boolean>(false)
const content = ref<string>('basic-content')

const handlerShowModal = () => {
    show.value = !show.value
}

const handlerConect = () => {
    content.value = 'conect-metaMask'
    console.log('show', show.value);
    console.log('conect', content.value);



}

// const tooltip = ref<boolean>(false)
// const showTooltip = () => {
//     tooltip.value = !tooltip.value
// }


</script>

<template>
    <div class="container">
        <div class="title">
            <div class="title-left">Flexible</div>
            <div class="title-right">Staking</div>
        </div>
        <div class="container-content">
            <BasicContent v-if="content === 'basic-content'" :handlerShowModal="handlerShowModal" />
            <ConectMetaMask v-if="content === 'conect-metaMask'" />
            <ModalWindow @showModal="handlerShowModal" :show="show">
                <ButtonComponent variant='btn-metamask' @click="handlerConect">
                    <div class="modal-content-main">
                        <img src="../assets/img/logo-mask.png" alt="MetaMask" />
                        <div class="modal-content-main-text">MetaMask</div>
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
        width: 70vw;
        height: 60vh;
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
