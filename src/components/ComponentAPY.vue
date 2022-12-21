<script setup lang="ts">
import { ref } from "vue";
import { useConnect } from '@/stores/storeConnect'
import ToolTip from "./base/ToolTip.vue";

const storeConnect = useConnect()
const tooltip = ref<boolean>(false)

const showTooltip = () => {
    tooltip.value = !tooltip.value
    console.log('tooltip', tooltip.value);

}
</script>


<template>
    <div class="basic-content-apy">
        <div class="basic-content-apy-text">{{ +storeConnect.apy / 10000 }}% APY</div>
        <div class="basic-content-apy-help">
            <div class="basic-content-apy-help-btn" @click="showTooltip">
                <img src="../assets/img/help-active.svg" alt="help" />
            </div>
        </div>
        <div class="basic-content-apy-tooltip">
            <ToolTip :tooltip="tooltip">
                <div class="basic-content-apy-help-text">
                    Estimated APY represents the total amount of interest which can be earned over one year assuming
                    current TVL remains the same.
                </div>
            </ToolTip>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.basic-content-apy {
    display: flex;
    align-items: center;

    &-text {
        font-weight: 700;
        font-size: 40px;
        color: #000000;
        margin-right: 8px;
    }

    &-help {
        &-btn {
            cursor: pointer;

            img {
                width: 24px;
                height: 24px;
            }
        }
    }

    &-tooltip {
        position: absolute;
        left: 100%;
    }
}
</style>