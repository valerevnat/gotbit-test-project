import { defineStore } from 'pinia'
import { BigNumber, Contract, constants, ethers } from 'ethers'
import contracts from "@/assets/contracts/contracts.json";
import { useUser } from '@/stores/storeUser';
import { useUI } from '@/stores/storeUi';

export const useToken = defineStore('token', {

    state: () => {
        const connect = useUser()
        return {
            connect,
            balance: BigNumber.from(0) as BigNumber,
            symbol: "",
            allowance: false,
            decimals: ""
        }
    },

    actions: {
        async balanceOf() {
            try {
                const tokenContract = new Contract(
                    contracts.token[0].address,
                    contracts.token[0].abi,
                    this.connect.provider()!
                );

                this.balance = await tokenContract.balanceOf(this.connect.wallet);
            } catch (error) {
                console.log('Error balanceOf', error);
            }
        },
        async getDecimals() {
            try {
                const tokenContract = new Contract(
                    contracts.token[0].address,
                    contracts.token[0].abi,
                    this.connect.provider()!
                );

                this.decimals = await tokenContract.decimals();
            } catch (error) {
                console.log('Error decimals', error);
            }
        },

        async getSymbol() {
            try {
                const tokenContract = new Contract(
                    contracts.token[0].address,
                    contracts.token[0].abi,
                    this.connect.provider()!
                );

                this.symbol = await tokenContract.symbol();
            } catch (error) {
                console.log('Error Symbol', error);
            }

        },
        async getAllowance() {
            try {
                const tokenContract = new Contract(
                    contracts.token[0].address,
                    contracts.token[0].abi,
                    this.connect.provider()!
                );
                const allowance = await tokenContract.allowance(this.connect.wallet, contracts.staking[0].address)
                this.allowance = allowance.gte(ethers.constants.MaxUint256.div(2))
            } catch (error) {
                console.log('Error allowance', error);
            }

        },

        async mint() {
            try {
                const tokenContract = new Contract(
                    contracts.token[0].address,
                    contracts.token[0].abi,
                    this.connect.provider()!
                );

                const tx = await tokenContract
                    .connect(this.connect.signer()!)
                    .mint(this.connect.wallet, BigNumber.from('100000000000000000000'));
            } catch (error) {
                console.log('Error mint', error);
            }

        },

        async approve() {
            const ui = useUI()
            ui.createAlert('loading', 'Waiting for confirmation', 'It will take some time for the confirmation to be completed.')
            ui.alert.visible = true
            try {
                const tokenContract = new Contract(
                    contracts.token[0].address,
                    contracts.token[0].abi,
                    this.connect.provider()!
                );

                const tx = await tokenContract
                    .connect(this.connect.signer()!)
                    .approve(contracts.staking[0].address, constants.MaxUint256);
                ui.createAlert('success', 'Waiting for confirmation', 'Congratulations! Confirmation is completed.')
            } catch (error) {
                console.log('Error approve', error);
                ui.createAlert('error', 'Error', 'We couldn’t proceed your approve. Please try again!')
            }
        },

    },
})


