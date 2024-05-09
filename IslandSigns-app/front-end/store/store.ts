import { db } from "@/utils/firebase";
import { defineStore } from "pinia";
import {get,child,ref,update, onValue, onChildAdded} from "firebase/database";

interface UserProfile{
    bankName: String,
    branchID: Number,
    tellerStation:Number,
    passcode: String,
    msgThread:Object,
    roles:String[],
    messages:String[]
}
export const useUserProfile = defineStore('userprofiles',{
    state:():UserProfile => ({
        bankName: "",
        branchID: 0,
        tellerStation:0,
        passcode: "",
        msgThread:{},
        roles:[],
        messages:[]
    }),
    getters:{
        getThread(state){
            return state.msgThread
        }


    },
    actions:{
        async signIn(bankName: String,branchID: Number,tellerStation:Number,passcode: String){
            try{
                const data=await get(child(ref(db),"users"))
                if(data.exists()){
                    const users=Object.values(data.val())
                    console.log(users)
                }
                // const updates: any={}
                // updates[`/users/${bankName}/${branchID}/${tellerStation}/${passcode}`]=this.msgThread

            }
            catch(error){
                console.log(error)
            }
        },
        async sendMessage(role:String,msg:String){
            try{
                const updates: any={}
                // this.msgThread['roles'].push(role)
                // this.msgThread['messages'].push(msg)
                this.roles.push(role)
                this.messages.push(msg)

                // console.log(this.roles,this.messages)
                this.msgThread = {
                    'roles': this.roles,
                    'messages':this.messages
                }
                updates[`/users/chat/`]=this.msgThread
                return await update(ref(db),updates)
            }
            catch(error){
                console.log(error)
            }

        },
        async getMessageThread(){
            try{
                const threadRef = ref(db)
                const data = await get(child(threadRef,`/users/`))
                if(data.exists()){
                    let prevThread: any={}    
                    prevThread = data.val()
                    // this.roles.concat(prevThread['chat']['roles'])
                    // this.messages.concat(prevThread['chat']['messages'])
                    console.log(this.messages)
                }
                // get(child(threadRef, `users/`)).then((snapshot) => {
                //     if (snapshot.exists()) {
                //         let prevThread: any={}    
                //         prevThread = snapshot.val()                  

                //         console.log(prevThread)
                //     } else {
                //       console.log("No data available");
                //     }
                // })                                              

            }
            catch(error){
                console.error(error)
            }
        },
    }
})