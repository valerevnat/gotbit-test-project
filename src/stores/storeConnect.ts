import { defineStore } from 'pinia'
import { BigNumber, providers, Contract } from 'ethers'
import abisToken from "../assets/abis/token.json";

export const useConnect = defineStore('connect', {
    state: () => {
        return {
            connected: false,
            balance: BigNumber.from(0),
            signer: () => null as null | providers.JsonRpcSigner,
            wallet: "",
            provider: () => null as null | providers.JsonRpcProvider,
            symbol: "",
            userStake: [],
            apy: '',
            tvl: ''
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
            const tokenContract = new Contract(
                "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                abisToken.token,
                this.provider()!
            );

            this.balance = await tokenContract.balanceOf(this.wallet);
            console.log(this.balance.toString());
        },

        async getSymbol() {
            const tokenContract = new Contract(
                "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                abisToken.token,
                this.provider()!
            );

            this.symbol = await tokenContract.symbol();
            console.log('symbol', this.symbol);
        },

        async mint() {
            const tokenContract = new Contract(
                "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                abisToken.token,
                this.provider()!
            );

            const tx = await tokenContract
                .connect(this.signer()!)
                .mint(this.wallet, BigNumber.from('100000000000000000000'));
            console.log(this.balance.toString());
        },
        async approve() {
            const tokenContract = new Contract(
                "0xf39e079A05BF67421e8bf881f2297c8eE9a2A004",
                abisToken.token,
                this.provider()!
            );

            const tx = await tokenContract
                .connect(this.signer()!)
                .approve("0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648", BigNumber.from('100000000000000000000'));
            console.log('click');
        },

        async getUserActiveStake() {
            const contractStaking = new Contract(
                "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                abisToken.staking,
                this.provider()!
            );

            this.userStake = await contractStaking.getUserStake(this.wallet)
            console.log('userStake', this.userStake);
        },

        async getAPY() {
            const contractStaking = new Contract(
                "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                abisToken.staking,
                this.provider()!
            );

            this.apy = await contractStaking.getAPY()
            console.log('APY', this.apy);
        },

        async getTVL() {
            const contractStaking = new Contract(
                "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                abisToken.staking,
                this.provider()!
            );

            this.apy = await contractStaking.totalSupply()
            console.log('TVL', this.tvl);
        },

        async withdraw() {
            const contractStaking = new Contract(
                "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                abisToken.staking,
                this.provider()!
            );

            const tx = await contractStaking
                .connect(this.signer()!)
                .withdraw();
        },

        async claim() {
            const contractStaking = new Contract(
                "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                abisToken.staking,
                this.provider()!
            );

            const tx = await contractStaking
                .connect(this.signer()!)
                .claim();
        },

        async stake() {
            const contractStaking = new Contract(
                "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                abisToken.staking,
                this.provider()!
            );

            const tx = await contractStaking
                .connect(this.signer()!)
                .stake(BigNumber.from('1000000000000000000'));
        },


    },
})


