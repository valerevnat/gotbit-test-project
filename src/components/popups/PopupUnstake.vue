<script lang="ts" setup>
import { useUI } from '@/stores/storeUi'
import { useStaking } from '@/stores/storeStaking'

import ButtonComponent from '@/components/base/ButtonComponent.vue'
import Modal from '@/components/base/Modal.vue';

const storeUi = useUI();
const storeStaking = useStaking();

const unstake = async () => {
    storeUi.changePopupWaiting()
    storeUi.changeLoadingForWaiting()
    await storeStaking.withdraw()
    storeUi.changeLoadingForWaiting()
}


</script>

<template>
    <Modal v-model="storeUi.isShowPopupUnstake">
        <div class="modal-content-propup">
            <div class="modal-content-title">Unstake</div>
            <div class="modal-content-subtitle">By pressing Unstake you are withdrawing the amount of tokens
                you both staked and earned. Your current stake stops accumulating rewards in this case.
            </div>
            <div class="modal-content-btns">
                <ButtonComponent variant='btn-mini'>Cancel</ButtonComponent>
                <ButtonComponent variant='btn-mini' class="btn-mini-bcg" @click="unstake">Unstake
                </ButtonComponent>
            </div>
        </div>
    </Modal>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
</style>