<script setup lang="ts">

import { useUI } from '@/stores/storeUi'

import ButtonComponent from "./base/ButtonComponent.vue";
import ComponentAPY from './ComponentAPY.vue';
import ComponentTVL from './ComponentTVL.vue';

const storeUi = useUI();

const showConnectWallet = async () => {
    storeUi.showModal()
    storeUi.changeContentModal('connect-card-modal')
}

</script>

<template>
    <div class="basic-content">
        <div class="metamask-apy-tvl">
            <ComponentAPY />
            <ComponentTVL />
        </div>

        <div class="basic-content-img">
            <img src="../assets/img/basic-main-screen.png" alt="help" />
        </div>
        <div class="basic-content-btn">
            <ButtonComponent variant='btn-main' @click="showConnectWallet"> Connect wallet </ButtonComponent>
        </div>
    </div>
</template>

<style scoped lang="scss">
.basic-content {
    height: 100%;
    width: 949px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: space-between;

    .metamask-apy-tvl {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
