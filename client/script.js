const url = 'http://localhost:3000/cars';

window.addEventListener('load', fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((cars) => {
      if (cars.length > 0) {
        let html = `<ul class="container border rounded-4 border-danger text-center ">`;
        cars.forEach((car) => {
          html += `
        <li
          class="row row-cols-2 border-bottom border-primary">
          <h3 class="text-dark"> ${car.carbrand} ${car.model} </h3>
          <p class="text-dark">Årtal: ${car.year}</p>
          <div>
            <button
              class="col text-primary">
              Ändra
            </button>
            <button class="col text-danger">
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
  });
}
