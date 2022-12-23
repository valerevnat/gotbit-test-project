<script lang="ts" setup>

interface IProps {
    variant: string | ''
}

const props = defineProps<IProps>()

</script>

<template>
    <button :class="props.variant">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";

.btn-main,
.btn-connect,
.btn-main-disabled,
.btn-mini-bcg {
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

.btn-mini,
.btn-connect-border {
    width: 157px;
    height: 44px;
    border: 2px solid $main-color;
    border-radius: 8px;
    background-color: inherit;
    font-weight: 500;
    font-size: 16px;
    color: #222325;
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

.btn-connect,
.btn-connect-border {
    width: 100%;
}

.btn-main-disabled {
    opacity: 0.5;
    width: 100%;
}

.btn-mini-bcg {
    width: 145px;
    height: 44px;
    background-color: $main-color;
    color: #FFFFFF;
}
</style>