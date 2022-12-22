<script setup lang="ts">

import { useUI } from '@/stores/storeUi'
import ButtonComponent from "../base/ButtonComponent.vue";

const storeUi = useUI();

const showConnectWallet = async () => {
    storeUi.changePopupConnectWallet()
}

</script>

<template>
    <div class="basic-content">
        <div class="basic-content-img">
            <img src="@/assets/img/basic-main-screen.png" alt="help" />
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
    margin: 70px 0 40px 0;

    &-img {
        margin-bottom: 70px;
    }
}
</style>
