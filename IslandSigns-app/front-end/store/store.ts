import { db } from "@/utils/firebase";
import { defineStore } from "pinia";
import {get,child,ref,update, onValue, onChildAdded} from "firebase/database";

interface UserProfile{
    msgThread:any,
    roles:String[],
    messages:String[],
    sessionActive: Boolean,
    darkTheme: any,
    users:object,
    fname: String,
    lname: any,
    email: String,
    sessionId: String,
    inviteMetaData: any,
    chatParticipant: String,
    sessionStatus: Boolean,
    sessionInviteeStatus: Boolean,
    author: Boolean,
    invitee: Boolean,
    sessionCodes:any
}
export const useUserProfile = defineStore('userprofiles',{
    state:():UserProfile => ({
        msgThread:{},
        roles:[],
        messages:[],
        sessionActive: false,
        darkTheme: false,
        users: {},
        fname:"",
        lname:"",
        email:"",
        sessionId:"",
        inviteMetaData:{},
        chatParticipant:"",
        sessionStatus: false,
        sessionInviteeStatus: false,
        author: false,
        invitee: false,
        sessionCodes: {}
    }),
    getters:{
        getThread(state){
            return state.msgThread
        }


    },
    actions:{
        async getUsers(){
            try{
                const data = await get(child(ref(db),`users`))
                if(data.exists()){
                    this.users = data.val()
                }

            }
            catch(err){
                console.log(err)
            }
        },
        async getSessionCodes(){
            try{
                const data = await get(child(ref(db),`sessions`))
                if(data.exists()){
                    this.sessionCodes = data.val()
                }

            }
            catch(err){
                console.log(err)
            }
        },

        async sendChatInvitation(data:any){
            try{
                const updates: any={}
                updates[`users/${data.invitee}/invites`] = {
                    from: data.from,
                    sessionId: this.sessionId
                }
                return await update(ref(db),updates)

            }
            catch(err){
                console.error(err)
            }
        },

        async addChatParticipant(participant: String){
            try{
                const updates: any={}
                this.chatParticipant = participant
                updates[`sessions/${this.sessionId}/participants/invitee`] = {
                    name: participant,
                    status: this.sessionInviteeStatus
                }
                return await update(ref(db),updates)
            }
            catch(err){
                console.error(err)
            }

        },

        async createNewGoogleClient(data:any){
            try{
                const updates: any={}
                const {username} = metaData()
                const {email} = metaData()
                const {userTheme} = colorTheme()
                this.fname = data.fname
                username.value = this.fname
                this.lname = data.lname
                this.email = data.email
                email.value = this.email
                this.darkTheme = false
                userTheme.value = false
                updates[`/users/`+`${data.email}`] = {
                    fname: data.fname,
                    lname: data.lname,
                    darkTheme: false,
                    isLoggedIn: true,
                }
                return await update(ref(db),updates)

            }
            catch(err){
                console.log(err)
            }

        },

        async createNewEmPassClient(data:any){
            try{
                const updates: any={}
                const {username} = metaData()
                const {email} = metaData()
                const {userTheme} = colorTheme()
                this.fname = data.fname
                username.value = this.fname
                this.email = data.email
                email.value = this.email
                this.darkTheme = false
                userTheme.value = false
                updates[`/users/`+`${data.email}`] = {
                    fname: data.fname,
                    darkTheme: false,
                    isLoggedIn: true,
                    password: data.password
                }
                return await update(ref(db),updates)

            }
            catch(err){
                console.log(err)
            }


        },

        async signOutClient(){
            try{
                const updates: any={}
                updates[`/users/${this.email}/isLoggedIn`] = false
                return await update(ref(db),updates)

            }
            catch(err){
                console.log(err)
            }

        },

        async signInGoogleClient(data:any){
            try{
                const clientMetaData = await get(child(ref(db),`users/${data.email}/`))
                if(clientMetaData.exists()){
                    const dataArr = Object.values(clientMetaData.val())
                    const {username} = metaData()
                    const {email} = metaData()
                    const {userTheme} = colorTheme()
                    this.darkTheme = dataArr[0]
                    userTheme.value = this.darkTheme
                    this.fname = dataArr[1]
                    username.value = this.fname
                    this.email = data.email
                    email.value = this.email
                    this.lname = dataArr[3]
                    // console.log(dataArr)
                    const updates: any={}
                    updates[`users/${data.email}/isLoggedIn`] = true
                    return await update(ref(db),updates)
    
                }

            }
            catch(err){
                console.log(err)
            }

        },
        async signInEmPassClient(data:any){
            try{
                const clientMetaData = await get(child(ref(db),`users/${data.email}/`))
                if(clientMetaData.exists()){
                    const dataArr = Object.values(clientMetaData.val())
                    const {username} = metaData()
                    const {email} = metaData()
                    const {userTheme} = colorTheme()
                    this.darkTheme = dataArr[0]
                    userTheme.value = this.darkTheme
                    this.fname = dataArr[1]
                    username.value = this.fname
                    this.email = data.email
                    email.value = this.email
                    // console.log(dataArr)
                    const updates: any={}
                    updates[`users/${data.email}/isLoggedIn`] = true
                    return await update(ref(db),updates)
    
                }

            }
            catch(err){
                console.log(err)
            }

        },

        async sendMessage(roles:any,msgs:any){
            try{
                const updates: any={}
                // this.msgThread['roles'].push(role)
                // this.msgThread['messages'].push(msg)
                this.roles = roles
                this.messages = msgs
                this.msgThread = {
                    'roles': this.roles,
                    'messages':this.messages
                }
                updates[`/sessions/${this.sessionId}/chat`]=this.msgThread
                return await update(ref(db),updates)
            }
            catch(error){
                console.log(error)
            }

        },
        // async getChatActivity(){
        //     try{
        //         const threadRef = ref(db)
        //         const data = await get(child(threadRef,`/users/${this.bankName}/${this.branchID}/${this.tellerStation}/`))
        //         if(data.exists()){
        //             let nodes: any={}    
        //             nodes = data.val()
        //             if(nodes['isActive']){
        //                 this.sessionActive = true
        //             }


        //         }


        //     }
        //     catch(error){
        //         console.error(error)
        //     }
        // },
        async createSession(id:String){
            try{
                const updates: any={} 
                updates[`sessions/${id}`] = {
                    participants: {
                        createdBy: {
                            name: this.fname,
                            status: this.sessionStatus
                        }
                    }
                }
                this.sessionId = id
                return await update(ref(db),updates)

            }
            catch(error){
                console.error(error)
            }
        },

        /* The above code appears to be a comment block in TypeScript. It is documenting a
        function called `updateSessionAuthorStatus`. The comment block uses the ` */
        async updateSessionAuthorStatus(){
            try{
                const updates: any={}
                this.sessionStatus = !this.sessionStatus
                this.author = !this.author
                console.log(this.sessionStatus)
                updates[`sessions/${this.sessionId}/participants/createdBy/status`] = this.sessionStatus
                return await update(ref(db),updates)

            }
            catch(error){
                console.error(error)
            }
        },
        /* The above code appears to be a comment block in TypeScript. It is documenting a
        function called `updateSessionInviteeStatus`. The function seems to be related to
        managing the status of an invitee in a session. However, the actual implementation of
        the function is not provided in the comment block. */
        async updateSessionInviteeStatus(){
            try{
                const participant = await get(child(ref(db),`sessions/${this.sessionId}/participants/createdBy/name`))
                if(participant.exists()){
                    this.chatParticipant = participant.val()
                    this.invitee = !this.invitee
                    const updates: any={}
                    this.sessionStatus = !this.sessionStatus
                    updates[`sessions/${this.sessionId}/participants/invitee/status`] = this.sessionStatus
                    return await update(ref(db),updates)
                }
            }
            catch(error){
                console.error(error)
            }
        },

        // async endSession(){
        //     try{
        //         const updates: any={}
        //         updates[`users/${this.bankName}/${this.branchID}/${this.tellerStation}/chatActivity`]={
        //             isActive: false
        //         }
        //         return await update(ref(db),updates)

        //     }
        //     catch(error){
        //         console.error(error)
        //     }
        // },
        async changeTheme(theme: boolean){
            try{
                const updates: any={}
                const {userTheme} = colorTheme()
                this.darkTheme = theme
                userTheme.value = this.darkTheme
                updates[`users/${this.email}/darkTheme`]=theme
                return await update(ref(db),updates)

            }
            catch(error){
                console.error(error)
            }
        },
        // async removeChatLog(){
        //     try{
        //         const updates: any={}
        //         this.roles = []
        //         this.messages = []
        //         updates[`users/${this.bankName}/${this.branchID}/${this.tellerStation}/chat/`]=null
        //         return await update(ref(db),updates)

        //     }
        //     catch(error){
        //         console.error(error)
        //     }
        // },
        async declineChatInvite(){
            try{
                const updates: any={}
                updates[`users/${this.email}/invites`]= null
                return await update(ref(db),updates)

            }
            catch(err){
                console.error(err)
            }
        }
    }
})