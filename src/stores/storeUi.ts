import { defineStore } from 'pinia'

export const useUI = defineStore('uiStore', {
    state: () => {
        return {
            isDisabled: false,
            content: 'not-connect',
            amountStake: '',

            isShowPopupConnectWallet: false,
            isShowPopupEnableTransaction: false,
            isShowPopupUnstake: false,
            isShowPopupClaim: false,
            isShowPopupStake: false,
            isloadingForWaiting: false,

            alert: {
                status: 'loading',
                header: '',
                description: '',
                visible: false
            }
        }
    },

    actions: {
        createAlert(status: string, header: string, description: string) {
            this.alert.status = status
            this.alert.header = header
            this.alert.description = description
            this.alert.visible = true
        },

        changeContent(payload: string) {
            this.content = payload
        },

        changeAmountStake(payload: string) {
            this.amountStake = payload
        },

        changePopupConnectWallet() {
            this.isShowPopupConnectWallet = !this.isShowPopupConnectWallet
        },

        changePopupEnableTransaction() {
            this.isShowPopupEnableTransaction = !this.isShowPopupEnableTransaction
        },

        changePopupStake() {
            this.isShowPopupStake = !this.isShowPopupStake
        },

        changePopupClaim() {
            this.isShowPopupClaim = !this.isShowPopupClaim
        },

        changePopupUnstake() {
            this.isShowPopupUnstake = !this.isShowPopupUnstake
        },

        closeModal() {
            this.isShowPopupConnectWallet = false;
            this.isShowPopupEnableTransaction = false;
            this.isShowPopupUnstake = false;
            this.isShowPopupClaim = false;
            this.isShowPopupStake = false;
            this.alert.visible = false;
        }
    },
})
