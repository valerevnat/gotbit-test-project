<script setup lang="ts">

// import { useConnect } from '@/stores/storeConnect'
import { useUI } from '@/stores/storeUi'

import ModalWindow from './base/ModalWindow.vue';
import StartContent from './StartContent.vue';
import ConnectCard from './ConnectCard.vue';


const storeUi = useUI();


</script>

<template>
    <div class="container">
        <div class="title">
            <div class="title-left">Flexible</div>
            <div class="title-right">Staking</div>
        </div>
        <div class="container-content">
            <StartContent v-if="storeUi.content === 'not-connect'" />
            <ConnectCard v-if="storeUi.content === 'connect-card'" />
            <ModalWindow v-if="storeUi.isShowModal"></ModalWindow>
        </div>
    </div>
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        border-radius: 24px;
        padding: 40px 0 40px 0;

    }

}
</style>
