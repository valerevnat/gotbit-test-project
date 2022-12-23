<script lang="ts" setup>
import { useUI } from '@/stores/storeUi'
import { useStaking } from '@/stores/storeStaking'

import ButtonComponent from '@/components/base/ButtonComponent.vue'
import Modal from '@/components/base/Modal.vue';

const storeUi = useUI();
const storeStaking = useStaking();

const handlerClaim = async () => {
    await storeStaking.claim()
    storeUi.changePopupClaim()
}

</script>

<template>
    <Modal v-model="storeUi.isShowPopupClaim">
        <div class="modal-content-propup">
            <div class="modal-content-title">Claim</div>
            <div class="modal-content-subtitle">By pressing Claim you are withdrawing only the tokens you
                earned while staking. Your stake stays active and continues to accumulate rewards.
            </div>
            <div class="modal-content-btns">
                <ButtonComponent variant='btn-mini  btn-popup' @click="storeUi.closeModal">Cancel</ButtonComponent>
                <ButtonComponent variant='btn-mini  btn-popup' class="btn-mini-bcg" @click="handlerClaim">Claim
                </ButtonComponent>
            </div>
        </div>
    </Modal>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
</style>