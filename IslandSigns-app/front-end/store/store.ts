import { db } from "@/utils/firebase";
import { defineStore } from "pinia";
import {get,child,ref,update, onValue, onChildAdded} from "firebase/database";

interface UserProfile{
    bankName: String,
    branchID: Number,
    tellerStation:Number,
    passcode: String,
    msgThread:any,
    roles:String[],
    messages:String[],
    sessionActive: Boolean,
    darkTheme: any,
    users:any,
    fname: any,
    lname: any,
    email: any,
    sessionId: String
}
export const useUserProfile = defineStore('userprofiles',{
    state:():UserProfile => ({
        bankName: "",
        branchID: 0,
        tellerStation:0,
        passcode: "",
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

        async sendChatInvitation(data:any){
            try{
                const updates: any={}
                updates[`users/${data.invitee}/invites`] = {
                    status:"pending",
                    from: data.from,
                    sessionId: this.sessionId
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
                this.fname = data.fname
                this.lname = data.lname
                this.email = data.email
                this.darkTheme = false
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
                this.fname = data.fname
                this.email = data.email
                this.darkTheme = false
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
                    this.darkTheme = dataArr[0]
                    this.fname = dataArr[1]
                    this.email = data.email
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
                    this.darkTheme = dataArr[0]
                    this.fname = dataArr[1]
                    this.email = data.email
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

        async signIn(bankName: String,branchID: Number,tellerStation:Number,passcode: String){
            try{
                const data=await get(child(ref(db),`users/${bankName}/${branchID}/${tellerStation}`))
                if(data.exists()){
                    const pass=Object.values(data.val())
                    console.log(pass)
                    if(pass[0]==passcode){
                        this.bankName = bankName
                        this.branchID = branchID
                        this.tellerStation = tellerStation
                        this.passcode = passcode
                        this.darkTheme = pass[2]
                        return "Password match"
                    
                    }
                    else{
                        return "Invalid user credentials"
                    }
                   
                }
                else{
                    return "User is not registered"
                }

                // const updates: any={}
                // updates[`/users/${bankName}/${branchID}/${tellerStation}/${passcode}`]=this.msgThread

            }
            catch(error){
                console.log(error)
            }
        },
        async sendMessage(roles:any,msgs:any){
            try{
                const updates: any={}
                // this.msgThread['roles'].push(role)
                // this.msgThread['messages'].push(msg)
                this.roles = roles
                console.log(this.roles)
                this.messages = msgs
                this.msgThread = {
                    'roles': this.roles,
                    'messages':this.messages
                }
                updates[`/users/${this.bankName}/${this.branchID}/${this.tellerStation}/chat`]=this.msgThread
                return await update(ref(db),updates)
            }
            catch(error){
                console.log(error)
            }

        },
        async getChatActivity(){
            try{
                const threadRef = ref(db)
                const data = await get(child(threadRef,`/users/${this.bankName}/${this.branchID}/${this.tellerStation}/`))
                if(data.exists()){
                    let nodes: any={}    
                    nodes = data.val()
                    if(nodes['isActive']){
                        this.sessionActive = true
                    }


                }


            }
            catch(error){
                console.error(error)
            }
        },

        async register(data: object){
            try{
                const updates:any={}
                updates[`users/${data.bankName}/${ data.bankBranch}/${data.tellerStationNumber}/`]={
                    bankTellerPasscode: data.passcode,
                   darkTheme: false,
                    chatActivity:{
                        isActive: false
                    }
                }
                return await update(ref(db),updates)

            }
            catch(error){
                console.error(error)
            }
                
        },

        // async createSession(){
        //     try{
        //         const updates: any={} 
        //         updates[`users/${this.bankName}/${this.branchID}/${this.tellerStation}/chatActivity`] = {
        //             isActive: true
        //         }
        //         return await update(ref(db),updates)

        //     }
        //     catch(error){
        //         console.error(error)
        //     }
        // },
        async createSession(id:String){
            try{
                const updates: any={} 
                updates[`sessions/${id}`] = {
                    createdBy: this.fname
                }
                this.sessionId = id
                console.log(this.sessionId)
                return await update(ref(db),updates)

            }
            catch(error){
                console.error(error)
            }
        },

        async endSession(){
            try{
                const updates: any={}
                updates[`users/${this.bankName}/${this.branchID}/${this.tellerStation}/chatActivity`]={
                    isActive: false
                }
                return await update(ref(db),updates)

            }
            catch(error){
                console.error(error)
            }
        },
        async changeTheme(theme: boolean){
            try{
                const updates: any={}
                this.darkTheme = theme
                updates[`users/${this.email}/darkTheme`]=theme
                return await update(ref(db),updates)

            }
            catch(error){
                console.error(error)
            }
        },
        async removeChatLog(){
            try{
                const updates: any={}
                this.roles = []
                this.messages = []
                updates[`users/${this.bankName}/${this.branchID}/${this.tellerStation}/chat/`]=null
                return await update(ref(db),updates)

            }
            catch(error){
                console.error(error)
            }
        },
    }
})