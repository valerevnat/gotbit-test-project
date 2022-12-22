<script setup lang="ts">
import { ref } from "vue";
import { useStaking } from '@/stores/storeStaking'

import ToolTip from "./base/ToolTip.vue";

const storeStaking = useStaking();

const tooltip = ref<boolean>(false)

const showTooltip = () => {
    tooltip.value = !tooltip.value
}
</script>


<template>
    <div class="basic-content-tvl">
        <div class="basic-content-tvl-text">
            <div class="basic-content-tvl-text-left">TVL</div>
            <div>{{ (+storeStaking.tvl / Math.pow(10, 18)).toFixed(3) }} $</div>
        </div>
        <div class="basic-content-tvl-help">
            <div class="basic-content-tvl-help-btn" @click="showTooltip">
                <img src="../assets/img/help-inactive.svg" alt="help" />
            </div>
        </div>
        <div class="basic-content-tvl-tooltip">
            <ToolTip :tooltip="tooltip">
                <div class="basic-content-tvl-help-text">Total Value Locked (TVL) represents the dollar value of
                    cryptocurrencies currently locked up on the staking smart contract.
                </div>
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