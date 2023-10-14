export const checkValidateform=(email,pass)=>{
    const isemail=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    const ispass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pass)
    if(!isemail) return "Enter a valid Email";
    if(!ispass) return "Enter a Valid Password";
    return null

}