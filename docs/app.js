const searchForm = document.body.querySelector('#searchForm')
const btn = document.body.querySelector('#btn')
const container = document.body.querySelector('#container')


searchForm.addEventListener('submit', async function(e){
    e.preventDefault()
    const searchText = searchForm.elements.query.value;
    const config = {params:{q: searchText}}
    const res = await axios.get(` https://api.tvmaze.com/search/shows`,config)
    makeImages(res.data)
    searchForm.elements.query.value = ''
   

})
const makeImages = (shows)=> {
    container.innerHTML = ''
    for(let result of shows){
        if(result.show.image){
        const img = document.createElement('img')
        img.src = result.show.image.medium;
        container.append(img)
       

    }
    }
}
