<script setup lang="ts">
import { useToken } from '@/stores/storeToken';
import { useStaking } from '@/stores/storeStaking'
import { useUI } from '@/stores/storeUi'
import { onMounted } from 'vue';

import ButtonComponent from '@/components/base/ButtonComponent.vue'

const storeUi = useUI();
const storeToken = useToken();
const storeStaking = useStaking();

onMounted(() => {
    storeStaking.getAPY();
    storeStaking.getTVL();
    storeToken.getAllowance();
    storeStaking.getUserActiveStake()
})

const showEnableTransaction = () => {
    storeUi.changePopupEnableTransaction()

}

const handlerStake = async () => {
    if (!storeUi.amountStake) {
        return null
    }
    storeUi.changeAmountStake(storeUi.amountStake)
    storeUi.changePopupStake()
}

const handlerMax = () => {
    storeUi.amountStake = `${+storeToken.balance / Math.pow(10, 18)}`
}

</script>

<template>
    <div class="metamask">
        <div class="metamask-amount">
            <label for="amount">Enter amount</label>
            <input type="text" id="amount" v-model="storeUi.amountStake"
                :placeholder="`${+storeToken.balance / Math.pow(10, 18)} ${storeToken.symbol}`" />
            <div class="metamask-amount-max" @click="handlerMax">MAX</div>
            <div class="metamask-balance">
                <div class="metamask-balance-text">Balance</div>
                <div class="metamask-balance-amount">{{ +storeToken.balance / Math.pow(10, 18) }} {{
                        storeToken.symbol
                }}
                </div>
            </div>
        </div>

        <ButtonComponent v-if="!storeToken.allowance" variant="btn-connect" @click="showEnableTransaction">Enable
        </ButtonComponent>

        <ButtonComponent v-if="storeToken.allowance" variant="btn-main btn-connect" @click="handlerStake"
            :class="storeUi.amountStake ? '' : 'btn-disabled'">Stake
        </ButtonComponent>
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.metamask {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 621px;
    height: 370px;
    padding: 0 97px;

    &-apy-tvl {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    &-amount {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;

        input {
            height: 56px;
            padding: 0 16px;
            border: 2px solid #D7D8DF;
            border-radius: 8px;
            font-weight: 400;
            font-size: 20px;
        }

        &-max {
            position: absolute;
            bottom: 37.5%;
            right: 16px;
            color: #000;
            cursor: pointer;

            &:hover {
                color: $main-color;
            }
        }
    }

    &-balance {
        display: flex;
        justify-content: space-between;
    }

    .btn-disabled {
        opacity: 0.5;
    }
}
</style>
