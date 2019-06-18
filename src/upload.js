const {ipcRenderer} = require('electron');

let btn = document.getElementById('btn-choose');
btn.addEventListener('click', () => {
    console.log(window);
    ipcRenderer.send('btn-choose');
    window.close();
});
