<script setup lang="ts">
import ButtonComponent from './base/ButtonComponent.vue'
</script>

<template>
    <div class="navbar">
        <div class="navbar-logo">
            <div class="navbar-logo-circle"></div>
            <div class="navbar-logo-title">staking PLATFORM</div>
        </div>
        <ButtonComponent variant="btn-mini"> Connect wallet </ButtonComponent>
    </div>
</template>

<style scoped lang="scss">
.navbar {
    height: 96px;
    padding: 16px 150px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #d7d8df;

    &-logo {
        display: flex;
        align-items: center;

        &-circle {
            width: 64px;
            height: 64px;
            margin-right: 16px;
            background: #d7d8df;
            border-radius: 50%;
        }

        &-title {
            font-weight: 400;
            font-size: 28px;
            text-transform: uppercase;
            color: #191a1b;
        }
    }
}
</style>
