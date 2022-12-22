<script lang="ts" setup>
import { HalfCircleSpinner } from 'epic-spinners'
import Modal from '@/components/base/Modal.vue'

</script>

<template>
    <Modal>
        <div class="modal-window-preloader">
            <half-circle-spinner :animation-duration="1000" :size="60" color="#007CFF" />
        </div>
    </Modal>

</template>

<style lang="scss" scoped>

</style>