new WOW({
    animateClass: 'animate__animated',
}).init();

$(document).ready(function() {
    let menuOffset = $('#header').offset().top;
    $(window).scroll(function() {
        let scrollTop = $(window).scrollTop();
        if (scrollTop > menuOffset) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    });
});

$('.ticker-track').each(function () {

    const track = $(this);
    const original = track.html();

    while (track[0].scrollWidth < window.innerWidth * 2) {
        track.append(original);
    }

});

var swiper = new Swiper('.mySwiper', {
    spaceBetween: 30,
    speed: 900,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})




$('.ticket-btn').on('click', function () {
    let price = $(this).data('price');

    $('#total-price').text(price + ' ₽');

    $('.modal').addClass('open');
});


$('.modal-close').on('click', function () {
    $('.modal').removeClass('open');
    $('.payment-form')[0].reset();
    $('.payment-form input').css('border-color', '');
    $('.input-error').hide();
});


$('.modal-overlay').on('click', function () {
    $('.modal').removeClass('open');
    $('.payment-form')[0].reset();
    $('.payment-form input').css('border-color', '');
    $('.input-error').hide();
});



let message = $('.message');
let paymentForm = $('.payment-form');

$('#submit').click(function () {
    let name = $('#name');
    let phone = $('#phone');
    let email = $('#email');
    let payment = $('input[name="payment"]:checked');
    let agreement = $('input[name="agreement"]');
    let hasError = false;

    $('.input-error').hide();
    if (!payment.length) {
        $('.payment-methods')
            .next('.input-error').show();
         hasError = true;
    }
    if (!name.val()) {
        name.css('border-color', 'red');
        name.next().show();
        hasError = true;
    }

    if (!name.val()) {
        name.css('border-color', 'red');
        name.next().show();
        hasError = true;
    }
    if (!phone.val()) {
        phone.css('border-color', 'red');
        phone.next().show();
        hasError = true;
    }
    if (!email.val()) {
        email.css('border-color', 'red');
        email.next().show();
        hasError = true;
    }

    if (!agreement.is(':checked')) {
         $('.agreement-error').show();
         hasError = true;
    }

    if (!hasError) {
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout ",
            data: { name: name.val(), phone: phone.val(), email: email.val(), payment: payment.val(),
             agreement: agreement.is(':checked') },
        })
            .done(function( msg ) {


                if (msg.success) {
                    paymentForm.hide();
                    message.css('display', 'flex');
                    message.show();
                } else {
                    message.css('display', 'none');
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            });
    }

})
