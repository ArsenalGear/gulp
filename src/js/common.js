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
        var thisScoreSave = parseInt(closestQuest.attr('data-total')); //очки этого инпута уже отвеченного ранее
        var totalScore = parseInt($('.calc').text()); //подсчет суммы всех отвеченных баллов
        var totalScoreMax = parseInt($('.max-calc').text()); //подсчет суммы всех максимальных баллов в тесте
        var dataMassive = []; //массив для сбора дата атрибутов
        var scoreToCalc = totalScore + thisScoreAttr;

        closestQuest.find('[data-score]').each(function(e) { //ф-я сбора в массив дата атрибутов

            var $el = parseInt($(this).attr('data-score'));
            dataMassive.push(parseInt($el));
        } );

        var maxInMassive = Math.max(...dataMassive);// максимальный атрибут в вопросе
        // var scoreToMaxCalc = totalScoreMax + maxInMassive; ///////



        if ( closestQuest.hasClass('yellow') ) {
            closestQuest.attr('data-total', thisScoreAttr); //добавление ответа в блоке во временное хранилище в этот же блок

            var scoreToMaxCalc =  maxInMassive; ///////


            var tempCalc = parseInt($('.calc').text());

            var newYellowScore = tempCalc - thisScoreSave + thisScoreAttr;
            $('.calc').text(newYellowScore);
            console.log(newYellowScore);
            console.log(scoreToMaxCalc);
            console.log(newYellowScore/scoreToMaxCalc*100);

            $('.total-percent, .total').text('').text(Math.round((newYellowScore/scoreToMaxCalc*100)));

        }
        else {
            closestQuest.attr('data-total', thisScoreAttr); //добавление ответа в блоке во временное хранилище в этот же блок
            var scoreToMaxCalc = totalScoreMax + maxInMassive; ///////


            $('.calc').text(scoreToCalc);
            $('.max-calc').text(scoreToMaxCalc);
            console.log(scoreToCalc);
            console.log(scoreToMaxCalc);
            $('.total-percent, .total').text('').text(Math.round((scoreToCalc/scoreToMaxCalc*100)));

            if ( closestQuest.next('button').hasClass('back') ) {

                $(this).closest('.questions').find('.next').fadeIn();
            }
            $('html, body').animate({scrollTop: $("header").height()+ 7200 },"slow");
        }

        closestQuest.next('.question').fadeIn(); //появление блока с вопросами следущего
        closestQuest.addClass('yellow'); //добавленин класса yellow к отвеченному блоку

        closestQuest.attr('data-max', maxInMassive); //добавление макс возможного ответа в блок с вопросом
    });

});