import { defineStore } from 'pinia'
import { providers } from 'ethers'
declare let window: any

//storeUser

export const useUser = defineStore('user', {
    state: () => {
        return {
            wallet: "",
            connected: false as boolean,
            signer: () => null as null | providers.JsonRpcSigner,
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

                } catch (error) {
                    console.log("Error connecting...", error);
                }
            } else {
                console.log("MetaMask not detected");
            }
        },
    }

})


