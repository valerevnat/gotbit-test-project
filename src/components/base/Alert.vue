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
            <div class="modal-content-title">{{ props.header }}</div>
            <div class="modal-content-subtitle">{{ props.description }}</div>

            <!-- loader -->
            <div class="modal-content-preloader" v-if="props.status === 'loading'">
                <half-circle-spinner :animation-duration="1000" :size="60" color="#007CFF" />
            </div>
            <ButtonComponent variant='btn-mini' v-if="props.status === 'success'"
                @click="storeUi.alert.visible = false">Ok
            </ButtonComponent>
            <ButtonComponent variant='btn-mini' v-if="props.status === 'error'">Error
            </ButtonComponent>
        </div>
    </Modal>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
</style>
