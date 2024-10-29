const setURL = (key, value) => {
    let url = new URL(window.location.href);
    if(value){
        url.searchParams.set(key, value);
    }
    else{
        url.searchParams.delete(key);
    }
    window.location.href = url.href;
}


const buttonStatus = document.querySelectorAll('[button-status]');
if(buttonStatus.length > 0)
{
    buttonStatus.forEach(item => {
        item.addEventListener('click', () => {
            console.log("It is in public admin js");
            const status = item.getAttribute('button-status');
            setURL('status',status);
        });
    });
}

const formSearch = document.querySelector('#form-search');
if(formSearch)
{
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent from re-loading page to custom handle
        const inputValue = e.target.elements.search.value;
        setURL('search', inputValue.trim());
    });
}

const buttonPagination = document.querySelectorAll('[button-pagination]')
if(buttonPagination){
    buttonPagination.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('button-pagination');
            setURL('page', page);
        });
    });
}

// checkbox multi 
const checkboxMulti = document.querySelector('[checkbox-multi]');
if(checkboxMulti){
    console.log('checkboxMulti');
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsID = checkboxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener('click', () => {
        if(inputCheckAll.checked){ // when the check all is clicked, all the checkbox will be checked
            inputsID.forEach(item => {
                item.checked = true; 
            });
        }
        else{
            inputsID.forEach(item => {
                item.checked = false;
            });
        }
    });

    inputsID.forEach(item => {
        item.addEventListener('click', () => { // when the checkbox is clicked, the box is marked as checked
            let check = true;
            for(let i = 0; i < inputsID.length; i++){
                if(!inputsID[i].checked){
                    check = false;
                    break;
                }
            }
            inputCheckAll.checked = check;
        });
    })
}

// form change multi
const formChangeMulti = document.querySelector('[form-change-multi]');
if(formChangeMulti){
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent from re-loading page to custom handle
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        
        const typeChange = e.target.elements.type.value;

        if(typeChange == 'delete-all')
        {
            const conform = confirm('Are you sure you want to delete all selected items?');
            if(!conform){
                return;
            }
        }
        
        if(inputsChecked.length > 0)
        {
            let ids = [];
            const inputItemStatusText = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(item => {
                let id = item.value;
                if(typeChange == 'change-position')
                {
                    const position = item.closest('tr').querySelector("input[name='position']").value;
                    id += '-' + position;
                }
                ids.push(id);
            });
            inputItemStatusText.value = ids.join(', ');
            formChangeMulti.submit();
        }else{
            alert('Please choose at least one item');
        }

    });
}


