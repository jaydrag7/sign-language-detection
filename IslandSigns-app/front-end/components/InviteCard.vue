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
                    @click="isActive.value = false,closeClickHandler()"
                  ></v-btn>
  
                  <v-btn
                    class="text-none"
                    color="secondary_a"
                    rounded="xl"
                    text="Accept"
                    variant="flat"
                    @click=""
                  ></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
<script setup>
    const props = defineProps({
        theme:Boolean,
        chatInviteMetaData: Object
    })

    const emit = defineEmits([
        'close'
    ])

    function closeClickHandler(){
        return emit('close')
    }
</script>