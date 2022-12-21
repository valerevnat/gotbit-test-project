import { defineStore } from 'pinia'


export const useUI = defineStore('uiStore', {
    state: () => {
        return {
            isShowModal: false as boolean,
            isDisabled: false as boolean,
            content: 'not-connect' as string,
            contentModal: '' as string,
            contentStake: '' as string,
            amountStake: '' as string
        }
    },

    actions: {
        showModal() {
            this.isShowModal = !this.isShowModal
            console.log(this.isShowModal);
        },

        changeContent(payload: string) {
            this.content = payload
        },

        changeContentModal(payload: string) {
            this.contentModal = payload
        },

        changeContentStake(payload: string) {
            this.contentStake = payload
        },
        changeAmountStake(payload: string) {
            this.amountStake = payload
        }
    },
})
