<script setup lang="ts">
import { useConnect } from '@/stores/storeConnect'
import { useUI } from '@/stores/storeUi'
import { ref } from 'vue';

import ButtonComponent from './base/ButtonComponent.vue'
import ComponentAPY from './ComponentAPY.vue';
import ComponentTVL from './ComponentTVL.vue';

const storeConnect = useConnect()
const storeUi = useUI();

const amount = ref('')


const handlerAmountMax = () => {
    amount.value = storeConnect.balance.toString()
}

const showEnableTransaction = () => {
    storeUi.showModal()
    storeUi.changeContent('connect-enable-transaction')
    console.log('click');

}

</script>

<template>
    <div class="metamask">
        <div>
            <ComponentAPY />
            <ComponentTVL />
        </div>
        <div class="metamask-amount">
            <label for="amount">Enter amount</label>
            <input type="text" id="amount" v-model="amount" />
            <div class="metamask-amount-max" @click="handlerAmountMax">MAX</div>
            <div class="metamask-balance">
                <div class="metamask-balance-text">Balance</div>
                <div class="metamask-balance-amount">{{ storeConnect.balance }} ABC</div>
            </div>
        </div>

        <ButtonComponent variant="btn-connect" @click="showEnableTransaction">Enable</ButtonComponent>
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
}
</style>
