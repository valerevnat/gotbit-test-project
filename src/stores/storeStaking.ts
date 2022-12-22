import { defineStore } from 'pinia'
import { BigNumber, Contract } from 'ethers'
import abis from "../assets/abis/abis.json";
import { useConnect } from './storeConnect';
import { useUI } from './storeUi';

interface IUserStake {
    amount: BigNumber,
    earnd: BigNumber,
    startTimestamp: BigNumber,
    userRewardPerTokenPaid: BigNumber
}

export const useStaking = defineStore('staking', {
    state: () => {
        const connect = useConnect()
        return {
            userStake: [] as IUserStake[],
            apy: '',
            tvl: '',
            connect
        }
    },

    actions: {

        async getUserActiveStake() {
            try {
                const contractStaking = new Contract(
                    "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                    abis.staking,
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
                    "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                    abis.staking,
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
                    "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                    abis.staking,
                    this.connect.provider()!
                );

                this.tvl = await contractStaking.totalSupply()
            } catch (error) {
                console.log('Error TVL', error);
            }

        },

        async withdraw() {
            try {
                const contractStaking = new Contract(
                    "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                    abis.staking,
                    this.connect.provider()!
                );

                const tx = await contractStaking
                    .connect(this.connect.signer()!)
                    .withdraw();
            } catch (error) {
                console.log('Error unStake (withdraw)', error);
            }

        },

        async claim() {
            try {
                const contractStaking = new Contract(
                    "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                    abis.staking,
                    this.connect.provider()!
                );

                const tx = await contractStaking
                    .connect(this.connect.signer()!)
                    .claim();
            } catch (error) {
                console.log('Error claim', error);
            }

        },

        async stake(amount: BigNumber) {
            const ui = useUI()
            ui.globalLoading = true
            try {
                const contractStaking = new Contract(
                    "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                    abis.staking,
                    this.connect.provider()!
                );

                const tx = await contractStaking
                    .connect(this.connect.signer()!)
                    .stake(amount);
            } catch (error) {
                console.log('Error stake', error);
            }
            ui.globalLoading = false

        },

    },
})


