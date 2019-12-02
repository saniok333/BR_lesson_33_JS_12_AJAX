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
    $('#movies, #details').empty();
    let request = `https://www.omdbapi.com/?apikey=68c6b1ea&s=${searchText}&type=${searchType}&page=${pageNumb}`;
    fetch(request).then((result) => {
            return result.json();
        }).then((data) => {
            let pagesAmount = Math.ceil(data.totalResults / 10);
            let movies = data.Search;
            $.each(movies, (index, movie) => {
                $('<p>', {
                        text: `${(pageNumb-1)*10+index+1}. ${movie.Title} `
                    })
                    .append($('<button>', {
                        text: `Details...`
                    }))
                    .on('click', (e) => {
                        $('#details').empty();
                        $('#details').append($('<h4>', {
                            text: `${movie.Title} ${movie.Year}`
                        }));
                        if (movie.Poster == 'N/A') return;
                        $('#details').append($('<img>', {
                            src: `${movie.Poster}`
                        }));
                    })
                    .appendTo('#movies');
            });
            if (pagesAmount > 1) formPaginBtnsSection(pageNumb, pagesAmount);
            $(`#pagin_btn${pageNumb}`).attr('disabled', 'disabled');
        })
        .catch(err => {
            console.log("ERROR:", err.toString());
        });
};

let formPaginBtnsSection = (pageNumb, pagesAmount) => {
    $('#movies').append($('<button>', {
        class: `pagin-btn`,
        id: `pagin_btn1`,
        text: `1`,
    }));
    if ((+pageNumb - 5) > 2) {
        $('#movies').append($('<span>', {
            text: `. . .`,
        }));
    };
    let maxInd;
    for (let i = (+pageNumb - 5); i <= (+pageNumb + 5); i++) {
        if (i > 1 && i < pagesAmount) {
            $('#movies').append($('<button>', {
                class: `pagin-btn`,
                id: `pagin_btn${i}`,
                text: `${i}`,
            }));
            maxInd = i;
        };
    };
    if (maxInd < (pagesAmount - 1)) {
        $('#movies').append($('<span>', {
            text: `. . .`,
        }));
    };
    $('#movies').append($('<button>', {
        class: `pagin-btn`,
        id: `pagin_btn${pagesAmount}`,
        text: `${pagesAmount}`,
    }));
};