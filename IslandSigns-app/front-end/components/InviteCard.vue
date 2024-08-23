<template>
    <v-dialog max-width="500" activator="parent">
        <template v-slot:default="{isActive}">
            <v-card rounded="lg" :color="theme ? 'secondaryDarkBtnColor':'bckgrnd'">
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h5 ps-2">
                        Chat Invite
                    </div>
                    <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="isActive.value = false, closeClickHandler()"
                  ></v-btn>
                </v-card-title>
                <v-divider class="mb-4"></v-divider>
                  
                <v-card-text>
                  <div class="mb-4 text-h6">
                    {{ chatInviteMetaData.from }} is inviting you to chat.
                  </div>  
                </v-card-text>
                <v-divider class="mt-2"></v-divider>
                <v-card-actions class="my-2 d-flex justify-end">
                  <v-btn
                    class="text-none"
                    rounded="xl"
                    text="Decline"
                    @click="declineInvite(),isActive.value = false,declineClickHandler()"
                  ></v-btn>
  
                  <v-btn
                    class="text-none"
                    color="secondary_a"
                    rounded="xl"
                    text="Accept"
                    variant="flat"
                    @click="isActive.value=false,showChatComponent=!showChatComponent,updateJoinStatus()"
                  ></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
    <ChatsComponent 
        v-if="showChatComponent" 
        @resetInvite="resetInviteHandler()" 
        :theme="theme"
        :showDialog="showChatComponent"
    />
</template>
<script setup>
    import { useUserProfile } from '~/store/store'
    import ChatsComponent from '~/components/ChatsComponent.vue'
    import { onChildAdded, ref as dbRef, onChildChanged } from 'firebase/database'
    import { db } from "@/utils/firebase";



    const props = defineProps({
        theme:Boolean,
        chatInviteMetaData: Object
    })

    const emit = defineEmits([
        'close','decline'
    ])

    const user = useUserProfile()
    const showChatComponent = ref(false)

    const sessionStatusRef = dbRef(db, `/sessions/${user.sessionId}/participants`)
    const authorSessionStatusRef = dbRef(db, `/sessions/${user.sessionId}/participants/createdBy`)

    onChildChanged(sessionStatusRef, (snapshot) => {
        const statusObj = snapshot.val()
        if(statusObj.name != user.fname && statusObj.status){
            user.sessionInviteeStatus = true
            console.log(isOnline)
        }
        else{
            user.sessionInviteeStatus = false
            console.log(isOnline)
        }
    })     
    // onChildChanged(authorSessionStatusRef, (snapshot) => {
    //     const isOnline = snapshot.val()
    //     if(isOnline){
    //         user.sessionInviteeStatus = true
    //         console.log(isOnline)
    //     }
    //     else{
    //         user.sessionInviteeStatus = false
    //         console.log(isOnline)

    //     }
    // })     


    function closeClickHandler(){
        return emit('close')
    }
    function declineClickHandler(){
        return emit('decline')
    }

    async function declineInvite(){
        declineClickHandler()
        return await user.declineChatInvite()
    }

    async function resetInviteHandler(){
        showChatComponent.value = false
        declineClickHandler()
        await declineInvite()
    }

    async function updateJoinStatus(){
        await user.updateSessionInviteeStatus()
    }
</script>