<template>
    <v-row class="justify-end mt-4 mr-5">
        <v-btn
          class="mt-n1"
          prepend-icon="mdi-account-multiple-outline"
          variant="tonal"
        >
          <div class="text-none font-weight-regular">
            Invite
          </div>
  
          <v-dialog activator="parent" max-width="500">
            <template v-slot:default="{ isActive }">
              <v-card rounded="lg" :color="theme ? 'secondaryDarkBtnColor':'bckgrnd'">
                <v-card-title class="d-flex justify-space-between align-center">
                  <div class="text-h5 ps-2">
                    Invite a Friend
                  </div>
  
                  <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="invitePrompt = '', userInvite = '', userExists = false, isActive.value = false"
                  ></v-btn>
                </v-card-title>
  
                <v-divider class="mb-4"></v-divider>  
                <v-card-text>
                  <div>
                    <v-img height="200" src="friends_b.png"/>

                  </div>
                  <div class="mb-4">
                    Invite someone to your chat and grow your connections.
                  </div>  
                  <v-textarea
                    v-model="userInvite"
                    class="mb-2"
                    rows="1"
                    variant="outlined"
                    placeholder="username"
                    clearable
                  ></v-textarea>  
                  <div class="mb-4 text-caption">
                    Copy your session code
                  </div>  
                  <v-textarea
                    :value="codeToCopy"
                    class="mb-2"
                    rows="1"
                    variant="solo"
                    :append-inner-icon="copied ? 'mdi-check':'mdi-content-copy'"
                    @click:append-inner="copy()"
                    bg-color="bckgrnd"
                  ></v-textarea>  
                  <span :class="{'text-color-success':userExists,'text-color-fail':!userExists}">{{ invitePrompt }}</span>
                </v-card-text>
  
                <v-divider class="mt-2"></v-divider>
  
                <v-card-actions class="my-2 d-flex justify-end">
                  <v-btn
                    class="text-none"
                    rounded="xl"
                    text="Cancel"
                    @click="invitePrompt = '', userInvite = '', userExists = false, isActive.value = false"
                  ></v-btn>
  
                  <v-btn
                    :disabled="isInviteAreaEmpty()"
                    class="text-none"
                    color="primary"
                    rounded="xl"
                    text="Send"
                    variant="flat"
                    @click="sendInvite()"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-btn>

    </v-row>
  </template>
<script setup>
    import { ref } from 'vue'
    import { useUserProfile } from '~/store/store'
    import { useClipboard } from '@vueuse/core'

    const props = defineProps({
        theme: Boolean,
    })
    const user = useUserProfile()


    const userInvite = ref('')
    const invitePrompt = ref('')
    const userExists = ref(false)
    const codeToCopy = ref(user.sessionId)
    const {copy,copied} = useClipboard({source:codeToCopy})

    function isInviteAreaEmpty(){
        return userInvite.value ===""
    }
    async function sendInvite(){
        await user.getUsers()
        const clientsMetaData = Object.values(user.users)
        const clients = Object.keys(user.users)
        clientsMetaData.forEach(async (data,index) =>{
            if(data.fname === userInvite.value){
                userExists.value = true
                const inviteeCode = clients[index]
                const inviteForm = {
                    from: user.fname,
                    invitee: inviteeCode
                }
                await user.sendChatInvitation(inviteForm)
                await user.addChatParticipant(userInvite.value)
                invitePrompt.value = 'Invite successfully sent.'



            }
            else{
                invitePrompt.value = 'User does not exist.'
            }
        })

    }
    function copyCode(){

    }
</script>
<style scoped>
    .text-color-success{
        color: #66BB6A;
    }
    .text-color-fail{
        color: #EF5350;
    }
</style>