<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import { useUser } from '@/stores/storeUser'
import { useUI } from '@/stores/storeUi'
import ButtonComponent from './base/ButtonComponent.vue'

const storeUser = useUser()
const storeUi = useUI();

const smallScreen = ref<boolean>(false)

const onResize = () => {
    smallScreen.value = window.innerWidth <= 768;
}

onMounted(() => {
    window.addEventListener('resize', onResize);
    onResize();
})

onUnmounted(() => {
    window.removeEventListener('resize', onResize)
})


</script>

<template>
    <div class="navbar">
        <div class="navbar-logo">
            <div class="navbar-logo-circle"></div>
            <div class="navbar-logo-title" v-if="!smallScreen">staking PLATFORM</div>
        </div>
        <ButtonComponent variant="btn-mini" @click="storeUi.changePopupConnectWallet"> {{
                storeUser.wallet ?
        `${storeUser.wallet.slice(0, 10)}...` :
        'Connect wallet'
        }}
        </ButtonComponent>
    </div>
</template>

<style scoped lang="scss">
.navbar {
    height: 96px;
    padding: 16px 150px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #d7d8df;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 5;

    &-logo {
        display: flex;
        align-items: center;

        &-circle {
            width: 64px;
            height: 64px;
            margin-right: 16px;
            background: #d7d8df;
            border-radius: 50%;
        }

        &-title {
            font-weight: 400;
            font-size: 28px;
            text-transform: uppercase;
            color: #191a1b;
        }
    }
}

@media (max-width: 768px) {
    .navbar {
        height: 80px;
        padding: 16px;

        &-logo {
            &-circle {
                width: 48px;
                height: 48px;
            }
        }
    }
}
</style>
