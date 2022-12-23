<script lang="ts" setup>
import { HalfCircleSpinner } from 'epic-spinners'

import { useUI } from '@/stores/storeUi'

import ButtonComponent from '@/components/base/ButtonComponent.vue'
import Modal from '@/components/base/Modal.vue';

export interface PopupWaitingProps {
    status: 'loading' | 'success' | 'error',
    header: string,
    description: string,
    visible: boolean,
}

const props = defineProps<PopupWaitingProps>()

const storeUi = useUI();

</script>

<template>
    <Modal v-model="storeUi.alert.visible">
        <div class="modal-content-propup">
            <div v-if="props.status !== 'error'" class="modal-content-title">{{ props.header }}</div>
            <div v-if="props.status === 'error'" class="title">
                <div class="title-img"><img src="@/assets/img/error-icon.png" alt="Error"></div>
                <div class="modal-content-title error">{{
                        props.header
                }}</div>
            </div>

            <div class="modal-content-subtitle">{{ props.description }}</div>

            <div class="modal-content-preloader" v-if="props.status === 'loading'">
                <half-circle-spinner :animation-duration="1000" :size="60" color="#007CFF" />
            </div>
            <div class="modal-content-btns-center">
                <ButtonComponent variant='btn-mini' v-if="props.status === 'success'"
                    @click="storeUi.alert.visible = false">Ok
                </ButtonComponent>

                <ButtonComponent variant='btn-mini btn-popup btn-mini-bcg' v-if="props.status === 'error'"
                    @click="storeUi.closeModal">Okay
                </ButtonComponent>
            </div>

        </div>
    </Modal>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.error {
    color: #EE5A51;
}

.title {
    transform: translateX(25%);
    position: relative;

    &-img {
        position: absolute;
        left: -80%;
        bottom: 0;
    }
}
</style>
