document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const manageUserForm = document.getElementById('manageUserForm');
    const userList = document.getElementById('userList');
  
    // Load users from localStorage and display them
    function loadUsers() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      userList.innerHTML = '';
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.username} (${user.email})`;
        userList.appendChild(listItem);
      });
    }
  
    // Handle user login
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        alert('Login successful!');
      } else {
        alert('Invalid username or password.');
      }
    });
  
    // Add new user
    manageUserForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      const newUser = {
        username,
        password,
        email
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      manageUserForm.reset();
      loadUsers();
    });
  
    loadUsers();
  });