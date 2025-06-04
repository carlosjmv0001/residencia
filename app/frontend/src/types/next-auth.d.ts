import "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user:{
        id?:string,
        role?:string,
        token?: string,
    }
  }
}

declare module "next-auth" {
    interface User {
      role?: string,
      token?: string,
      id?:string
    }
}