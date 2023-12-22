/////////////////////////////////////// LOGIN ///////////////////////////////////////
$('.loginForm').on('submit', (event) => {
    event.preventDefault();
    $.get('/userInfo', (data, error) => {
        if (error) { console.error(error); }
        if (auth(data) === 'success') {
            $('.loginScreen').toggleClass('hidden');
        } else {
            console.error('Bad Authentication');
        }
    })
})

$('.registerButton').click((event) => {
    $('.login').toggleClass('none');
    $('.createAccount').toggleCLass('none');
    $('.register').toggleClass('none');
})

/////////////////////////////////////////////////////////////////////////////////////
$.get('/rocks', (data, error) => {
    if (error) { console.error(error); };
    console.log(data);
})

///////////////////////////////////// FUNCTIONS //////////////////////////////////////
let auth = function(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].user_name === $('#userName').val() && data[i].password === $('#password').val()) {
            return 'success';
        }
    }
    return 'fail';
}