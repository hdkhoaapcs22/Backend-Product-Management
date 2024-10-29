const buttonChageStatus = document.querySelectorAll('[button-change-status');
if(buttonChageStatus.length > 0){
    const formChangeStatus = document.querySelector('#form-change-status');
    const path = formChangeStatus.getAttribute('data-path');
    buttonChageStatus.forEach(item  => {
        item.addEventListener('click', () => {
            const currentButtonStatus = item.getAttribute('data-status');
            const idOfProduct = item.getAttribute('data-id');
            const newButtonStatus = currentButtonStatus == 'active' ? 'inactive' : 'active';
            const action = path + `/${newButtonStatus}/${idOfProduct}?_method=PATCH`;

            formChangeStatus.setAttribute('action', action);
            formChangeStatus.submit();
        });
    });
}

const buttonDelete = document.querySelectorAll('[button-delete]');
if(buttonDelete.length > 0)
{
    buttonDelete.forEach(item => {
        const formDeleteItem = document.querySelector(`#form-delete-item`);
        const path = formDeleteItem.getAttribute('data-path');
        item.addEventListener('click', () => {
            const conform = confirm('Are you sure to delete this product?');
            if(conform){
                const id = item.getAttribute('data-id');
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.setAttribute('action', action);
                formDelete.submit();
            }
        });
    }) 
}

const showAlert = document.querySelector('[show-alert]');
console.log(showAlert);
if(showAlert){
    const timeShow = showAlert.getAttribute('data-time');
    const closeAlert = showAlert.querySelector('[close-alert]');
    setTimeout(() => {
        showAlert.classList.add('alert-hidden');
    }, timeShow);

    closeAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden');
    });
}

const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = document.querySelector('[upload-image-input]');
    const uploadImagePreview = document.querySelector('[upload-image-preview]');
    uploadImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
        console.log(e);
    });
}