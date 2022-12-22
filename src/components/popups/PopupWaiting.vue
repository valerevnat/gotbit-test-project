<script lang="ts" setup>
import { HalfCircleSpinner } from 'epic-spinners'

import { useUI } from '@/stores/storeUi'

import ButtonComponent from '@/components/base/ButtonComponent.vue'
import Modal from '@/components/base/Modal.vue';

export interface PopupWaitingProps {
    contentValue: 'confirmation' | 'tokens'
}

const props = defineProps<PopupWaitingProps>()

const storeUi = useUI();

</script>

<template>
    <Modal v-if="storeUi.isShowPopupWaiting">
        <div class="modal-content-propup">

            <!-- waiting confirmation -->
            <div class="modal-content-title" v-if="props.contentValue === 'confirmation'">Waiting for confirmation</div>
            <!-- waiting tokens -->
            <div class="modal-content-title" v-if="props.contentValue === 'tokens'">Waiting for your tokens</div>

            <div class="modal-content-subtitle" v-if="storeUi.isloadingForWaiting">It will take some time for the
                confirmation to be
                completed.
            </div>

            <!-- enable -->
            <div class="modal-content-subtitle"
                v-if="!storeUi.isloadingForWaiting && props.contentValue === 'confirmation'">
                Congratulations! Confirmation is completed.</div>

            <!-- unstake -->
            <div class="modal-content-subtitle" v-if="!storeUi.isloadingForWaiting && storeUi.isShowPopupUnstake">
                Congratulations! Your unstake transaction is completed.</div>

            <!-- claim -->
            <div class="modal-content-subtitle" v-if="!storeUi.isloadingForWaiting && storeUi.isShowPopupClaim">
                Congratulations! Your claim transaction is completed.</div>

            <!-- loader -->
            <div class="modal-content-preloader" v-if="storeUi.isloadingForWaiting">
                <half-circle-spinner :animation-duration="1000" :size="60" color="#007CFF" />
            </div>
            <ButtonComponent variant='btn-mini' v-if="!storeUi.isloadingForWaiting" @click="storeUi.closeModal">Ok
            </ButtonComponent>
        </div>
    </Modal>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
</style>
