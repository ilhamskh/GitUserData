const form = document.getElementById('githubForm');

const username = document.getElementById('username');

const clearBtn = document.getElementById('clear-recents');

const lastUsers = document.getElementById('recent-users');

const git = new Github();
const ui = new UI();

form.addEventListener('submit', e => {
    let user = username.value.trim();
     if(username === ''){
         alert('Please fill all inputs')
     }
     else {
        git.getUserData(user)
        .then(response => {
            if (response.user.message === 'Not Found'){
                ui.showAlert('danger', "This user doesn't exist.")
            }
            else{
                ui.addSearchedUsersUI(user);
                Storage.addSearchedUsers(user)
                ui.showAlert('success', "User has been found.")
                ui.showUserInfo(response.user);
                ui.showRepos(response.repo)
            }
        })
        .catch(err => console.error(err));
    }
    
    ui.clearInput();
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {
    let users = Storage.getSearchedUsers();

    let result = '';
    users.forEach(user => {
        result += `
            <li class="list-group-item">${user}</li>

        `

        lastUsers.innerHTML = result;
    })
})

clearBtn.addEventListener('click', () => {
    let q = confirm("Are you sure?");

    if(q){
        ui.clearAllSearchedUsers();
        Storage.clearAllSearchedUsers();
        
    }
})