<script setup lang="ts">
import { useStaking } from '@/stores/storeStaking'

const storeStaking = useStaking();

</script>


<template>
    <div class="basic-content-tvl">
        <div class="basic-content-tvl-text">
            <div class="basic-content-tvl-text-left">TVL</div>
            <div>{{ (+storeStaking.tvl / Math.pow(10, 18)).toFixed(3) }} $</div>
        </div>
        <div class="basic-content-tvl-help">
            <button data-tooltip-target="tooltip-bottom-tvl" data-tooltip-placement="bottom" type="button">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.5 0C4.98 0 0.5 4.48 0.5 10C0.5 15.52 4.98 20 10.5 20C16.02 20 20.5 15.52 20.5 10C20.5 4.48 16.02 0 10.5 0ZM11.5 17H9.5V15H11.5V17ZM13.57 9.25L12.67 10.17C12.17 10.68 11.81 11.14 11.63 11.86C11.55 12.18 11.5 12.54 11.5 13H9.5V12.5C9.5 12.04 9.58 11.6 9.72 11.19C9.92 10.61 10.25 10.09 10.67 9.67L11.91 8.41C12.37 7.97 12.59 7.31 12.46 6.61C12.33 5.89 11.77 5.28 11.07 5.08C9.96 4.77 8.93 5.4 8.6 6.35C8.48 6.72 8.17 7 7.78 7H7.48C6.9 7 6.5 6.44 6.66 5.88C7.09 4.41 8.34 3.29 9.89 3.05C11.41 2.81 12.86 3.6 13.76 4.85C14.94 6.48 14.59 8.23 13.57 9.25Z"
                        fill="grey" />
                </svg>
            </button>
            <div id="tooltip-bottom-tvl" role="tooltip"
                class="tooltip-bottom inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Total Value Locked (TVL) represents the dollar value of cryptocurrencies currently locked up on the
                staking smart contract.
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
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

            img {
                width: 24px;
                height: 24px;
            }

            .basic-content-tvl-tooltip {
                position: absolute;
                top: 25%
            }
        }

        svg:hover {
            path {
                fill: #000000;
            }

        }
    }

    &-tooltip {
        position: absolute;
        left: 100%;
    }
}

.tooltip-bottom {
    width: 300px;
}

@media (max-width: 768px) {
    .basic-content-tvl {
        &-text {
            font-size: 28px;
        }

        &-help {
            &-btn {
                cursor: pointer;

                img {
                    width: 20px;
                    height: 20px;
                }
            }
        }

        &-tooltip {
            position: absolute;
            // left: 100%;
            top: calc(100% + 10px);
            left: -35%;

        }
    }

    .tooltip-bottom {
        width: 200px;
    }
}
</style>