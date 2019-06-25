//Функции инициализирующиеся или срабатывающие по document.ready
$(function () {

    // // Убираем плейсхолдер у поля формы при фокусе на нем
    // if ($('input,textarea').length > 0) {
    //     $('input,textarea').focus(function () {
    //         $(this).data('placeholder', $(this).attr('placeholder'))
    //             .attr('placeholder', '');
    //     }).blur(function () {
    //         $(this).attr('placeholder', $(this).data('placeholder'));
    //     });
    // }

    // //Все инпуты с типом tel имеют маску +7 (999) 999 99 99
    // if ($('input[type=tel]').length > 0) {
    //     $('input[type=tel]').mask('+7 (999) 999 99 99');
    // }

    $('#go').on('click', function() {
       $('.first-slide').hide();
       $('.second-slide').fadeIn();
    });

    $('.next').on('click', function() {
        $(this).closest('section').hide();
        $(this).closest('section').next('section').fadeIn();
    });

    $('.back').on('click', function() {
       $(this).closest('section').hide();
        $(this).closest('section').prev('section').fadeIn();
    });

    $('input:radio').on('change', function() {

        var closestQuest = $(this).closest('.question'); //ближайший блок вопросов
        var thisScoreAttr = parseInt($(this).attr('data-score')); //очки этого инпута
        var dataMassive = []; //массив для сбора дата атрибутов

        closestQuest.find('[data-score]').each(function(e) { //ф-я сбора в массив дата атрибутов

            var $el = parseInt($(this).attr('data-score'));
            dataMassive.push(parseInt($el));
        } );

        var maxInMassive = Math.max(...dataMassive);// максимальный атрибут в вопросе

        if ( closestQuest.hasClass('yellow') ) {

            closestQuest.attr('data-choose', '').attr('data-choose', thisScoreAttr);
        }
        else {

            closestQuest.attr('data-max', maxInMassive);
            closestQuest.attr('data-choose', thisScoreAttr);

            if ( closestQuest.next('button').hasClass('back') ) {

                $(this).closest('.questions').find('.next').fadeIn();
            }
            $('html, body').animate({scrollTop: $("header").height()+ 7200 },"slow");
        }

        closestQuest.next('.question').fadeIn(); //появление блока с вопросами следущего
        closestQuest.addClass('yellow'); //добавленин класса yellow к отвеченному блоку
        closestQuest.attr('data-max', maxInMassive); //добавление макс возможного ответа в блок с вопросом
    });

    $('#total').on('click', function() {

        var totalMassiveChoose = [];
        var totalMassiveMax = [];

        $('main').find('[data-choose]').each(function(e) {

            var $el = parseInt($(this).attr('data-choose'));
            totalMassiveChoose.push(parseInt($el));
        } );

        var totalMassiveChooseResult = totalMassiveChoose.reduce(function(sum, current) {
            return sum + current;
        }, 0);

        $('main').find('[data-max]').each(function(e) {

            var $el = parseInt($(this).attr('data-max'));
            totalMassiveMax.push(parseInt($el));
        } );

        var totalMassiveMaxResult = totalMassiveMax.reduce(function(sum, current) {
            return sum + current;
        }, 0);

        $('.calc').text('').text(totalMassiveChooseResult);
        $('.max-calc').text('').text(totalMassiveMaxResult);
        $('.total-percent, .total').text('').text(Math.round(totalMassiveChooseResult/totalMassiveMaxResult*100));
    });
});
