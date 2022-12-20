<script setup lang="ts">
import { useConnect } from '@/stores/storeConnect'
import { useUI } from '@/stores/storeUi'
import { onMounted, ref } from 'vue';

import ButtonComponent from './base/ButtonComponent.vue'
import ComponentAPY from './ComponentAPY.vue';
import ComponentTVL from './ComponentTVL.vue';
// import ActiveStake from './ActiveStake.vue';

const storeConnect = useConnect()
const storeUi = useUI();

const amount = ref('')
const balance = ref()
balance.value = +storeConnect.balance / 1000000000000000000

onMounted(() => {
    storeConnect.getAPY();
    storeConnect.getTVL();
})

const showEnableTransaction = () => {
    storeUi.showModal()
    storeUi.changeContentModal('connect-enable-transaction')
    console.log('click');

}

const handlerStake = () => {
    storeConnect.stake()
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
            <input type="text" id="amount" v-model="amount" disabled
                :placeholder="`${balance} ${storeConnect.symbol}`" />
            <div class="metamask-amount-max">MAX</div>
            <div class="metamask-balance">
                <div class="metamask-balance-text">Balance</div>
                <div class="metamask-balance-amount">{{ balance }} {{ storeConnect.symbol }}
                </div>
            </div>
        </div>

        <ButtonComponent v-if="storeUi.contentStake !== 'active-stake' && storeUi.content === 'connect-card'"
            variant="btn-connect" @click="showEnableTransaction">Enable</ButtonComponent>
        <!-- <ButtonComponent v-if="storeUi.contentStake === 'active-stake'" variant="btn-main-disabled">Stake
        </ButtonComponent> -->
        <ButtonComponent v-if="storeUi.contentStake === 'active-stake'" variant="btn-main btn-connect"
            @click="handlerStake">Stake
        </ButtonComponent>
    </div>

    <!-- <ActiveStake v-if="storeUi.contentStake === 'active-stake'" /> -->


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
            color: $main-color;
        }
    }

    &-balance {
        display: flex;
        justify-content: space-between;
    }
}
</style>
