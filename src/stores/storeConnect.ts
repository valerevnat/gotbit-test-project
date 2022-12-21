import { defineStore } from 'pinia'
import { BigNumber, providers, Contract, constants } from 'ethers'
import abisToken from "../assets/abis/token.json";
declare let window: any

interface IUserStake {
    amount: BigNumber,
    earnd: BigNumber,
    startTimestamp: BigNumber,
    userRewardPerTokenPaid: BigNumber
}

export const useConnect = defineStore('connect', {
    state: () => {
        return {
            connected: false as boolean,
            balance: BigNumber.from(0) as BigNumber,
            signer: () => null as null | providers.JsonRpcSigner,
            wallet: "" as string,
            provider: () => null as null | providers.JsonRpcProvider,
            symbol: "" as string,
            userStake: [] as IUserStake[],
            apy: '' as string,
            tvl: '' as string,
            allowance: '' as string
        }
    },

    actions: {
        async connectMetamask() {
            if (window.ethereum) {
                console.log("MetaMask is installed!");
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    this.wallet = accounts[0];
                    const provider = new providers.Web3Provider(
                        ((window as any).ethereum as any) || (window as any).web3
                    );

                    this.signer = () => provider.getSigner();

                    this.provider = () => new providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
                    console.log(accounts);
                } catch (error) {
                    console.log("Error connecting...", error);
                }
            } else {
                console.log("MetaMask not detected");
            }
        },

        async balanceOf() {

            try {
                const tokenContract = new Contract(
                    "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                    abisToken.token,
                    this.provider()!
                );

                this.balance = await tokenContract.balanceOf(this.wallet);
                console.log(this.balance.toString());
            } catch (error) {
                console.log('Error balanceOf', error);

            }

        },

        async getSymbol() {
            try {
                const tokenContract = new Contract(
                    "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                    abisToken.token,
                    this.provider()!
                );

                this.symbol = await tokenContract.symbol();
            } catch (error) {
                console.log('Error Symbol', error);
            }

        },

        async mint() {
            try {
                const tokenContract = new Contract(
                    "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                    abisToken.token,
                    this.provider()!
                );

                const tx = await tokenContract
                    .connect(this.signer()!)
                    .mint(this.wallet, BigNumber.from('100000000000000000000'));
            } catch (error) {
                console.log('Error mint', error);
            }

        },
        async approve() {
            try {
                const tokenContract = new Contract(
                    "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                    abisToken.token,
                    this.provider()!
                );

                const tx = await tokenContract
                    .connect(this.signer()!)
                    .approve("0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648", constants.MaxUint256);
            } catch (error) {
                console.log('Error approve', error);
            }

        },

        async getUserActiveStake() {
            try {
                const contractStaking = new Contract(
                    "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                    abisToken.staking,
                    this.provider()!
                );

                this.userStake = await contractStaking.getUserStake(this.wallet)
            } catch (error) {
                console.log('Error userStake', error);
            }

        },

        async getAPY() {
            try {
                const contractStaking = new Contract(
                    "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                    abisToken.staking,
                    this.provider()!
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
                    abisToken.staking,
                    this.provider()!
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
                    abisToken.staking,
                    this.provider()!
                );

                const tx = await contractStaking
                    .connect(this.signer()!)
                    .withdraw();
            } catch (error) {
                console.log('Error unStake (withdraw)', error);
            }

        },

        async claim() {
            try {
                const contractStaking = new Contract(
                    "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                    abisToken.staking,
                    this.provider()!
                );

                const tx = await contractStaking
                    .connect(this.signer()!)
                    .claim();
            } catch (error) {
                console.log('Error claim', error);
            }

        },

        async stake(amount: BigNumber) {
            try {
                const contractStaking = new Contract(
                    "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                    abisToken.staking,
                    this.provider()!
                );

                const tx = await contractStaking
                    .connect(this.signer()!)
                    .stake(amount);
            } catch (error) {
                console.log('Error stake', error);
            }

        },

        async getAllowance() {
            try {
                const tokenContract = new Contract(
                    "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                    abisToken.token,
                    this.provider()!
                );
                this.allowance = await tokenContract.allowance(this.wallet, '0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648')
            } catch (error) {
                console.log('Error allowance', error);
            }

        },



    },
})


