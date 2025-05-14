"use client";
import { useState } from "react";
import UpdateUsernameCard from "./usernameCard";
import UpdatePasswordCard from "./passwordCard";
import VerifyPasswordCard from "./verifyPasswordCard";
import LayoutComponent from "../../layout/layoutComponent";
import { User } from "../../../../../models/userModel/userModel";
import { toast } from "sonner";

export default function UpdateCredential({ userId, onClose, type }: { userId: any; onClose: () => void; type: string}) {
    const [step , setStep] = useState<"verify" | "username" | "password">("verify");
    const [user , setUser] = useState<User | null>(null);
    const [verifyPassword , setVerifyPassword] = useState<string | null>(null);

    const handleVerifyPassword = (result : {status:number; data: User; }) => {
        // setVerifyPassword(password);
        if(result.status === 200 || result.status === 201) {
            if(type === "username") {
                setUser(result.data);
                console.log("ini user id", result.data);
                setStep("username");
                toast.success("Password benar, masuk ke username");
            }
            else if(type === "password") {
                setUser(result.data);
                setStep("password");
                toast.success("Password benar, masuk ke password");
            }
        }
        else if(result.status === 404) {
            setUser(null);
            setStep("verify");
            toast.error("Password salah");
        }
        else {
            console.error("Unexpected status code:", result.status);
        }
    }
    
    return(
        <div>
            {step === "verify" && <VerifyPasswordCard onResult={handleVerifyPassword} onClose={onClose} id ={userId}/>}
            {step === "username" && user && <UpdateUsernameCard user={user} onClose={onClose}/>}
            {step === "password" && user && <UpdatePasswordCard user={user} onClose={onClose}/>}
        </div>
    )
}