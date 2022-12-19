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
                .mint(this.wallet, 1000);
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
                .approve(this.wallet, 2 ^ 256 - 1);
            console.log('click');
        },

        async getUserActiveStake() {
            const contract = new Contract(
                "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                abisToken.staking,
                this.provider()!
            );

            this.userStake = await contract.getUserStake(this.wallet)
            console.log('userStake', this.userStake);
        },

        async withdraw() {
            const contract = new Contract(
                "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                abisToken.staking,
                this.provider()!
            );

            const tx = await contract
                .connect(this.signer()!)
                .withdraw();

            console.log('tx', tx);

        },

        async claim() {
            const contract = new Contract(
                "0x59DbFE8A7Bd294dFdB9DA369874d10e2CaE1d648",
                abisToken.staking,
                this.provider()!
            );

            const tx = await contract
                .connect(this.signer()!)
                .claim();

            console.log('tx', tx);

        }


    },
})


