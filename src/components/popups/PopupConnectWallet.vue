<script lang="ts" setup>
import { useUI } from '@/stores/storeUi'
import { useUser } from '@/stores/storeUser'
import { useToken } from '@/stores/storeToken';

import ButtonComponent from '@/components/base/ButtonComponent.vue'
import Modal from '@/components/base/Modal.vue'

const storeUi = useUI();
const storeUser = useUser();
const storeToken = useToken();

const showConnectCard = async () => {
    await storeUser.connectMetamask()
    await storeToken.getAllowance()
    await storeToken.balanceOf()
    await storeToken.getSymbol()
    storeUi.changeContent('connect')
    storeUi.closeModal()
}
</script>

<template>
    <Modal v-model="storeUi.isShowPopupConnectWallet">
        <div class="modal-content-propup">
            <div class="modal-content-title">Connect wallet</div>
            <div class="modal-content-subtitle">To perform actions on this page you need to connect your
                wallet</div>
            <ButtonComponent variant='btn-metamask' @click="showConnectCard">
                <div class="modal-propup-main">
                    <img src="@/assets/img/logo-mask.png" alt="MetaMask" />
                    <div class="modal-propup-main-text">MetaMask Provider</div>
                </div>
            </ButtonComponent>
        </div>
    </Modal>
</template>

<style lang="scss" scoped>

</style>