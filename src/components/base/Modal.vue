<script lang="ts" setup>
import { useUI } from '@/stores/storeUi'

export interface ModalProps {
    modelValue: boolean
}

const props = defineProps<ModalProps>();

const storeUi = useUI();


</script>

<template>
    <div v-if="props.modelValue" class="modal-window">
        <div class="modal-content">
            <div class="modal-content-close" @click="storeUi.closeModal">
                <img src="../../assets/img/close-circle.png" alt="">
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.modal-window {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2.5px);
    position: fixed;
    display: flex;
    height: 100vh;
    width: 100vw;

    .modal-content {
        margin: auto;
        background: #ffffff;
        border: 1px solid #f3f3f5;
        box-shadow: 0px 32px 64px rgba(36, 37, 38, 0.12);
        border-radius: 16px;
        width: 560px;
        min-height: 252px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 28px;
        position: relative;

        &-title {
            font-weight: 700;
            font-size: 32px;
            color: #191A1B;
            margin-bottom: 8px;
            text-align: center;
        }

        &-subtitle {
            font-weight: 400;
            font-size: 16px;
            color: #58595C;
            margin-bottom: 32px;
            text-align: center;

        }

        &-popup {
            display: flex;
            // flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        &-close {
            position: absolute;
            top: 28px;
            right: 28px;
            cursor: pointer;
        }

        &-btns,
        &-btns-center {
            width: 100%;
            height: 52px;
            display: flex;
            justify-content: space-between;
        }

        &-btns-center {
            justify-content: center;
        }

        &-preloader {
            display: flex;
            justify-content: center;
        }

    }
}

@media (max-width: 768px) {
    .modal-window {

        .modal-content {
            width: 343px;
            height: 424px;

            &-title {
                font-size: 24px;
            }

            &-subtitle {
                font-size: 18px;
            }

            &-close {
                top: 16px;
                right: 16px;
            }

        }
    }
}
</style>