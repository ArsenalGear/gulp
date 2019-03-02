//Функции инициализирующиеся или срабатывающие по document.ready
$(function () {

    // Убираем плейсхолдер у поля формы при фокусе на нем
    if ($('input,textarea').length > 0) {
        $('input,textarea').focus(function () {
            $(this).data('placeholder', $(this).attr('placeholder'))
                .attr('placeholder', '');
        }).blur(function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    }

    //Все инпуты с типом tel имеют маску +7 (999) 999 99 99
    if ($('input[type=tel]').length > 0) {
        $('input[type=tel]').mask('+7 (999) 999 99 99');
    }

    //+ -
    $('.counter__minus').on('click', function () {
        var inputVal = $(this).next('input').val();
        var downGrade = inputVal - 1;
        if (downGrade != 0) {
            $(this).next('input').val(downGrade);
        }
    });
    $('.counter__plus').on('click', function () {
        var inputVal = Number($(this).prev('input').val());
        console.log(typeof inputVal);
        var upGrade = Number(inputVal + 1);
        console.log(typeof upGrade);
        $(this).prev('input').val(upGrade);
    });

    //
    $(".desc-img").click(function(e) {
        $( ".popup" ).not($(this).next('.popup')).hide();
        $(this).next('.popup').fadeToggle(); //появление-исчезание блока
        e.stopPropagation();
    });
    $('.desc-img').click(function(e) {
        $( ".popup" ).not($(this).next('.popup')).hide();
    });
    $(document).click(function() {
        $('.popup').hide();
    });

    //
    $('#second-check').on('click', function () {
        if ($('#second-check').prop('checked') == true) {
            $('#second-block').show();
        }
        else {
            $('#second-block').hide();
        }
    });
    $('#third-check').on('click', function () {
        if ($('#third-check').prop('checked') == true) {
            $('#third-block').show();
        }
        else {
            $('#third-block').hide();
        }
    });
    $('#fourth-check').on('click', function () {
        if ($('#fourth-check').prop('checked') == true) {
            $('#fourth-block').show();
        }
        else {
            $('#fourth-block').hide();
        }
    });
    $('#fifth-check').on('click', function () {
        if ($('#fifth-check').prop('checked') == true) {
            $('#fifth-block').show();
        }
        else {
            $('#fifth-block').hide();
        }
    });
    $('#six-check').on('click', function () {
        if ($('#six-check').prop('checked') == true) {
            $('#six-block').show();
        }
        else {
            $('#six-block').hide();
        }
    });
    $('#first-check').on('click', function () {
        if ($('#first-check').prop('checked') == true) {
            $('#first-block').show();
        }
        else {
            $('#first-block').hide();
        }
    });

    //
    $('.single-item').slick({
        adaptiveHeight: true,
        arrows: false,
        dots: false,
        infinite: false,
        speed: 400,
        edgeFriction: false,
        nextArrow: $('.footer__desc'),
        initialSlide: 0
    });
    $('.footer__desc').on('click', function() {
        $('.single-item').slick('slickNext');
    });

    $('.single-item').on('swipe', function(event, slick, direction){
        if ($('.checkbox-radio-label__checxbox-input').prop('checked') == true) {
            // alert(1);
        }
        else {
            $('.single-item').slick({
                swipe: false
            });
        }
    });



    //
    $('.single-item').on('afterChange', function(event, slick, currentSlide){
        if (currentSlide == 0) {
            $('.footer__desc-black').hide();
            $('.first-link').addClass('active-link');
            $('.second-link').removeClass('active-link');
            $('.third-link').removeClass('active-link');
            $('.footer__desc').text('рассчитать стоимость');
        }
        if (currentSlide == 1) {
            $('.footer__desc-black').show();
            $('.footer__desc').text('оставить заявку');
            $('.first-link').removeClass('active-link');
            $('.second-link').addClass('active-link');
            $('.third-link').removeClass('active-link');
        }
        if (currentSlide == 2) {
            $('.footer__desc-black').hide();
            $('.footer__desc').text('отправить форму');
            $('.first-link').removeClass('active-link');
            $('.second-link').removeClass('active-link');
            $('.third-link').addClass('active-link');
        }
    });

    //

});