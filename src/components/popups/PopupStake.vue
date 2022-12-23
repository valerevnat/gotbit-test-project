<script lang="ts" setup>
import { parseUnits } from 'ethers/lib/utils';

import { useUI } from '@/stores/storeUi'
import { useToken } from '@/stores/storeToken';
import { useStaking } from '@/stores/storeStaking'

import ButtonComponent from '@/components/base/ButtonComponent.vue'
import Modal from '@/components/base/Modal.vue';

const storeUi = useUI();
const storeToken = useToken();
const storeStaking = useStaking();


const stake = async () => {
    // parseUnits("1.004", 18)
    const decimals = await storeToken.getDecimals()
    const num = parseUnits(storeUi.amountStake, decimals);
    await storeStaking.stake(num)
    await storeToken.balanceOf()
    storeUi.amountStake = ''
    storeUi.changePopupStake()
}

</script>

<template>
    <Modal v-model="storeUi.isShowPopupStake">
        <div class="modal-content-propup">
            <div class="modal-content-title">Stake</div>
            <div class="modal-content-subtitle">By pressing Comfirm you are staking {{ storeUi.amountStake }} Coins.
            </div>
            <div class="modal-content-btns">
                <ButtonComponent variant='btn-mini btn-popup' @click="storeUi.closeModal()">Cancel</ButtonComponent>
                <ButtonComponent variant='btn-mini btn-popup' class="btn-mini-bcg" @click="stake">Confirm
                </ButtonComponent>
            </div>
        </div>
    </Modal>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
</style>