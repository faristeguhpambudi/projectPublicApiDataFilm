function cariMovie()
{
    //Hilangkan dulu movie list
    $('#daftar-film').html('');
    //BUAT AJAX UNTUK API
    $.ajax({
        //menghubungkan ke api
        url : 'http://www.omdbapi.com',
        type : 'get',
        dataType : 'json',
        data : {
            //parameter apikey dan kata pencarian
            'apikey' : '629fa4c3',
            's' : $('#kolom-input').val()
        },
        success : function (result){
            if(result.Response == "True"){
                let film = result.Search;
                $.each(film, function(i, data){
                    $('#daftar-film').append(`
                    <div class="col-md-3">
                    <div class="card mb-3">
                    <img class="card-img-top" src="`+data.Poster+`" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">`+data.Title+`</h5>
                        <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                        <a href="#" class="btn btn-sm-primary tombol-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID+`">Lihat Detail</a>
                        </div>
                    </div>
                    </div>
                    `);
                });

                $('#kolom-input').val("");
            } else {
                $('#daftar-film').html(`
                    <div col>
                        <h2 class="text-center">Film yang anda cari tidak ditemukan</h2>
                    </div>
                `);
            }
        }

    });
}

//JIKA BUTTON CARI DI KLIK
$('#tombol-cari').on('click', function(){
    cariMovie();
});

//JIKA TOMBOL ENTER DIENTER
$('#kolom-input').on('keyup', function(e){
    if(e.keyCode == 13){
        cariMovie();
    }
});

//JIKA TOMBOL LHAT DETAIL DI KLIK
$('#daftar-film').on('click', '.tombol-detail', function(){
    $.ajax({
        url : 'http://omdbapi.com',
        dataType: 'json',
        type : 'get',
        data : {
            'apikey' : '629fa4c3',
            'i' : $(this).data('id')
        },
        success : function(film) {
            if(film.Response == "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4>
                                <img src="`+film.Poster+`" class="img-fluid">
                            </div>    
                            <div class="col-md-8>
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+film.Title+`</h3></li>
                                <li class="list-group-item">`+film.Released+`</li>
                                <li class="list-group-item">`+film.Genre+`</li>
                                <li class="list-group-item">`+film.Director+`</li>
                                <li class="list-group-item">`+film.Actors+`</li>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});