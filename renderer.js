const info = document.getElementById('info');
const data = document.getElementById('data');
const btn = document.getElementById('btn');
// const titleInput = document.getElementById('title');
const filePathElement = document.getElementById('filePath');

btn.addEventListener('click', () => {
    // const title = titleInput.value;
    // window.electronAPI.setTitle(title);

    // const filePath = await window.electronAPI.openFile();
    // filePathElement.innerText = filePath;
    const res = electronAPI.createTable();
    console.log(res);
    data.innerText = `${res}`;

});

info.innerText = `
    This app is using
    Chrome (v${versions.chrome()}),
    Node.js (v${versions.node()}),
    Electron (v${versions.electron()}),
    Data ${versions.ping()}
`;

const func = async () => {
    const response = await window.versions.ping();
    console.log(response);
};
const func2 = async () => {
    const response = await window.data.name;
    console.log(response());
};
func2();
func();