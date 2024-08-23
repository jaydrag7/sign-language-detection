<template>
    <v-btn
        class="mt-3 ml-6"
        style="text-transform: none;"
        text="Join"
        color="secondary_a"
        prepend-icon="mdi-location-enter"
        @click="showChatComponent=!showChatComponent,updateJoinStatus()"
    />
    <ChatsComponent
        v-if="showChatComponent"
        :theme="theme"
        :showDialog="showChatComponent"
        @resetInvite="resetInviteHandler()" 
    />

</template>
<script setup>
    import ChatsComponent from '~/components/ChatsComponent'
    import { useUserProfile } from '~/store/store'
    import { onChildAdded, ref as dbRef, onChildChanged } from 'firebase/database'
    import { db } from "@/utils/firebase"


    const props = defineProps({
        theme: Boolean
    })
    const emits = defineEmits(['resetInvite'])
    const user = useUserProfile()
    const showChatComponent = ref(false)


    function resetInviteHandler(){
        showChatComponent.value = false
        emits('resetInvite')
    }

    async function updateJoinStatus(){
        return await user.updateSessionAuthorStatus()
    }
</script>