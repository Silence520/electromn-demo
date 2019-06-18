const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    let btn = document.getElementById('btn-upload');
    btn.addEventListener('click', () => {
        ipcRenderer.send('btn-upload');
    });
    ipcRenderer.on('massage', (event, items) => {
        var html = '';
        items.map(item => {
            html += `<div class="card  col-sm-3 mr-1" >
                  <img class="card-img-top" src="${item.path}" alt="Card image cap">
                  <div class="card-body">
                  ${item.name}
                  </div>
                </div>`;
        });
        document.getElementById('app').innerHTML = html;
    });
});
