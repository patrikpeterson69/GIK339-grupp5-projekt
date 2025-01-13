const url = 'http://localhost:3000/users';

window.addEventListener('load', fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((users) => {
      if (users.length > 0) {
        let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
        users.forEach((user) => {
          html += `
        <li
          class="bg-${user.color}-200 basis-1/4 text-${user.color}-900 p-2 rounded-md border-2 border-${user.color}-400 flex flex-col justify-between">
          <h3>${user.firstName} ${user.lastName}</h3>
          <p>Användarnamn: ${user.username}</p>
          <div>
            <button
              class="border border-${user.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="setCurrentUser(${user.id})">
              Ändra
            </button>
            <button class="border border-${user.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="deleteUser(${user.id})">
              Ta bort
            </button>
          </div>
        </li>`;
        });
        html += `</ul>`;

        const listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = '';
        listContainer.insertAdjacentHTML('beforeend', html);
      }
    });
}

function setCurrentUser(id) {
  console.log('current', id);

  fetch(`${url}/${id}`)
    .then((result) => result.json())
    .then((user) => {
      console.log(user);
      userForm.firstName.value = user.firstName;
      userForm.lastName.value = user.lastName;
      userForm.color.value = user.color;
      userForm.username.value = user.username;

      localStorage.setItem('currentId', user.id);
    });
}

function deleteUser(id) {
  console.log('delete', id);
  fetch(`${url}/${id}`, { method: 'DELETE' }).then((result) => fetchData());
}

userForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverUserObject = {
    firstName: '',
    lastName: '',
    username: '',
    color: ''
  };
  serverUserObject.firstName = userForm.firstName.value;
  serverUserObject.lastName = userForm.lastName.value;
  serverUserObject.username = userForm.username.value;
  serverUserObject.color = userForm.color.value;

  const id = localStorage.getItem('currentId');
  if (id) {
    serverUserObject.id = id;
  }

  const request = new Request(url, {
    method: serverUserObject.id ? 'PUT' : 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(serverUserObject)
  });

  fetch(request).then((response) => {
    fetchData();

    localStorage.removeItem('currentId');
    userForm.reset();
  });
}
