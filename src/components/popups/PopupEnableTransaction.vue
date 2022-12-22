<script lang="ts" setup>
import { useUI } from '@/stores/storeUi'
import { useToken } from '@/stores/storeToken';
import { useStaking } from '@/stores/storeStaking'

import ButtonComponent from '@/components/base/ButtonComponent.vue';
import Modal from '@/components/base/Modal.vue';

const storeUi = useUI();
const storeToken = useToken();
const storeStaking = useStaking();


const confirmTransaction = async () => {
    storeUi.changePopupWaiting()
    storeUi.changeLoadingForWaiting()
    await storeToken.approve()
    await storeStaking.getUserActiveStake()
    await storeToken.getAllowance()
    // storeUi.changeLoadingForWaiting()
}

</script>

<template>
    <Modal v-if="storeUi.isShowPopupEnableTransaction">
        <div class="modal-content-propup">
            <div class="modal-content-title">Enable transaction</div>
            <div class="modal-content-subtitle">By pressing Confirm you allow the staking contract to
                transfer tokens from your wallet address</div>
            <div class="modal-content-btns">
                <ButtonComponent variant='btn-mini' @click="storeUi.closeModal">Cancel</ButtonComponent>
                <ButtonComponent variant='btn-mini' class="btn-mini-bcg" @click="confirmTransaction">Confirm
                </ButtonComponent>
            </div>
        </div>
    </Modal>


</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
</style>