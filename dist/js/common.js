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

    // //Все инпуты с типом tel имеют маску +7 (999) 999 99 99
    // if ($('input[type=tel]').length > 0) {
    //     $('input[type=tel]').mask('+7 (999) 999 99 99');
    // }

    // var firstBlock = [ //список всех вопросов
    //     [   //один вопрос
    //         {
    //             name: 'name-test',
    //             title: 'Вы попросили, чтобы подрядчик приехал на объект, посмотрел все на месте и составил предварительную смету. Подрядчик',
    //             question: [
    //                 {
    //                     question: 'предупредил, что это платная услуга, сразу сказал цену и что оплата будет учтена в стоимости работ',
    //                     score: '2'
    //                 },
    //                 {
    //                     question: 'предупредил, что это платная услуга, но добавил, что он рядом/по дороге, поэтому оплату за выезд не возьмёт',
    //                     score: '1'
    //                 },
    //                 {
    //                     question: 'подрядчик не берёт оплату за выезд',
    //                     score: '0'
    //                 }
    //             ]
    //         }
    //     ],
    //     [   //второй вопрос
    //
    //     ]
    // ];

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
        var totalScore = parseInt($('.calc').text()); //все очки за тест
        var dataMassive = []; //массив для сбора дата атрибутов
        var scoreAttr = parseInt($(this).attr('data-score')); //очки этого инпута
        var massiveScoreCalc;

        closestQuest.find('[data-score]').each(function(e) { //ф-я сбора в массив дата атрибутов

            var $el = parseInt($(this).attr('data-score'));
            dataMassive.push(parseInt($el));
        } );

        var maxInMassive = Math.max(...dataMassive);// максимальный атрибут в вопросе

        if ( closestQuest.hasClass('yellow') ) {

            var yellowScoreMassive = parseInt(closestQuest.find('.ww').text()); //сколько было до этого всего очков

            if (maxInMassive == scoreAttr) { //если ответ равен максимальному то присваем 100 балов
                closestQuest.find('.ww').text(100);
                massiveScoreCalc = 100;
            }

            else {
                closestQuest.find('.ww').text(Math.ceil(scoreAttr/maxInMassive * 100));
                massiveScoreCalc = Math.ceil(scoreAttr/maxInMassive * 100);
            }

            $('.calc, .total').text(totalScore - yellowScoreMassive + massiveScoreCalc); ///
        }
        else {

            if (maxInMassive == scoreAttr) { //если ответ равен максимальному то присваем 100 балов
                closestQuest.find('.ww').text(100);
                massiveScoreCalc = 100;
            }

            else {
                closestQuest.find('.ww').text(Math.ceil(scoreAttr/maxInMassive * 100));
                massiveScoreCalc = Math.ceil(scoreAttr/maxInMassive * 100);
            }

            $('.calc, .total').text(massiveScoreCalc + totalScore);

            if ( closestQuest.next('button').hasClass('back') ) {

                $(this).closest('.questions').find('.next').fadeIn();
            }
            $('html, body').animate({scrollTop: $("header").height()+ 7200 },"slow");
        }

        closestQuest.next('.question').fadeIn(); //появление блока с вопросами следущего
        closestQuest.addClass('yellow');
        closestQuest.attr('data-total', thisScoreAttr);
    });

});