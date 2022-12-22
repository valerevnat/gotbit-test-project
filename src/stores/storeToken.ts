import { defineStore } from 'pinia'
import { BigNumber, Contract, constants, ethers } from 'ethers'
import abis from "../assets/abis/abis.json";
import { useConnect } from './storeConnect';

export const useToken = defineStore('token', {

    state: () => {
        const connect = useConnect()
        return {
            balance: BigNumber.from(0) as BigNumber,
            symbol: "" as string,
            // allowance: false,
            allowance: '',
            connect
        }
    },

    actions: {
        async balanceOf() {
            try {
                const tokenContract = new Contract(
                    "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                    abis.token,
                    this.connect.provider()!
                );

                this.balance = await tokenContract.balanceOf(this.connect.wallet);
                console.log(this.balance.toString());
            } catch (error) {
                console.log('Error balanceOf', error);
            }
        },

        async getSymbol() {
            try {
                const tokenContract = new Contract(
                    "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                    abis.token,
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
                    "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                    abis.token,
                    this.connect.provider()!
                );
                this.allowance = await tokenContract.allowance(this.connect.wallet, '0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648')
            } catch (error) {
                console.log('Error allowance', error);
            }

        },

        // async getAllowance() {
        //     try {
        //         const tokenContract = new Contract(
        //             "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
        //             abis.token,
        //             this.connect.provider()!
        //         );
        //         const allowance = await tokenContract.allowance(this.connect.wallet, '0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648')
        //         this.allowance = allowance > ethers.constants.MaxUint256.div(2)
        //     } catch (error) {
        //         console.log('Error allowance', error);
        //     }

        // },

        async mint() {
            try {
                const tokenContract = new Contract(
                    "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                    abis.token,
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
            try {
                const tokenContract = new Contract(
                    "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                    abis.token,
                    this.connect.provider()!
                );

                const tx = await tokenContract
                    .connect(this.connect.signer()!)
                    .approve("0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648", constants.MaxUint256);
            } catch (error) {
                console.log('Error approve', error);
            }

        },

    },
})


