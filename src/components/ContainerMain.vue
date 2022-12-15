<script setup lang="ts">

import { ref } from 'vue';
import { ethers } from 'ethers';

import ModalWindow from './base/ModalWindow.vue';
import BasicContent from './BasicContent.vue';
import ButtonComponent from './base/ButtonComponent.vue';
import ConectMetaMask from './ConnectMetaMask.vue'

// const CONTRACT_ADDRESS = '0x12431F18Cb02163342AB8FBed5d43c30Da5e59bC';
// const ABI = [
//     "function balanceOf(address owner) view returns (uint256)",
// ];


const show = ref<boolean>(false)
const content = ref<string>('basic-content')


const handlerShowModal = () => {
    show.value = !show.value
}


// MetaMask перенести в пиниа 

// const instanceOwner = ref('');
// const offerPrice = ref('');


// сохранить текущий адрес кошелька
const walletAddress = ref<string>('');

async function requestAccount() {
    console.log('Request account...');
    // проверяем, если метамаск существует
    if (window.ethereum) {
        console.log('MetaMask is installed!')
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            walletAddress.value = accounts[0]
            console.log(accounts);

        } catch (error) {
            console.log('Error connecting...', error);
        }
    } else {
        console.log('MetaMask not detected');

    }

}

async function connectWallet() {
    // проверяем, существует ли матемаск
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();

        //С помощью провайдера мы подключаемся к сети Blockcain
        const provider = new ethers.providers.Web3Provider(window.ethereum); // этот провайдер мы можем использвать для взаимодействия со смарт-кантрактом

        //Дает нам возможность читать view методы контракта
        // const readOnlyContract = new ethers.Contract()
        // console.log('readOnlyContract', readOnlyContract);


        //signer нужен для подтверждения транзакций
        const signer = provider.getSigner();
        // const erc20 = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        // const erc20_rw = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    }
}

</script>

<template>
    <div class="container">
        <div>Wallet address: {{ walletAddress }}</div>

        <!-- удалить блок -->
        <!-- <div id="app"> -->
        <!-- <button v-on:click="details">Get details</button> -->
        <!-- <h3>Instance owner: {{ instanceOwner }}</h3> -->
        <!-- <h3>Description: {{ description }}</h3>
            <h3>Asking price: {{ askingPrice }}</h3>
            <h3>Instance buyer: {{ instanceBuyer }}</h3>-->
        <!-- <h3>Offer price: {{ offerPrice }}</h3> -->
        <!-- </div> -->
        <!-- удалить блок -->


        <div class="title">
            <div class="title-left">Flexible</div>
            <div class="title-right">Staking</div>
        </div>
        <div class="container-content">
            <BasicContent v-if="content === 'basic-content'" :handlerShowModal="handlerShowModal" />
            <ConectMetaMask v-if="content === 'conect-metaMask'" />
            <ModalWindow @showModal="handlerShowModal" :show="show">
                <ButtonComponent variant='btn-metamask' @click="requestAccount">
                    <div class="modal-content-main">
                        <img src="../assets/img/logo-mask.png" alt="MetaMask" />
                        <div class="modal-content-main-text">MetaMask</div>
                    </div>
                </ButtonComponent>
                <ButtonComponent variant='btn-metamask' @click="connectWallet">
                    <div class="modal-content-main">
                        <img src="../assets/img/logo-mask.png" alt="MetaMask" />
                        <div class="modal-content-main-text">MetaMask Provider</div>
                    </div>
                </ButtonComponent>
            </ModalWindow>
        </div>

    </div>
    <!-- <ModalWindow @showModal="handlerShowModal" :show="show" />
    <ToolTip @showTooltip="showTooltip" :tooltip="tooltip" />
    <ButtonComponent variant='btn-mini' />
    <button @click="showTooltip">Нажать</button> -->
</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 44px;

    .title {
        display: flex;
        justify-content: center;
        align-items: center;

        &-left,
        &-right {
            font-weight: 900;
            font-size: 64px;
        }

        &-left {
            color: $main-color;
        }
    }

    &-content {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        border-radius: 24px;
        width: 70vw;
        height: 60vh;
        padding: 40px 0 40px 0;

        .modal-content-main {
            display: flex;
            justify-content: center;
            align-items: center;

            &-text {
                font-weight: 500;
                font-size: 20px;
                color: #191A1B;
            }
        }
    }

}
</style>
