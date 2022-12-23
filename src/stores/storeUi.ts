import { defineStore } from 'pinia'

export const useUI = defineStore('uiStore', {
    state: () => {
        return {
            isShowModal: false,
            isDisabled: false,
            content: 'not-connect',
            contentStake: '',
            amountStake: '',
            globalLoading: false,

            isShowPopupConnectWallet: false,
            isShowPopupEnableTransaction: false,
            // isShowAlert: false,
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
            //...
            this.alert.visible = true
            //для управления alert, чтобы не писать логику внутри
        },
        // changeAlert() {
        //     this.isShowAlert = !this.isShowAlert
        // },

        showModal() {
            this.isShowModal = !this.isShowModal
            console.log(this.isShowModal);
        },

        changeContent(payload: string) {
            this.content = payload
        },

        changeContentStake(payload: string) {
            this.contentStake = payload
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
        changePopupWaiting() {
            this.isShowPopupWaiting = !this.isShowPopupWaiting
        },
        changeLoadingForWaiting() {
            this.isloadingForWaiting = !this.isloadingForWaiting
        },

        closeModal() {
            this.isShowPopupConnectWallet = false;
            this.isShowPopupEnableTransaction = false;
            this.isShowPopupWaiting = false;
            this.isShowPopupUnstake = false;
            this.isShowPopupClaim = false;
            this.isShowPopupStake = false;
        }
    },
})
