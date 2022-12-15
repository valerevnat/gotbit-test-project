<script setup lang="ts">

// import { ref } from "vue";
// import ToolTip from "./base/ToolTip.vue";
import ButtonComponent from "./base/ButtonComponent.vue";
import ComponentAPY from './ComponentAPY.vue';
import ComponentTVL from './ComponentTVL.vue';


const props = defineProps({
    handlerShowModal: {
        type: Function,
    }
})

const showModal = () => {
    //@ts-ignore
    props.handlerShowModal()
}

</script>

<template>
    <div class="basic-content">
        <div>
            <ComponentAPY />
            <ComponentTVL />
        </div>

        <div class="basic-content-img">
            <img src="../assets/img/basic-main-screen.png" alt="help" />
        </div>
        <div class="basic-content-btn">
            <ButtonComponent variant='btn-main' @click="showModal"> Connect wallet </ButtonComponent>
        </div>
    </div>
</template>

<style scoped lang="scss">
.basic-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: space-between;
}
</style>
