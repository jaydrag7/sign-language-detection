export const metaData = () => {
    const username = useCookie<any>('username')
    const email = useCookie<any>('email')
    const chatSessionParticipant = useCookie<any>('sessionChatParticipant')
    const chatSessionInviteeStatus = useCookie<any>('chatSessionInviteeStatus')
    const chatInviteMeta = useCookie<any>('chatInviteMeta')
    const chatSessionId = useCookie<any>('chatSessionId')
    const chatSessionInvite = useCookie<any>('chatSessionInvite')
    const showSessionInvite = useCookie<any>('showSessionInvite')
    // const setUsername = (usr:any) => {
    //     username.value = usr
    //     console.log(username.value)

    // }
    return{
        username,
        email,
        chatSessionInviteeStatus,
        chatSessionParticipant,
        chatInviteMeta,
        chatSessionId,
        chatSessionInvite,
        showSessionInvite
    }
}