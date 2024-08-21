<template>
    <v-dialog max-width="500" activator="parent">
        <v-card rounded="lg" :color="theme ? 'secondaryDarkBtnColor':'bckgrnd'">
            <v-card-title class="d-flex justify-space-between align-center">
                  <div class="text-h5 ps-2">
                    Session Invite
                  </div>
            </v-card-title>
        </v-card>
    </v-dialog>
</template>
<script setup>
    const props = defineProps({
        theme:Boolean
    })
</script>