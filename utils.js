/* eslint-disable guard-for-in */

function formatProperty(str) {
  let output;
  if (str.includes('_')) {
    let split = str.split('_').map(str => {
      let split2 = str.split('');
      split2[0] = split2[0].toUpperCase();
      return split2.join('');
    });
    output = split.join(' ');
  } else {
    let split = str.split('');
    split[0] = split[0].toUpperCase();
    output = split.join('');
  }
  return output;
}

function renderWeatherData(data) {
  const row = document.querySelector('#card-row');
  const title = document.querySelector('#title');
  title.innerText = data.name;
  let htmlToRender = '';
  for (let key in data.main) {
    htmlToRender += `
    <div class="col-sm">
          <div class="card m-0">
            <div class="card-body">
              <p class="card-text text-center">${formatProperty(key)}</p>
              <h5 class="card-title text-center" id="temp">${
                data.main[key]
              }</h5>
            </div>
          </div>
        </div>
        `;
  }
  row.innerHTML = htmlToRender;
}
