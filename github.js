class Github {
    constructor() {
        this.url = 'https://api.github.com/users/'
    }

    async getUserData(username){
        const user = await fetch(this.url + username)

        const repo = await fetch(this.url + username + '/repos')

        const userData = await user.json();
        const repoData = await repo.json();

        return {
            user: userData,
            repo: repoData
        }
    }
}