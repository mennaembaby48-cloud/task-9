var save_update = document.getElementById('save-btn-update')
var save_contact = document.getElementById('save-btn')
var addForm = document.getElementById('add-form');
var addContact = document.getElementById('add-contact');
var closeFormBtn = document.getElementById('close-form');
var search = document.getElementById("search-box");
var fullName = document.getElementById('formFullName');
var phoneNumber = document.getElementById('formPhoneNumber');
var Email = document.getElementById('formEmail');
var Address = document.getElementById('formAddress');
var Notes = document.getElementById('formNotes');
var groupSelect = document.getElementById("contact-group");
var checkBox = document.getElementById('formCheckBox');
var checkBox2 = document.getElementById('formCheckBox2');

var updateIndex;
var contactList = [];

if (localStorage.getItem("ContactList") != null) {
    contactList = JSON.parse(localStorage.getItem("ContactList"));
    displayAllContacts(contactList);
}

updateCount();

function openForm() {
    if (addForm.classList.contains('d-none')) {
        addForm.classList.remove('d-none');
        addForm.classList.add('d-block');
    }
}


function closeForm() {
    if (addForm.classList.contains('d-block')) {
        addForm.classList.remove('d-block');
        addForm.classList.add('d-none');
    }
}

save_contact.addEventListener('click', function () {
    closeForm();
})

addContact.addEventListener('click', function () {
    openForm();
})
closeFormBtn.addEventListener('click', function () {
    closeForm();
})



var regex = /^01(1|2|5|0)[0-9]{8}$/;
function phoneNumberPattern() {
    phoneNumber.addEventListener('input', function () {
        if (regex.test(phoneNumber.value)) {
            phoneNumber.classList.remove("is-invalid")
            phoneNumber.classList.add("is-vaild")
        }
        else {
            phoneNumber.classList.remove('is-valid')
            phoneNumber.classList.add('is-invalid')
        }
    })
}


var cancelBtn = document.getElementById('cancel');




cancelBtn.addEventListener('click', function () {
    closeForm();
})





function addContactForm() {
    var Contact = {
        name: fullName.value,
        number: phoneNumber.value,
        email: Email.value,
        address: Address.value,
        notes: Notes.value,
        select: groupSelect.selectedIndex,
        checkBox1: checkBox.checked,
        checkBox2: checkBox2.checked
    }
    contactList.push(Contact);
    localStorage.setItem("ContactList", JSON.stringify(contactList));


    displayAllContacts(contactList);
    clearForm();
    show('Added!','Contact has been added successfylly.');
}

function clearForm() {
    fullName.value = null;
    phoneNumber.value = null;
    Email.value = null;
    Address.value = null;
    Notes.value = null;
    groupSelect.selectedIndex = 0;
    checkBox.checked = false;
    checkBox2.checked = false;
}

function displayLastContact(Contact, index) {


    var p = `<p class="fs-14 text-darkgray fw-400 mt-1 mb-0">Manage and organize your ${contactList.length} contacts</p>`;


    var row = `  

<div class="col-lg-6 col-12"><div class="bg-white d-flex flex-column rounded-12 overflow-hidden align-items-start contact-details">
                            <div class="p-3 ">
                                <div class="d-flex gap-3 align-items-start flex-1">
                                    <div class="position-relative flex-shrink-0">
                                        <div
                                            class="contact-icon rounded-12 d-flex align-items-center justify-content-center text-white fs-18">

                                          ${Contact.name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                                        </div>
                                        <div
                                            class=" favoriteAppear position-absolute d-flex align-items-center justify-content-center rounded-circle content-icon-circle ${Contact.checkBox1 ? '' : 'd-none'}">
                                            <i class="fa-solid fa-star text-white fs-8"></i>
                                        </div>
                                        <div
                                            class="emerencyAppear position-absolute d-flex align-items-center justify-content-center rounded-circle content-icon-circle  ${Contact.checkBox2 ? '' : 'd-none'}">
                                            <i class="fa-sharp fa-solid fa-heart-pulse text-white fs-8"></i>
                                        </div>
                                    </div>

                                    <div class="pt-1">
                                        <h3 class="fw-bolder fs-18">${Contact.name}</h3>
                                        <div class="mt-1 d-flex gap-2 align-items-center">
                                            <div
                                                class="rounded-3 d-flex align-items-center justify-content-center phone-icon">
                                                <i class="fa-solid fa-phone fs-10"></i>
                                            </div>
                                               <span class="text-gray fw-400 fs-14">${Contact.number}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-12 ">
                                    <div class="d-flex gap-3 mb-2">
                                        <div
                                            class="email-icon rounded-3 d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-envelope fs-10"></i>
                                        </div>

                                        <span class="fs-14 fw-400 text-gray">${Contact.email}</span>
                                    </div>
                                    <div class="d-flex gap-3 mb-2">
                                        <div
                                            class="location-dot-icon rounded-3 d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-location-dot fs-10"></i>
                                        </div>

                                        <span class="fs-14 fw-400 text-gray">${Contact.address}</span>
                                    </div>
                                </div>

                                <div class="mt-12 d-flex align-items-center gap-3">
                                    <span class="rounded-3 py-1 px-2 friends text-center fs-12 fw-500">Friends</span>
                                    <span
                                        class="rounded-3 py-1 px-2 emergency d-flex align-items-center gap-1 fs-12 fw-500 text-red">
                                        <i class="fa-solid fa-heart-pulse"></i>Emergency
                                    </span>
                                </div>
                            </div>

                            <div class="py-10 px-3 down-icons d-flex align-items-center justify-content-between w-100">
                                <div class="d-flex align-items-center gap-2">
                                    <a href=""
                                        class="down-icon rounded-3 bg-lightGreen d-flex align-items-center justify-content-center"><i
                                            class="fa-solid fa-phone text-darkGreen fs-14"></i></a>
                                    <button
                                        class="down-icon rounded-3 d-flex align-items-center justify-content-center border-0 bg-lightPurple px-0"><i
                                            class="fa-solid fa-envelope fs-14"></i></button>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <button onclick="toggleStatue(this , '.favoriteAppear', 'bg-lightYellow',${index},'checkBox1')"
                                        class="border-0 rounded-3 down-icon d-flex align-items-center justify-content-center  px-0  ${Contact.checkBox1 ? 'bg-lightYellow' : ''}"><i
                                            class="fa-solid fa-star text-yellow fs-14"></i></button>
                                    <button onclick="toggleStatue(this ,'.emerencyAppear', 'bg-lightRed',${index},'checkBox2')"
                                        class="border-0 rounded-3 down-icon d-flex align-items-center justify-content-center px-0 ${Contact.checkBox2 ? 'bg-lightRed' : ''}"><i
                                            class="fa-solid fa-heart-pulse text-red fs-14"></i></button>
                                    <button
                                    onclick="openForm(); updateContact(${index})"
                                        class="border-0 rounded-3 down-icon d-flex align-items-center justify-content-center bg-white px-0"><i
                                            class="fa-solid fa-pen text-darkgray fs-14"></i></button>
                                    <button
                                      onclick="openDelete(${index})"
                                    class="border-0 rounded-3 down-icon d-flex align-items-center justify-content-center bg-white px-0"><i
                                            class="fa-solid fa-trash text-darkgray fs-14"></i></button>
                                </div>
                            </div>

</div>
                        </div>
                    
                        `



    document.getElementById('container-box').innerHTML += row;
    document.getElementById("count-box").innerHTML = p;

    // updateCount();
}

document.querySelector('#save-btn').addEventListener('click', function () {
    addContactForm();
})

function displayAllContacts(list) {
    if (list == undefined) {
        list = contactList;
    }
    document.getElementById("container-box").innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        displayLastContact(list[i], i);
    }
    document.getElementById("count-box").innerHTML = `<p class="fs-14 text-darkgray fw-400 mt-1 mb-0">Manage and organize your ${contactList.length} contacts</p>`

    checkContacts(list);
    updateCount();


}


function deleteContact(index) {
    contactList.splice(index, 1);
    localStorage.setItem("ContactList", JSON.stringify(contactList))
    displayAllContacts(contactList);
    updateCount();
}
search.addEventListener("input", function () {
    searchByContact();
})

function searchByContact() {
    var searchList = [];
    for (var i = 0; i < contactList.length; i++) {

        if (contactList[i].name.toLowerCase().includes(search.value.toLowerCase()) || contactList[i].number.includes(search.value) || contactList[i].email.toLowerCase().includes(search.value.toLowerCase())) {

            searchList.push(contactList[i])
        }
    }
    displayAllContacts(searchList);
}



function updateContact(index) {
    fullName.value = contactList[index].name;
    phoneNumber.value = contactList[index].number;
    Email.value = contactList[index].email;
    Address.value = contactList[index].address;
    Notes.value = contactList[index].notes;
    groupSelect.selectedIndex = contactList[index].select;
    checkBox.checked = contactList[index].checkBox1;
    checkBox2.checked = contactList[index].checkBox2;

    updateIndex = index;



    save_contact.classList.remove('d-block');
    save_contact.classList.add('d-none');
    save_update.classList.add('d-block');
    save_update.classList.remove('d-none');

}

save_update.addEventListener("click", function () {
    updateForm();
})




function updateForm() {


    contactList[updateIndex].name = fullName.value;
    contactList[updateIndex].number = phoneNumber.value;
    contactList[updateIndex].email = Email.value;
    contactList[updateIndex].address = Address.value;
    contactList[updateIndex].notes = Notes.value;
    contactList[updateIndex].select = groupSelect.selectedIndex;
    contactList[updateIndex].checkBox1 = checkBox.checked;
    contactList[updateIndex].checkBox2 = checkBox2.checked;

    localStorage.setItem("ContactList", JSON.stringify(contactList));
    displayAllContacts(contactList);


    save_contact.classList.remove('d-none');
    save_contact.classList.add('d-block');
    save_update.classList.add('d-none');
    save_update.classList.remove('d-block');
    clearForm();
    closeForm();
    show('Updated! ' ,'Contact has been updated successfuly.')

}



function toggleStatue(btn, apperClass, colorClass, index, key) {
    var element = btn.closest(".contact-details").querySelector(apperClass);
    btn.classList.toggle(colorClass);
    element.classList.toggle("d-none");
    contactList[index][key] = !contactList[index][key];
    localStorage.setItem("ContactList", JSON.stringify(contactList));

    updateCount();


    if (addForm.classList.contains("d-block") && updateIndex === index) {
        checkBox.checked = contactList[index].checkBox1;
        checkBox2.checked = contactList[index].checkBox2;
    }
}


function updateCount() {
    var fav = 0;
    var emrg = 0;

    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].checkBox1) {
            fav++;
        }
        if (contactList[i].checkBox2) {
            emrg++;
        }
    }

    document.getElementById('totalCount').innerHTML = contactList.length;
    document.getElementById('favCount').innerHTML = fav;
    document.getElementById('emrgCount').innerHTML = emrg;

    displaySideLists();
}

function displaySideLists() {

    var favHtml = '';
    var emrgHtml = '';

    for (var i = 0; i < contactList.length; i++) {

        var c = contactList[i];

        var details = `<div class=" col-12 col-lg-6 p-32">
<div class="d-flex gap-1 align-items-start flex-1 p-2 rounded-12 contact-hover">
                                        <div
                                            class="contact-icon-sm rounded-2 d-flex align-items-center justify-content-center text-white fs-18">

                                           ${c.name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                                        </div>
                                    
                                

                                    <div>
                                        <h3 class="fw-bolder fs-14 mb-0">${c.name}</h3>
                                               <span class="text-lightgray fw-500 fs-12">${c.number}</span>
                                     
                                    </div>
                                </div>
</div>
`

        if (c.checkBox1) {
            favHtml += details;
        }
        if (c.checkBox2) {
            emrgHtml += details;
        }
    }

    if (favHtml == "") {
        favHtml = `<div class="col-12 p-12"><div class="py-32 text-center"> <p class="text-lightgray fw-500">No Favorites Yet</p></div> </div>`;
    }

    if (emrgHtml == "") {
        emrgHtml = `<div class="col-12 p-12"><div class="py-32 text-center"> <p class="text-lightgray fw-500">No Emergency Yet</p></div> </div>`;

    }
    document.getElementById("favorite-box").innerHTML = favHtml;
    document.getElementById("emergency-box").innerHTML = emrgHtml;

}

function checkContacts(currentList) {

    var listToCheck = currentList || contactList;
    var No_Contacts = document.getElementById('noContacts');
    if (!No_Contacts) return;

    if (listToCheck.length === 0) {
        No_Contacts.classList.remove("d-none");
    }
    else {
        No_Contacts.classList.add("d-none");
    }
}











const overlay = document.getElementById('overlay');

var deleteBtn = document.getElementById('confirmBtn');
deleteBtn.addEventListener('click', function () {
    if (deleteBtn !== null) {
        deleteContact(deleteIndex);
        show('Deleted!','Contact has been deleted.');
    }

    closeDelete();
})

document.getElementById('cancelBtn').addEventListener('click', function () {
    closeDelete();
})
var deleteIndex = '';
function openDelete(index) {
    deleteIndex = index;
    overlay.classList.add('d-flex');
        document.getElementById('dlgName').textContent = contactList[index].name;


}
function closeDelete() {
    overlay.classList.remove('d-flex');
    deleteIndex = '';

}



function show(title, text) {

var el = document.getElementById('messageOverlay');
document.getElementById('messageTitle').textContent=title;
document.getElementById('messageText').textContent=text;
el.classList.remove('d-none');
el.classList.add('d-flex');
  setTimeout(function () {
    el.classList.remove('d-flex');
    el.classList.add('d-none');
  }, 1000);

}


