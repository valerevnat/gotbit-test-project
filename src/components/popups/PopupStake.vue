<script lang="ts" setup>
import { parseEther } from 'ethers/lib/utils';

import { useUI } from '@/stores/storeUi'
import { useToken } from '@/stores/storeToken';
import { useStaking } from '@/stores/storeStaking'

import ButtonComponent from '@/components/base/ButtonComponent.vue'
import Modal from '@/components/base/Modal.vue';

const storeUi = useUI();
const storeToken = useToken();
const storeStaking = useStaking();


const approveStake = async () => {
    const num = parseEther(storeUi.amountStake);
    await storeStaking.stake(num)
    await storeToken.balanceOf()
    storeUi.amountStake = ''
    storeUi.closeModal()

}

</script>

<template>
    <Modal>
        <div class="modal-content-propup">
            <div class="modal-content-title">Stake</div>
            <div class="modal-content-subtitle">By pressing Comfirm you are staking 1000 Coins.
            </div>
            <div class="modal-content-btns">
                <ButtonComponent variant='btn-mini' @click="storeUi.closeModal()">Cancel</ButtonComponent>
                <ButtonComponent variant='btn-mini' class="btn-mini-bcg" @click="approveStake">Confirm
                </ButtonComponent>
            </div>
        </div>
    </Modal>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
</style>