class UserModel {
    constructor(private db: unknown) {}

    createUser(email: string, passwordHash: string, passwordHint: string) {}

    findUserByEmail(email: string) {
        return null
    }
}

export default UserModel
