<script lang="ts" setup>
const props = defineProps({
    variant: {
        type: String,
        default: 'btn-main',
    }
})

</script>

<template>
    <button :class="props.variant">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";

.btn-main,
.btn-connect {
    width: 312px;
    height: 52px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    border: none;
    background: $main-color;
    border-radius: 8px;
    cursor: pointer;
}

.btn-mini {
    width: 157px;
    height: 44px;
    border: 2px solid $main-color;
    border-radius: 8px;
    background-color: inherit;
    cursor: pointer;
}

.btn-metamask {
    width: 100%;
    height: 72px;
    border: 2px solid $main-color;
    border-radius: 8px;
    background-color: inherit;
    cursor: pointer;
}

.btn-connect {
    width: 100%;
}
</style>