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
    <div class="basic-content-apy">
        <div class="basic-content-apy-text">{{ storeConnect.apy }} APY</div>
        <div class="basic-content-apy-help">
            <div class="basic-content-apy-help-btn" @click="showTooltip">
                <img src="../assets/img/help-active.svg" alt="help" />
            </div>
        </div>
        <div class="basic-content-apy-tooltip">
            <ToolTip @showTooltip="showTooltip" :tooltip="tooltip">
                <div class="basic-content-apy-help-text">
                    Текст с подсказкой Текст с подсказкой Текст с подсказкой Текст с
                    подсказкой Текст с подсказкой
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