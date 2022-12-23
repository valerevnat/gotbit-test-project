import { defineStore } from 'pinia'
import { BigNumber, Contract } from 'ethers'
import contracts from "@/assets/contracts/contracts.json";
import { useUser } from '@/stores/storeUser';
import { useUI } from './storeUi';

export interface UserStake {
    amount: BigNumber,
    earnd: BigNumber,
    startTimestamp: BigNumber,
    userRewardPerTokenPaid: BigNumber
}

export const useStaking = defineStore('staking', {
    state: () => {
        const connect = useUser()
        return {
            userStake: [] as UserStake[],
            apy: '',
            tvl: '',
            connect
        }
    },

    actions: {
        async getUserActiveStake() {
            try {
                const contractStaking = new Contract(
                    contracts.staking[0].address,
                    contracts.staking[0].abi,
                    this.connect.provider()!
                );
                this.userStake = await contractStaking.getUserStake(this.connect.wallet)
            } catch (error) {
                console.log('Error userStake', error);
            }
        },

        async getAPY() {
            try {
                const contractStaking = new Contract(
                    contracts.staking[0].address,
                    contracts.staking[0].abi,
                    this.connect.provider()!
                );

                this.apy = await contractStaking.getAPY()
            } catch (error) {
                console.log('Error APY', error);
            }
        },

        async getTVL() {
            try {
                const contractStaking = new Contract(
                    contracts.staking[0].address,
                    contracts.staking[0].abi,
                    this.connect.provider()!
                );

                this.tvl = await contractStaking.totalSupply()
            } catch (error) {
                console.log('Error TVL', error);
            }
        },

        async withdraw() {
            const ui = useUI()
            ui.createAlert('loading', 'Waiting for your tokens', 'It will take some time for the transaction to be completed.')
            ui.alert.visible = true
            try {
                const contractStaking = new Contract(
                    contracts.staking[0].address,
                    contracts.staking[0].abi,
                    this.connect.provider()!
                );

                const tx = await contractStaking
                    .connect(this.connect.signer()!)
                    .withdraw();
                ui.createAlert('success', 'Waiting for your tokens', 'Congratulations! Your unstake transaction is completed.')
            } catch (error) {
                console.log('Error unStake (withdraw)', error);
                ui.createAlert('error', 'Error', 'We couldn’t proceed your stake. Please try again!')
            }
        },

        async claim() {
            const ui = useUI()
            ui.createAlert('loading', 'Waiting for your tokens', 'It will take some time for the transaction to be completed.')
            ui.alert.visible = true
            try {
                const contractStaking = new Contract(
                    contracts.staking[0].address,
                    contracts.staking[0].abi,
                    this.connect.provider()!
                );

                const tx = await contractStaking
                    .connect(this.connect.signer()!)
                    .claim();
                ui.createAlert('success', 'Waiting for your tokens', 'Congratulations! Your claim transaction is completed.')
            } catch (error) {
                console.log('Error claim', error);
                ui.createAlert('error', 'Error', 'We couldn’t proceed your claim. Please try again!')
            }


        },

        async stake(amount: BigNumber) {
            const ui = useUI()
            ui.createAlert('loading', 'Waiting for your tokens', 'It will take some time for the transaction to be completed.')
            ui.alert.visible = true
            try {
                const contractStaking = new Contract(
                    contracts.staking[0].address,
                    contracts.staking[0].abi,
                    this.connect.provider()!
                );

                const tx = await contractStaking
                    .connect(this.connect.signer()!)
                    .stake(amount);
                ui.createAlert('success', 'Waiting for your tokens', 'Congratulations! Your stake transaction is completed.')
            } catch (error) {
                console.log('Error stake', error);
                ui.createAlert('error', 'Error', 'We couldn’t proceed your stake. Please try again!')
            }
        },

    },
})


