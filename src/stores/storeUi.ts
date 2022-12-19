import { defineStore } from 'pinia'


export const useUI = defineStore('uiStore', {
    state: () => {
        return {
            isShowModal: false,
            isDisabled: false,
            content: 'not-connect',
            contentStake: ''
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

        changeContentStake(payload: string) {
            this.contentStake = payload
        }
    },
})
