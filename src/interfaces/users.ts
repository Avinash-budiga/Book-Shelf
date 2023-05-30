//userInfo while signup and storing in Db:
export interface userInfo {
    email: string;
    password: string;
    username: string;
    userid: string;
}

//userdata while login :
export class userDetails {
    userId: string
}

//createUser data:
export interface createUser {
    username: string,
    email: string,
    password: string,
}

export interface loginUser {
    email: string,
    password: string,
}
