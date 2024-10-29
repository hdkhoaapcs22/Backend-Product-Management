module.exports = (query) => {
    let filterStatus = [
        {
            name: 'All',
            status: '',
            class: '',
        },
        {
            name: 'Active',
            status: 'active',
            class: ''
        },
        {
            name: 'Inactive',
            status: 'inactive',
            class: '',
        }
    ]
    let criteriaStatus = '';
    if(query.status){
        criteriaStatus = query.status;
    }

    const index = filterStatus.findIndex((item) => item.status === criteriaStatus);
    filterStatus[index].class = 'active';

    return filterStatus;
}