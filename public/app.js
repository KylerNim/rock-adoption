///////////////////////////////////////// GLOBAL /////////////////////////////////////////////
let loggedUser = 1;

//////////////////////////////////// LOGIN // REGISTRY ///////////////////////////////////////
$('.loginForm').on('submit', (event) => {
    event.preventDefault();
    $.get('/userInfo', (data, error) => {
        if (error) { console.error(error); }
        if (auth(data) === 'success') {
            $('.loginScreen').toggleClass('none');
        } else {
            console.error('Bad Authentication');
        }
    })
})
$('.registryForm').on('submit', (event) => {
    event.preventDefault();
    let credentials = { userName: $('#regUserName').val(), password: $('#regPassword').val() }
    $.post({
        traditional: true,
        url: '/userInfo',
        contentType: 'application/json',
        data: JSON.stringify( credentials ),
        dataType: 'json',
        success: function(response){
            $('.login').toggleClass('none');
            $('.createAccount').toggleClass('none');
            $('.register').toggleClass('none');
        }
    });
})

$('.registerButton').click((event) => {
    $('.login').toggleClass('none');
    $('.createAccount').toggleClass('none');
    $('.register').toggleClass('none');
})

//////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
let auth = function(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].user_name === $('#userName').val() && data[i].password === $('#password').val()) {
            loggedUser = data[i].id
            return 'success';
        }
    }
    return 'fail';
}
//////////////////////////////////////// MAIN PAGE //////////////////////////////////////////


let generateRockTiles = function() {
    $.get('/rocks', (data, error) => {
        if (error) { console.error(error); };
        for (let i = 0; i < data.length; i++) {
            if (data[i].user_id === null) {
                let div = $(`<div class="rockTile" id="${data[i].id}"></div>`).appendTo('.rockList');
                if (data[i].gender === 'Male' || data[i].gender === 'Female') {
                    let img = $(`<img class="tileImg" src="resources/${data[i].type}${data[i].gender}.png">`).appendTo(div);
                } else {
                    let img = $(`<img class="tileImg" src="resources/${data[i].type}Male.png">`).appendTo(div);
                }
                let h3 = $(`<h3 style="color: white">${data[i].first_name} ${data[i].last_name}</h3>`).appendTo(div);
                let h4 = $(`<h4 class="redText"><span style="color: rgb(115, 115, 255)">${randNum()}</span> people watching!</h4>`).appendTo(div);
            }
        }
    })
} 

generateRockTiles();

$('.rockList').click((event) => {
    $.get(`/rocks/${event.target.id}`, (data, error) => {
        if (error) { console.error(error); };
        if (data.gender === 'Male' || data.gender === 'Female') {
            $('.purchaseImg').attr('src', `resources/${data.type}${data.gender}.png`);
        } else {
            $('.purchaseImg').attr('src', `resources/${data.type}Male.png`);
        }
        $('.purchaseHeader').html(`${data.first_name} ${data.last_name}`);
        $('.purchaseImg').attr('id', event.target.id);
        $('.buyButton').removeClass('none');
        $('.adoptedMessage').addClass('none');
        $('.purchasePage').removeClass('hidden');
    })
})

let randNum = function() {
    return Math.floor(Math.random() * 50);
}

//////////////////////////////////////// BANNER //////////////////////////////////////////
$('.bannerLogo').click((event) => {
    $('.purchasePage').addClass('hidden')
    $('.profilePage').addClass('hidden')
})

$('.profileLogo').click((event) => {
    $('.profilePage').removeClass('hidden');
    $('.purchasePage').addClass('hidden');
})

//////////////////////////////////// Purchase Page //////////////////////////////////////
$('.buyButton').click((event) => {
    let currentRock = $('.purchaseImg').attr('id');
    $.ajax({
        url: `/rocks/${currentRock}`,
        contentType: 'application/json',
        type: 'PATCH',
        data: JSON.stringify({ "user": loggedUser }),
        success: (result) => {
            console.log(result);
            $('.buyButton').addClass('none');
            $('.adoptedMessage').removeClass('none');
            $('.rockList').empty();
            generateRockTiles();
        },
        error: (error) => {  if (error) { console.error(error); } }
    })
});