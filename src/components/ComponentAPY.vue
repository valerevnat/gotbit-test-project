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
    <div class="basic-content-apy">
        <div class="basic-content-apy-text">{{ +storeStaking.apy / 10000 }}% APY</div>
        <div class="basic-content-apy-help">
            <div class="basic-content-apy-help-btn" @click="showTooltip">
                <img src="../assets/img/help-active.svg" alt="help" />
                <div class="basic-content-apy-tooltip">
                    <ToolTip :tooltip="tooltip">
                        <div class="basic-content-apy-help-text">
                            Estimated APY represents the total amount of interest which can be earned over one year
                            assuming current TVL remains the same.
                        </div>
                    </ToolTip>
                    <div id="tooltip-animation" role="tooltip"
                        class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                        Estimated APY represents the total amount of interest which can be earned over one year assuming
                        current TVL remains the same.
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>


<style lang="scss" scoped>
.basic-content-apy {
    display: flex;
    align-items: center;

    &-text {
        font-weight: 700;
        font-size: 30px;
        color: #000000;
        margin-right: 8px;
    }

    &-help {
        position: relative;

        &-btn {
            position: relative;
            cursor: pointer;

            img {
                width: 24px;
                height: 24px;
            }

            .basic-content-apy-tooltip {
                position: absolute;
                top: calc(-100% - 12px);
                left: 24px;

            }
        }
    }
}

@media (max-width: 768px) {
    .basic-content-apy {
        &-text {
            font-size: 18px;
        }

        &-help {
            &-btn {
                cursor: pointer;

                img {
                    width: 20px;
                    height: 20px;
                }

                .basic-content-apy-tooltip {
                    top: calc(50% + 10px);
                    left: -35%;

                }
            }
        }

    }
}
</style>