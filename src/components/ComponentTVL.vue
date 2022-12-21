<script setup lang="ts">
import { ref } from "vue";
import { useConnect } from '@/stores/storeConnect'
import ToolTip from "./base/ToolTip.vue";

const storeConnect = useConnect()
const tooltip = ref<boolean>(false)
const showTooltip = () => {
    tooltip.value = !tooltip.value
}
</script>


<template>
    <div class="basic-content-tvl">
        <div class="basic-content-tvl-text">
            <div class="basic-content-tvl-text-left">TVL</div>
            <div>{{ +storeConnect.tvl / Math.pow(10, 18) }} $</div>
        </div>
        <div class="basic-content-tvl-help">
            <div class="basic-content-tvl-help-btn" @click="showTooltip">
                <img src="../assets/img/help-inactive.svg" alt="help" />
            </div>
        </div>
        <div class="basic-content-tvl-tooltip">
            <ToolTip :tooltip="tooltip">
                <div class="basic-content-tvl-help-text">Текст подсказка TVL</div>
            </ToolTip>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.basic-content-tvl {
    display: flex;
    align-items: center;
    margin-top: 16px;

    &-text {
        display: flex;
        font-size: 24px;
        color: #000000;
        margin-right: 8px;

        &-left {
            color: #9799a1;
            margin-right: 24px;
        }
    }

    &-help {
        &-btn {
            cursor: pointer;
        }
    }

    &-tooltip {
        position: absolute;
        left: 100%;
    }
}
</style>