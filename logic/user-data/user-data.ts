interface UserData {
    name : string,
    email: string,
    password : string,
}

const generateUserData = (
    name : string,
    email : string, 
    password : string) => {

    return {
        name: name,
        email : `Auto_${email}`,
        password: password
    }
}

export {generateUserData, UserData}