<template>
    <div class="modal-window" v-if="props.show" @click="handelShowModal">

        <div class="modal-content">
            <div class="modal-content-close">
                <img src="../../assets/img/close-circle.png" alt="">
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
})


const emit = defineEmits(['showModal'])

const handelShowModal = () => {
    emit('showModal')
}

</script>

<style lang="scss" scoped>
.modal-window {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2.5px);
    position: fixed;
    display: flex;

    .modal-content {
        margin: auto;
        background: #ffffff;
        border: 1px solid #f3f3f5;
        box-shadow: 0px 32px 64px rgba(36, 37, 38, 0.12);
        border-radius: 16px;
        min-width: 560px;
        min-height: 252px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 28px;
        position: relative;

        &-close {
            position: absolute;
            top: 28px;
            right: 28px;
            cursor: pointer;
        }
    }
}
</style>