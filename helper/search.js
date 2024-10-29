module.exports = (query) => {
    let searchInput = '';
    if(query.search){
        console.log( 'It is in search file ' + query.search);
        searchInput = query.search;
    }
    return searchInput;
}