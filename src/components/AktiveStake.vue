<script setup lang="ts">

import ButtonComponent from './base/ButtonComponent.vue';

</script>

<template>
    <div class="active-stake">
        <div class="active-stake-title">Active Stake</div>
        <div class="active-stake-info">
            <div class="active-stake-info-main">
                <div>
                    <div class="active-stake-info-text">You have staked</div>
                    <div class="active-stake-info-coin">
                        <div class="active-stake-info-coin-number"></div>
                        <div class="active-stake-info-coin-text">Coin</div>
                    </div>
                </div>
                <div>
                    <div class="active-stake-info-text">Earned</div>
                    <div class="active-stake-info-coin">
                        <div class="active-stake-info-coin-number"></div>
                        <div class="active-stake-info-coin-text">Coin</div>
                    </div>
                </div>
                <div class="active-stake-info-btn">
                    <ButtonComponent>Claim</ButtonComponent>
                </div>
            </div>
            <ButtonComponent>Unstake</ButtonComponent>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
