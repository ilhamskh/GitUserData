class UI {
    constructor(){
        this.profileDiv = document.getElementById('profile')
        this.repoDiv = document.getElementById('repos')
        this.lastUsers = document.getElementById('recent-users');
        this.input = document.getElementById('username')
        this.searchBody = document.getElementById('search');
    }

    clearInput(){
        this.input.value = '';
    }

    showUserInfo(user){

        const {html_url, avatar_url, name, bio, followers, following, public_repos, company, email, location} = user;
        this.profileDiv.innerHTML = `
        <div id="gitUser">
        <div class="user-img">
            <a href="${html_url}" target="_blank">
                <img src="${avatar_url}" alt="">
            </a>
            <hr>
            <div id="user-name">
                ${name}
            </div>
        </div>
        <div class="user-infos">
            <div class="user-items">
                <div id="followers">
                   ${followers} Followers
                </div>
                <div id="followed">
                    ${following} Following
                </div>
                <div id="user-repos">
                    ${public_repos} Public Repos
                </div>
            </div>

            <ul id="user-contacts">
                <li>
                    <i class="fa-solid fa-user"></i>
                    Company: ${company}
                </li>
                <li>
                    <i class="fa-solid fa-location-pin"></i>
                    Location: ${location}
                </li>
                <li>
                    <i class="fa-solid fa-envelope"></i>
                    Email: ${email}
                </li>
            </ul>
        </div>
    </div>
    <hr>
    <div id="user-desc">
        Bio: ${bio};
    </div>

    <br>
    <br>
        `

    }

    showAlert(type, message){
        const div = document.createElement('div');
        div.className = 'alert';
        div.id = type;
        div.textContent = message;

        this.searchBody.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 2000)
    }
    
    showRepos(repos){
        this.repoDiv.innerHTML = "";

        repos.forEach(repo => {
            const {html_url, name, language, stargazers_count, forks} = repo;

            this.repoDiv.innerHTML += `
            <div class="repo-info">
            <div class="repo-name">
                <a href="${html_url}" target="_blank">${name}</a>
            </div>

            <div class="repo-items">
                <div class="language">
                    ${language}
                </div>

                <div class="stars">
                    ${stargazers_count} Stars
                </div>

                <div class="forks">
                    ${forks} forks
                </div>   
            </div>
            </div>
            `
        })
    }

    addSearchedUsersUI(username){
        let users = Storage.getSearchedUsers();

        if(users.indexOf(username) === -1){

            const li = document.createElement('li');

            li.className = 'list-group-item'

            li.textContent = username;

            this.lastUsers.appendChild(li);

        }
    }

    clearAllSearchedUsers(){
        while(this.lastUsers.firstElementChild != null){
            this.lastUsers.removeChild(this.lastUsers.firstElementChild);
        }
    }

}

{/* <div class="alert" id="success">
                This is an alert box.
</div> */}