import { defineStore } from 'pinia'


export const useUI = defineStore('uiStore', {
    state: () => {
        return {
            isShowModal: false,
            isDisabled: false,
            content: 'not-connect',
            contentModal: '',
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

        changeContentModal(payload: string) {
            this.contentModal = payload
        },

        changeContentStake(payload: string) {
            this.contentStake = payload
        }
    },
})