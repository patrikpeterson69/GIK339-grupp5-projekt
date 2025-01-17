const url = 'http://localhost:3000/cars';

window.addEventListener('load', fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((cars) => {
      if (cars.length > 0) {
        let html = `<ul class="my-3 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">`;
        cars.forEach((car) => {
          html += `
        <li
          class="bg-${car.color}-200 xl:bg-${car.color}-500 text-${car.color}-900 p-4 rounded-md border-2 border-${car.color}-400 grid grid-cols-1 hover:scale-110">
          <h3 class="text-lg font-bold">${car.carbrand} ${car.model}</h3>
          <p class="text-sm">Årtal: ${car.year}</p>
          <div class="mt-4">
            <button
              class="border border-${car.color}-300 hover:bg-white/100 rounded-md bg-white/50 px-3 py-1 text-sm" onclick="setCurrentcar(${car.id})">
              Ändra
            </button>
            <button
              class="border border-${car.color}-300 hover:bg-white/100 rounded-md bg-white/50 px-3 py-1 text-sm" onclick="deletecar(${car.id})">
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
function setCurrentcar(id) {
  console.log('current', id);

  fetch(`${url}/${id}`)
    .then((result) => result.json())
    .then((car) => {
      console.log(car);
      carForm.carbrand.value = car.carbrand;
      carForm.model.value = car.model;
      carForm.color.value = car.color;
      carForm.year.value = car.year;

      localStorage.setItem('currentId', car.id);
    });
}

function deletecar(id) {
  console.log('delete', id);
  fetch(`${url}/${id}`, { method: 'DELETE' }).then((result) => fetchData());
  alert('Bilen har tagits bort.');
}

carForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const servercarObject = {
    carbrand: '',
    model: '',
    year: '',
    color: ''
  };
  servercarObject.carbrand = carForm.carbrand.value;
  servercarObject.model = carForm.model.value;
  servercarObject.year = carForm.year.value;
  servercarObject.color = carForm.color.value;

  const id = localStorage.getItem('currentId');
  if (id) {
    servercarObject.id = id;
  }

  const request = new Request(url, {
    method: servercarObject.id ? 'PUT' : 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(servercarObject)
  });

  fetch(request).then((response) => {
    fetchData();

    localStorage.removeItem('currentId');
    carForm.reset();
    alert('Bilen har lagts till eller uppdaterats.');
  });
}