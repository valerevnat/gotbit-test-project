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
    },
})
