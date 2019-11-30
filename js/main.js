$(() => {
    $('body').on('submit', '#searchForm', (e) => {
        let searchText = $('#searchText').val();
        let searchType = $('#searchType').val();
        e.preventDefault();
        getMovies(searchText, searchType, 1);
    });
    $('body').on('click', '.pagin-btn', (e) => {
        let searchText = $('#searchText').val();
        let searchType = $('#searchType').val();
        e.preventDefault();
        getMovies(searchText, searchType, e.target.textContent);
    });
});

let getMovies = (searchText, searchType, pageNumb) => {
    $('#details').html('');
    let request = `https://www.omdbapi.com/?apikey=68c6b1ea&s=${searchText}&type=${searchType}&page=${pageNumb}`;
    fetch(request).then((result) => {
            return result.json();
        }).then((data) => {
            let pagesAmount = Math.ceil(data.totalResults / 10);
            let movies = data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `<p>${(pageNumb-1)*10+index+1}. ${movie.Title} 
            <button 
            onclick="showDetails('${movie.Title}', '${movie.Year}', '${movie.Poster}')">
            Details...</button></p>`;
            });
            if (pagesAmount > 1) output += formPaginBtnsSection(pageNumb, pagesAmount);
            $('#movies').html(output);
            $(`#pagin_btn${pageNumb}`).attr('disabled', 'disabled');
        })
        .catch(err => {
            console.log("ERROR:", err.toString())
        });
};

let formPaginBtnsSection = (pageNumb, pagesAmount) => {
    let paginationSection = `<button class="pagin-btn" id="pagin_btn1">1</button>`;
    if ((+pageNumb - 5) > 2) {
        paginationSection += `<span>. . .<span>`;
    };
    let maxInd;
    for (let i = (+pageNumb - 5); i <= (+pageNumb + 5); i++) {
        if (i > 1 && i < pagesAmount) {
            paginationSection += `<button class="pagin-btn" id="pagin_btn${i}">${i}</button>`;
            maxInd = i;
        };
    };
    if (maxInd < (pagesAmount - 1)) {
        paginationSection += `<span>. . .<span>`;
    };
    paginationSection += `<button class="pagin-btn" id="pagin_btn${pagesAmount}">${pagesAmount}</button>`;
    return paginationSection;
};

let showDetails = (tite, year, poster) => {
    movieDetails = `<h3>${tite}</h3><h4>${year}</h4><img src="${poster}"></img>`;
    $('#details').html(movieDetails);
};