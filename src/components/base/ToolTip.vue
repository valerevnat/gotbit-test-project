<script setup lang="ts">
const props = defineProps({
    tooltip: {
        type: Boolean,
        default: false,
    },
})

</script>

<template>
    <div class="tooltip" v-if="props.tooltip">
        <div class="tooltip-triangle"></div>
        <div class="tooltip-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss" >
.tooltip {
    display: flex;
    align-items: center;

    &-content {
        width: 296px;
        height: 99px;
        background: #000000;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-weight: 400;
        font-size: 14px;
        padding: 10px;
    }

    &-triangle {
        background: #000000;
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
        position: relative;
        left: 3%;
    }
}

@media (max-width: 768px) {
    .tooltip {

        &-triangle {
            bottom: 49px;
            left: 68%;
        }
    }
}
</style>
