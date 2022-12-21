<script setup lang="ts">
import { useConnect } from '@/stores/storeConnect'
import { useUI } from '@/stores/storeUi'
// import { parseEther } from 'ethers/lib/utils';
import { onMounted, ref } from 'vue';

import ButtonComponent from './base/ButtonComponent.vue'
import ComponentAPY from './ComponentAPY.vue';
import ComponentTVL from './ComponentTVL.vue';

const storeConnect = useConnect()
const storeUi = useUI();

const balance = ref()
balance.value = +storeConnect.balance / Math.pow(10, 18)

onMounted(() => {
    storeConnect.getAPY();
    storeConnect.getTVL();
    storeConnect.getAllowance();
    storeConnect.getUserActiveStake()
})

const showEnableTransaction = () => {
    storeUi.showModal()
    storeUi.changeContentModal('connect-enable-transaction')
    console.log('click');

}

const handlerStake = async () => {
    if (!storeUi.amountStake) {
        return null
    }
    storeUi.changeContentModal('stake-ok')
    storeUi.showModal()
    storeUi.changeAmountStake(storeUi.amountStake)

}

const handlerMax = () => {
    storeUi.amountStake = `${+storeConnect.balance / Math.pow(10, 18)}`
}

</script>

<template>
    <div class="metamask">
        <div class="metamask-apy-tvl">
            <ComponentAPY />
            <ComponentTVL />
        </div>
        <!-- <div>{{ amount }}</div> -->
        <!-- <div> {{ storeUi.amountStake }}</div> -->
        <div class="metamask-amount">
            <label for="amount">Enter amount</label>
            <input type="text" id="amount" v-model="storeUi.amountStake"
                :placeholder="`${+storeConnect.balance / Math.pow(10, 18)} ${storeConnect.symbol}`" />
            <div class="metamask-amount-max" @click="handlerMax">MAX</div>
            <div class="metamask-balance">
                <div class="metamask-balance-text">Balance</div>
                <div class="metamask-balance-amount">{{ +storeConnect.balance / Math.pow(10, 18) }} {{
                        storeConnect.symbol
                }}
                </div>
            </div>
        </div>

        <ButtonComponent v-if="!storeConnect.allowance" variant="btn-connect" @click="showEnableTransaction">Enable
        </ButtonComponent>

        <ButtonComponent v-if="storeConnect.allowance" variant="btn-main btn-connect" @click="handlerStake"
            :class="storeUi.amountStake ? '' : 'btn-disabled'">Stake
        </ButtonComponent>
    </div>

</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';

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
