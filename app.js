const addLinkPanel = document.querySelector("#addLinkPanel");
const addBtn = document.querySelector("#addBtn");
const cancelBtn = document.querySelector('#cancelButton');
const submitBtn = document.querySelector('#submitButton');
var linkCatagory = document.querySelector('#linkCatagory');
const addedCatagories = document.querySelector('#addedCatagories');
var linkTitle = document.querySelector('#linkTitle')
var linkUrl = document.querySelector('#linkUrl')
const linkList = document.querySelector('#linkList')
const date = new Date();
const addLinkContainer = document.querySelector('#addLinkContainer')



//arrays
let editIndex = -1;
var linkCatagoryArray = [];
const links = [
    {
        title: 'facebook',
        url: 'fb.com',
        catagories: ['chat','social'],
        date:new Date()
    },
    {
        title: 'New Link 2',
        url: 'fb.com',
        catagories: ['Noje','django'],
        date:new Date()
    }
];

// button events
displayLink();
addBtn.addEventListener('click', () => {
    showFormPanel();
})

cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearForm();
    hideFormPanel();
    linkCatagoryArray = [];
    editIndex = -1;
})

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    hideFormPanel();
    let title = linkTitle.value;
    let url = linkUrl.value;
    let catagories = linkCatagoryArray;

    let newLink = {
        title,
        url,
        catagories,
        date: new Date()
    };

    if (editIndex === -1){
        links.unshift(newLink);
    }
    else{
        links[editIndex] = newLink;
        editIndex = -1;
    }


    console.log(links)
    linkCatagoryArray = [];
    clearForm();
    displayLink();
})

//comma pressed???
linkCatagory.addEventListener('keydown', (event) => {

    if (event.keyCode == 188) {
        event.preventDefault();
        linkCatagoryArray.push(linkCatagory.value);
        linkCatagory.value = '';
        console.log(linkCatagoryArray);
        displayLinkCatagory();
    }
})

//functions
function showFormPanel(){
    addLinkContainer.classList.remove('hidden');
    displayLinkCatagory();
}

function hideFormPanel(){
    addLinkContainer.classList.add('hidden');
    displayLinkCatagory();
}

function displayLinkCatagory(){
    addedCatagories.innerHTML = '';
    for (let catagory of linkCatagoryArray){
        catagoryHtmlString = `<span class="catagories">${catagory}</span>`;
        addedCatagories.innerHTML += catagoryHtmlString
    }
}

function clearForm(){
    addedCatagories.innerHTML = '';
    linkTitle.value = '';
    linkUrl.value = '';
}

function displayLink(){
    linkList.innerHTML = '';
    let index=0;
    for (let link of links){
        let linkHtmlString = `
        <div class="flex-item">
            <div class="link panel">

            <div class="link-option">
                <button class="sm-btn" onclick="deleteLink(${index})">Delete</button>
                <button class="sm-btn" onclick="editLink(${index})">Edit</button>
            </div>

            <a href="${link.url}" target="_blank"><h1 class="header">${link.title}</h1></a>
            <p class="link-date">${formatdate(link.date)}</p>
            <div class="catagory">
                Catagories:
        `;

        for (let catagory of link.catagories){
            linkHtmlString += `<span class="catagories">${catagory}</span>`;
        }

        linkHtmlString += `</div>

        </div> 
        </div>`;

        linkList.innerHTML += linkHtmlString;
        index++;
    }
}

function deleteLink(index){
    console.log('Deleteting link at index', index);
    //splice - cool to delete data from an array
    links.splice(index,1);
    displayLink();
}

function editLink(index){
    console.log('Editing link at index', index);
    editIndex = index;
    linkTitle.value = links[index].title;
    linkUrl.value = links[index].url;
    linkCatagoryArray = links[index].catagories;

    showFormPanel();
}

function formatdate(date){ 
    return `${ ("0" + (date.getMonth()+1)).slice(-2) }/${ ("0" +(date.getDate())).slice(-2) }/ ${date.getFullYear()}`;
}