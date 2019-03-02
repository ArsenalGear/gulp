jQuery(function ($) {

    // Убираем плейсхолдер у поля формы при фокусе на нем
    $('input,textarea').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'))
            .attr('placeholder', '');
    }).blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });

    //Все инпуты с типом tel имеют маску +7 ( 999 ) 999 - 99 - 99
    // jQuery('input[type=tel]').mask('+7 ( 999 ) 999 - 99 - 99');

    // //Кнопка вниз на приветственном экране
    // $('#greetings-button').click(function () {
    //     $('html').animate({
    //         scrollTop: $('#greetings').height()
    //     },1000);
    // });

    // //Логика открытия и закрытия окна поиска в шапке
    // $('#header-search-open, #header-search-close').click(function () {
    //     if ($('#header-search').is(':visible')) {
    //         $($('#header-search')).hide();
    //     } else {
    //         $($('#header-search')).show();
    //     }
    // });
    // $(document).mouseup(function (e){
    //     if (!$('#header-search').is(e.target) && $('#header-search').has(e.target).length === 0) {
    //         $('#header-search').hide();
    //     }
    // });

    //чистка инпута
    $('.close-button').click(function (e) {
        e.preventDefault();
        var element = $(this);
        element.parent().find('.similar-input').val('').css('border', '2px solid #f9a825');
        $(".close-button" ).hide();
    });
    $( ".similar-input" ).focus(function() {
        $(".close-button" ).hide();
        $(this).next( ".close-button" ).show();
    });

    //Чистка поиска
    $('.close-button-search').click(function (e) {
        e.preventDefault();
        var element = $(this);
        element.parent().find('.search__input').val('');
        $(".close-button-search" ).hide();
        $('.kan-card').show();
    });
    $( ".search__input" ).on( "change input", function() {
        if ($('.search__input').val() === '') {
            $(".close-button-search").hide();
        }
    });

    //
    $('.orange, .white').click(function (e) {
        $(".close-button" ).hide();
    });

    // //проверка на совпадения паролей авторизации
    // $('.new-user__orange').click(function (e) {
    //     var pass = $("#password").val();
    //     var pass_rep = $("#password-confirm").val();
    //     if (pass != pass_rep) {
    //         // $("#password, #password-confirm").css('border', '#ff5722 2px solid');
    //         $('.new-user__descr').show();
    //     }
    //     else {
    //         // $("#password, #password-confirm").css('border', '#65d672 2px solid');
    //     }
    // });

    //
    $( ".similar-input" ).focus(function() {
        $(".new-user__descr").hide();
    });

    // //рандомайзер паролей
    // function str_rand() {
    //     var result       = '';
    //     var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    //     var max_position = words.length - 1;
    //     for( i = 0; i < 10; ++i ) {
    //         position = Math.floor ( Math.random() * max_position );
    //         result = result + words.substring(position, position + 1);
    //     }
    //     return result;
    // }
    // $('.generatePassword').click(function() {
    //     document.getElementById('password').setAttribute('type', 'text');
    //     $('#password').val(str_rand());
    // });

    //перекраска инпута рамки
    $( ".enter__input, .similar-input, .similar-input-no, .orange-kan-input" ).on( "change input", function() {

        if ($(this).val() == '') {
            $(this).css('border', '2px solid #f9a825');
            $(".close-button" ).hide();
        }
        else {
            $(this).css('border', '2px solid #9e9e9e');
        }
    });

    // Убираем фокус с инпута при загрузке страницы
    $(function () {
        $('input').blur();
    });

    //Меню
    $('.header__burger').click(function () {
        $('.main-menu').slideToggle();
    });
});

$(document).ready(function() {

    $( ".similar-input" ).each(function() {
        if ($(this).val().length > 0) {
            $(this).css('border', '2px solid #9e9e9e');
        }
        // else  {
        //     $(this).css('border', '2px solid #f9a825');
        // }
    });
    //Появление кнопки чистки
    $( ".similar-input, .orange-kan-input" ).keyup(function() {
        if ($(this).val().length > 0) {
            $(this).next( ".close-button" ).show();
        }
    });

    //Появление кнопки чистки в поиске
    $( ".search__input" ).keyup(function() {
        if ($(this).val().length > 0) {
            $(this).next( ".close-button-search" ).show();
        }
    });

    //сворачивание иконок канбана
    $('.kanban__close-icon').click(function () {
        $(this).closest(".kanban__column").next(".kanban__short-column").show();
        $(this).closest(".kanban__column").hide();
        saveColumnsSates();
    });
    $('.kanban__short-column').click(function () {
        $(this).prev(".kanban__column").show();
        $(this).hide();
        //saveColumnsSates();
    });
    $('.kanban__short-column').mouseup(function () {
        $(this).prev(".kanban__column").show();
        $(this).hide();
        saveColumnsSates();
    });

    //расширенное представление карточек канбана
    $('.breadcrumbs__img.off').click(function () {
        $('.kan-card.portlet').css('height', '150px');
        $('.kan-card.portlet').css('margin-bottom', '5px');
        $('.kan-card__kan-second-row, .kan-card__kan-third-row').fadeIn('fast');
        $('.breadcrumbs__img.off').hide();
        $('.breadcrumbs__detail-img').show();

    });
    $('.breadcrumbs__detail-img').click(function () {
        $('.kan-card.portlet').css('height', '70px');
        $('.kan-card.portlet').css('margin-bottom', '10px');
        $('.kan-card__kan-second-row, .kan-card__kan-third-row').fadeOut('fast');
        $('.breadcrumbs__img.off').show();
        $('.breadcrumbs__detail-img').hide();

    });

    //подсказки
    $('.search__img.off').click(function () {
        $('.kanban__question-img').fadeIn();
        $('.search__img.on').show();
        $('.search__img.off').hide();
    });
    $('.search__img.on').click(function () {
        $('.kanban__question-img').fadeOut();
        $('.search__img.on').hide();
        $('.search__img.off').show();
    });

    //рассчет параметров экрана
    window.onresize = function () {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
        // console.log(width);
        $('.kanban__column-kan-block').height($(window).height()-207); // online screen scroll
    };

    //рассчет высоты нижнего горизонтального скрола
    $('.kanban__column-kan-block').height($(window).height()-207);

    //ajax запрос создания карточки работы
    $(".edit-modal-input__form-block").submit(function(event) { //Событие, которое срабатывает при отправке формы
        event.preventDefault();
        var form_data = $(this).serializeArray(); //собераем все данные из формы //Эквивалентно записи  var form_data = $(".edit-modal__form-block").serialize();
        //var workId = parseInt($("#modal-id").text()); // нужно для редактирования карточки работы
        var projectId = parseInt($('#hidden-id-project').text());
        //var state = $("[data-work-id='" + workId + "']").closest('.kanban__column-kan-block').data('href'); //используется при изменении карточки работы, т.к. параметр state обязателен
        url = "/create-work/" + projectId; //Создание карточки
        form_data.push({name: "state", value: 3}); //При создании карточки она помещается в "Запланированные", чему соответствует номер состояния "3"
        $.ajax({
            type: "POST", //Метод отправки
            url: url, //для создания карточки
            data: form_data, //Здесь массив данных, собранных с формы с помощью serialize() в формате json
            success: function(data) {
                modalCloseInput();
                var parseData = JSON.parse(data);

                var valOfMeters = parseData.amount_unit;

                switch (parseInt(valOfMeters)) {
                    case 0:
                        amount_unit = "м";
                        break;
                    case 1:
                        amount_unit = "м&sup2;";
                        break;
                    case 2:
                        amount_unit = "м&sup3;";
                        break;
                    case 3:
                        amount_unit = "м\\пог";
                        break;
                    case 4:
                        amount_unit = "шт";
                        break;
                    case 5:
                        amount_unit = "компл";
                        break;
                }

                calculatedPriceSuccess = calculatePrice(projectId, parseData.work_id);
                calculatedPriceSuccess.done(function(){
                    calculatedPrice = JSON.parse(calculatedPriceSuccess.responseText);
                    //console.log(parseData);
                    transfer = getWorkCardHtml( parseData.work_id, parseData.name, parseData.extra, parseData.amount, amount_unit, parseData.price, parseData.sale, calculatedPrice, parseData.durability );
                    $('[data-href="3"]').append(transfer);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

//Динамическое создание карточки работы для добавления или замены аяксом
function getWorkCardHtml( work_id, name, extra, amount, amount_unit, price, sale, calculatedPrice, durability ) {
    if (!durability){durability = ' - ';}
    if (!extra){extra = '';}
    if (!sale){sale = '';}

    price = numberFormatWithSpaces(price);
    amount = numberFormatWithSpaces(amount);
    calculatedPrice = numberFormatWithSpaces(calculatedPrice);

    var transfer = '<div class="kan-card portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" data-work-id="' + work_id +'">\n' +
        '                                        <div class="kan-card__right-icon"></div>\n' +
        '                                        <div class="kan-card__middle-icon"></div>\n' +
        '                                        <div class="kan-card__center-icon"></div>\n' +
        '                                        <div class="kan-card__kan-inside-card ui-sortable-handle  ui-corner-all portlet-header"><span class="ui-icon ui-icon-minusthick portlet-toggle"></span>\n' +
        '                                            <div class="kan-card__kan-first-row">\n' +
        '                                                <div class="kan-card__kan-check-block">\n' +
        '                                                    <label class="checkbox-label">\n' +
        '                                                        <input class="checkbox-label__checxbox-input" type="checkbox">\n' +
        '                                                        <span class="checkbox-label__checxbox-span grey-spn"></span>\n' +
        '                                                    </label>\n' +
        '                                                </div>\n' +
        '                                                <div class="kan-card__kan-title-block">\n' +
        '                                                    <div class="kan-card__kan-title-block-row">\n' +
        '                                                        <div class="kan-card__kan-id">\n' +
        '                                                            <span class="kan-card__kan-id-span">ID:\n' +
        '                                                                <span class="card-id">' + work_id + '</span>\n' +
        '                                                            </span>\n' +
        '                                                        </div>\n' +
        '                                                    </div>\n' +
        '                                                    <div class="kan-card__kan-title-block-row portlet-content">\n' +
        '                                                        <div class="kan-card__kan-project">\n' +
        '                                                            <span class="kan-card__kan-project-desc">' + name + '</span>\n' +
        '                                                        </div>\n' +

        '                                     <span class="kan-card__kan-day-limit">\n' +
        '                                       <div class="kan-card__kan-day-limit-block planned-block">\n' +
        '                                           <span class="kan-card__kan-day-timer">\n' +
        '                                               <span class="planned-amount">' + durability + '</span>\n' +
        '                                               <span class="kan-card__kan-days planned-day">дн</span>\n' +
        '                                           </span>\n' +
        '                                       </div>' +
        '                                     </span>\n' +

        '                                                    </div>\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '                                            <div class="kan-card__kan-second-row">\n' +
        '                                                <div class="kan-card__kan-check-block"></div>\n' +
        '                                                <div class="kan-card__kan-description">\n' +
        '                                                    <span class="kan-card__kan-main-description">' + extra + '</span>\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '                                            <div class="kan-card__kan-third-row">\n' +
        '                                                <div class="kan-card__price-row">\n' +
        '                                                    <div class="kan-card__amount-block">\n' +
        '                                                        <div class="kan-card__amount-title">\n' +
        '                                                            <span class="kan-card__amount-desc">кол-во</span>\n' +
        '                                                        </div>\n' +
        '                                                        <div class="kan-card__amount-value">\n' +
        '                                                            <span class="kan-card__amount-desc-val">' + amount + '</span>\n' +
        '                                                            <span class="kan-card__amount-desc-desc">' + amount_unit + '</span>\n' +
        '                                                        </div>\n' +
        '                                                    </div>\n' +
        '                                                    <div class="kan-card__price-block">\n' +
        '                                                        <div class="kan-card__price-title">\n' +
        '                                                            <span class="kan-card__price-desc">цена за ед</span>\n' +
        '                                                        </div>\n' +
        '                                                        <div class="kan-card__price-value">\n' +
        '                                                            <span class="kan-card__price-desc-val">' + price + '</span>\n' +
        '                                                            <span class="kan-card__price-percent">-' + sale + '%</span>\n' +
        '                                                        </div>\n' +
        '                                                    </div>\n' +
        '                                                    <div class="kan-card__total-price-block">\n' +
        '                                                        <span class="kan-card__symbol">Σ</span>\n' +
        '                                                        <span class="kan-card__total-price-amount">' + calculatedPrice + '</span>\n' +
        '                                                    </div>\n' +
        '                                                    <div class="kan-card__graph-block">\n' +
        '                                                        <div class="progress-bar--graph">\n' +
        '                                                            <div class="progress-bar--header">\n' +
        '                                                                <div class="progress-bar--header--left green-kan">Оплачено</div>\n' +
        '                                                                <div class="progress-bar--header--right orange-kan">Остаток</div>\n' +
        '                                                            </div>\n' +
        '                                                            <div class="progress-bar--bar">\n' +
        '                                                                <div class="progress-bar--bar--start green-kan"></div>\n' +
        '                                                                <div class="progress-bar--bar--end orange-kan"></div>\n' +
        '                                                                <div class="progress-bar--bar--line">\n' +
        '                                                                    <div style="width: 70%" class="progress-bar--bar--segment  green-kan"></div>\n' +
        '                                                                    <div class="progress-bar--bar--segment orange-kan"></div>\n' +
        '                                                                </div>\n' +
        '                                                            </div>\n' +
        '                                                            <div class="progress-bar--footer">\n' +
        '                                                                <div class="progress-bar--footer--left green-kan">25 000</div>\n' +
        '                                                                <div class="progress-bar--footer--right orange-kan">45 000</div>\n' +
        '                                                            </div>\n' +
        '                                                        </div>\n' +
        '                                                    </div>\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                        <div class="kan-card__alert-block">\n' +
        '                                            <div class="kan-card__kan-alert"></div>\n' +
        '                                        </div>\n' +
        '                                    </div>';
    return transfer;
}

function changeWorkState(projectId, workId, newState) {
    $.ajax({
        type: "POST",
        url: "/edit-work/" + projectId + "/" + workId,
        data:  {
            "_token" : $('meta[name="csrf-token"]').attr('content'),
            "status" : newState
        },
        success: function (data) {
            //console.log(data);
            $('[data-work-id="' + workId + '"]').find('.kan-card__kan-day-limit').html(data); //В data передаётся html с отформатированным для каждой колонки временем
        }
    });
    saveColumnsSates();
}

//Сохраняет открытое/закрытое состояние колонок для проекта. Вызывается при скрытии/показе колонок и смене состояния
function saveColumnsSates() {
    var projectId = parseInt($('#hidden-id-project').text());
    var columnStatesArr = {
        "canceled" : 0,
        "imported" : 0,
        "planned" : 0,
        "in_work" : 0,
        "preaccepted" : 0,
        "accepted" : 0
    };

    var states = $('.kanban__column:visible');

    $.each(states, function (i, item) {
        switch (item.id){
            case ("cancel-block"):
                columnStatesArr['canceled'] = 1;
                break;
            case ("import-block"):
                columnStatesArr['imported'] = 1;
                break;
            case ("planned-block"):
                columnStatesArr['planned'] = 1;
                break;
            case ("inwork-block"):
                columnStatesArr['in_work'] = 1;
                break;
            case ("inwork-block"):
                columnStatesArr['in_work'] = 1;
                break;
            case ("napriemke-block"):
                columnStatesArr['preaccepted'] = 1;
                break;
            case ("confirm-block"):
                columnStatesArr['accepted'] = 1;
                break;
        }
    });
    //(columnStatesArr);
    $.ajax({
        type: "POST",
        url: "/save-columns-states/" + projectId,
        data:  {
            "_token" : $('meta[name="csrf-token"]').attr('content'),
            "columns_states" : columnStatesArr
        }
    });
}


//открытие главной модаклки из канбана
$(document).on("click", ".kan-card__kan-title-block, .kan-card__kan-second-row, .kan-card__kan-third-row", function (e) {
    $('.edit-modal-input__total-summ').val();
    if ($(".orange-kan-input").val() == '') {
        $(".orange-kan-input").css('border', '2px solid #9e9e9e');
    }
    else {

    }
    $("#overlay").show();
    $('.preloader-block').show();
    var card_id = $(this).closest('.portlet').attr('data-work-id');//получение id карточки
    $('#modal-id').html(card_id); //подстановка id карточки

    var url = "/get-work/" + $('#hidden-id-project').text() + "/" + card_id;
    //ajax запрос
    var form_data = $(this).serialize(); //собераем все данные из формы //Эквивалентно записи  var form_data = $("#form").serialize();
    //Тут сам аякс запрос
    $.ajax({
        type: "POST", //Метод отправки
        url: url, //путь до php фаила отправителя (адрес, который скажет backend разработчик)
        data:  {
            "_token": $('meta[name="csrf-token"]').attr('content'),
            "calculate": "price"
        }, //Здесь массив данных, собранных с формы с помощью serialize() в формате json
        success: function(data) {
            //код в этом блоке выполняется при успешной отправке сообщения
            // $('.edit-modal__create').html("ИЗМЕНИТЬ");
            console.log(data);
            var parseData = JSON.parse(data);

            var valOfMeters = parseInt(parseData.amount_unit);
            $('.amount-unit-area-update').val(valOfMeters);

            amount_unit = getAmountUnit(valOfMeters);

            /* //Расчёт плановой длительности (из даты завершения и даты создания карточки)
             var date1 = new Date(parseData.finish_date);
             var date2 = new Date(parseData.created_at);
             var durability_days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));*/
            console.log('qq: ');
            $('#name-area-update').text(parseData.name);
            if (parseData.extra !== '0'){
                $('#extra-area-update').text(parseData.extra);
            } else {
                $('#extra-area-update').text('');
            }
            $('#val-area-update').text(numberFormatWithSpaces(parseData.amount));
            $('#amount-unit-area-update').html(amount_unit).attr('data-amount-unit', valOfMeters);
            $('#price-area-update').text(numberFormatWithSpaces(parseData.price));
            $('#sale-area-update').text(parseData.sale);
            $('.edit-modal__total-summ').text(parseData.calculated_price);
            var durability = parseData.durability;
            if (durability == 0){ durability = '-';}
            $('.edit-modal-input__mini-begin-planned').find('.edit-modal__val-days').text(durability);

            var start_date = new Date(parseData.start_state_date);
            var start_day = start_date.getDate();
            var start_month = getMonthFromNumber(start_date.getMonth() + 1);
            var start_date_full = start_day + ' ' + start_month;
            $('.edit-modal__begin').text(start_date_full);
            $('.edit-modal__show-block-start-val-val').text(start_day);
            $('.edit-modal__show-block-start-val-month').text(start_month);

            if (parseData.state == 5){ //preaccepted
                lostDays = getDaysFromNowToDate(start_date);
                console.log('lostDays: ' + lostDays);
                console.log('test: ');
                if (lostDays <= 0){
                    lostDays = '-';
                }
                $('.edit-modal__show-block-end-val-val').text(lostDays);
            }


            var endDateVal = getEndDate(parseData.start_state_date, parseData.durability);
            console.log(endDateVal);
            if (parseData.durability == 0){
                endDateVal = '-';
            }
            $('.edit-modal-input__mini-begin-ended').find('.edit-modal__val-days').text(endDateVal);

            switch (parseData.state){
                case 1:
                    stateClass = 'canseled-state';
                    stateName = "отменено";
                    break;
                case 2:
                    stateClass = 'imported-state';
                    stateName = "импортированно";
                    break;
                case 3:
                    stateClass = 'planned-state';
                    stateName = "запланированно";
                    break;
                case 4:
                    stateClass = 'in-work-state';
                    stateName = "в работе";
                    break;
                case 5:
                    stateClass = 'pre-accepted-state';
                    stateName = "на приёмке";
                    break;
                case 6:
                    stateClass = 'accepted-state';
                    stateName = "принято";
                    break;
            }

            $('.edit-modal__link-stat').text(stateName);
            $('.edit-modal__link-stat').removeClass().addClass('edit-modal__link-stat').addClass(stateClass);
            $('.preloader-block').hide();
            $('.edit-modal').show();
        }
    });
});

//Вывод только цифр
// function validate(event) {
//     var theEvent = event || window.event;
//     var key = theEvent.keyCode || theEvent.which;
//     key = String.fromCharCode( key );
//     var regex = /[0-9]|\./;
//     if( !regex.test(key) ) {
//         theEvent.returnValue = false;
//         if(theEvent.preventDefault) theEvent.preventDefault();
//     }
// }

function getAmountUnit(valOfMeters) {
    switch (parseInt(valOfMeters)) {
        case 0:
            amount_unit = "м";
            break;
        case 1:
            amount_unit = "м&sup2;";
            break;
        case 2:
            amount_unit = "м&sup3;";
            break;
        case 3:
            amount_unit = "м\\пог";
            break;
        case 4:
            amount_unit = "шт";
            break;
        case 5:
            amount_unit = "компл";
            break;
    }

    return amount_unit;
}

//убирание вертикального скрола
// $(".kan-card__kan-inside-card").mousedown(function(){
//     $('.kanban__column-kan-block ').css('overflow-y', 'visible');
// });
// $(".kan-card__kan-inside-card").mouseup(function(){
//     $('.kanban__column-kan-block ').css('overflow-y', 'overlay');
// });

//Перетаскивание элементов канбана

$( ".column" ).sortable({
    connectWith: ".column",
    handle: ".portlet-header",
    tolerance: "pointer",
    start: function (event, ui) {
        ui.item.addClass('tilt');
        //var x = event.offsetX==undefined?event.layerX:event.offsetX;
        cardsCount = ui.item.prev().length;
        //ui.item.topcardoffset = 10;// event.offsetY==undefined?event.layerY:event.offsetY;
        ui.item.laststate = ui.item.parent('.column').data('href');
        ui.item.rightcardoffset = 449 - getColumnIdByCoursorCoords( event.pageX + $('.kanban__main-block').scrollLeft() ).rightcardoffset;
       // ui.item.topcardoffset = 129 - getColumnIdByCoursorCoords( event.pageX + $('#cancel-block').scrollTop() );

        console.log("topOffset: " + cardsCount) ;
    },
    helper: function(event, ui) {
        return ui
    },
    sort: function (event, ui) {
        var kanbanWidth = $('.kanban__main-block').width();
        var xPos = event.pageX;
        var yPos = event.pageY;
        /*console.log('_________');
        console.log(xPos);
        console.log(yPos);
        console.log('_________');*/
        //Ширина карточки работы = 422px
        /*if ( xPos > kanbanWidth - 422 ){
            xPos = kanbanWidth - 422;
        }*/
        if (ui.item.rightcardoffset <= 0 ){
            rightcardoffset = 0;
        } else {
            rightcardoffset = ui.item.rightcardoffset;
        }
        if (ui.item.topcardoffset <= 0 ){
            topcardoffset = 0;
        } else {
            topcardoffset = ui.item.topcardoffset;
        }
        ui.position = {top: yPos - topcardoffset, left: xPos - rightcardoffset};
        ui.helper.offset(ui.position);
        var elements = document.elementsFromPoint(event.pageX, event.pageY);
        for (var i = 0; i < elements.length; i++) {
            if ($(elements[i]).attr('class') == 'right-right' || $(elements[i]).attr('class') == 'left-left'){
                if ($(elements[i]).attr('class') == 'right-right') {
                    var   scrollRightLeft = 'right';
                    if ($('.kanban__main-block').scrollLeft() >= '425'){
                        $('.kanban__main-block').stop();
                    }
                }
                else if ($(elements[i]).attr('class') == 'left-left') {
                    var   scrollRightLeft = 'left';
                } else {
                    $('.kanban__main-block').stop();
                }
            }
            if ($(elements[i]).attr('class') == 'up' || $(elements[i]).attr('class') == 'down'){
                var columnIdForScroll = $(elements[i]).closest('.kanban__column').find('.kanban__column-kan-block').data('href');
                if ($(elements[i]).attr('class') == 'up') {
                    var   scrollTopCustom = 0;
                    var   speed = 1000;
                }
                else if ($(elements[i]).attr('class') == 'down') {
                    var scrollTopCustom = 2000;
                    var speed = 3000;
                }
                break;
            }  else  {
                $('.kanban__column-kan-block').stop();
            }
        }
        $('[data-href="' + columnIdForScroll + '"]').animate({scrollTop: scrollTopCustom}, speed);
        var leftPos = $('.kanban__main-block').scrollLeft();
        /*if (scrollRightLeft == "left") {
            $('.kanban__main-block').animate({scrollLeft: leftPos - kanbanWidth}, 5000);
        }
        else if (scrollRightLeft == "right") {
            $('.kanban__main-block').animate({scrollLeft: leftPos + kanbanWidth}, 5000);
        }*/
       // console.log(event.pageX);
        if (event.pageX <= 200) {
            console.log('go left');
            $('.kanban__main-block').clearQueue();
            $('.kanban__main-block').animate({scrollLeft: leftPos - kanbanWidth}, 5000);
        }
        else if (event.pageX >= kanbanWidth - 200) {

            console.log('go right');
            $('.kanban__main-block').clearQueue();
            $('.kanban__main-block').animate({scrollLeft: leftPos + kanbanWidth}, 5000);
        }
        else {
            console.log('stop');
            $('.kanban__main-block').clearQueue();
            $('.kanban__main-block').stop();
        }
        $('body').mouseup(function () {
            $('.kanban__main-block').clearQueue();
            $('.kanban__main-block').stop();
            console.log('mouseup stop')
        });
    },
    stop: function (event, ui) {
        // $('.kanban__column-kan-block').stop();

        $('.kanban__column-kan-block').clearQueue();
        $('.kanban__column-kan-block').stop();
        $('.kanban__main-block').stop();
        $('.footer__block').css('display', 'none');
        $('.checkbox-label__checxbox-input').prop('checked',false);
        ui.item.removeClass('tilt');

        //Запрет на добавление карточек в колонку "В работе", если карточек больше четырёх
        if ( ui.item.parent('.column').data('href') == 4 ){
            var cardsInColumn = ui.item.parent('.column').find('.kan-card__kan-inside-card').length;
            if ( cardsInColumn > 4 ){
                console.log('forbidden!');
                return false;
            }
        }

        var elements = document.elementsFromPoint(event.screenX, event.screenY);
        for (var i = 0; i < elements.length; i++) {
            //Если у элемента есть data-id, получаем его. Остальные элементы игнорируем
            if ($(elements[i]).data('id')){
                var columnId = $(elements[i]).data('id');
                break; //Элементов с data-id может оказаться несколько, нам нужен только самый первый

            }
        }

        // //Скрываем свёрнутый вариант колонки, показываем развёрнуютую колонку с data-href, равным data-id свёрнутого варианта
        $('[data-id="' + columnId + '"]').closest('.kanban__short-column').hide();
        $('[data-href="' + columnId + '"]').closest('.kanban__column').show();
        ui.item.appendTo($('[data-href="' + columnId + '"]'));

        var workId = ui.item.data('work-id');
        var projectId = parseInt($('#hidden-id-project').text());
        var newState = ui.item.parent().data('href');
        //console.log('laststate:' + ui.item.laststate);
        if (newState != ui.item.laststate){ //Если мы перетаскиваем карточки в одной и той же колонке, состояние менять не нужно
            //console.log('change');
            changeWorkState(projectId, workId, newState);
        }

        return fromStateToState(ui.item.laststate, ui.item.parent('.column').data('href'));
    }
});

function getColumnIdByCoursorCoords(xPos) {

    var canceledWidth = 35;
    var plannedWidth = 35;
    var inworkWidth = 35;
    var preacceptedWidth = 35;
    var acceptedWidth = 35;

    if ($('#cancel-block').is(":visible")){
        canceledWidth = 465;
    }
    if ($('#planned-block').is(":visible")){
        plannedWidth = 465;
    }
    if ($('#inwork-block').is(":visible")){
        inworkWidth = 465;
    }
    if ($('#napriemke-block').is(":visible")){
        preacceptedWidth = 465;
    }
    if ($('#confirm-block').is(":visible")){
        acceptedWidth = 465;
    }

    if ( xPos < canceledWidth ){
        //курсор в колонке "отменённые"
        console.log('canceled');
        rightCardOffset = canceledWidth - xPos;
    } else if ( canceledWidth < xPos && xPos < ( canceledWidth + plannedWidth) ){
        //запланированные
        console.log('planned');
        rightCardOffset = ( canceledWidth + plannedWidth) - xPos;
    } else if ( ( canceledWidth + plannedWidth ) < xPos && xPos < ( canceledWidth + plannedWidth + inworkWidth ) ) {
        //в работе
        console.log('in work');
        rightCardOffset = ( canceledWidth + plannedWidth + inworkWidth ) - xPos;
    } else if ( ( canceledWidth + plannedWidth + inworkWidth ) < xPos && xPos < ( canceledWidth + plannedWidth + inworkWidth + preacceptedWidth ) ) {
        //на приёмке
        console.log('preaccepted');
        rightCardOffset = ( canceledWidth + plannedWidth + inworkWidth + preacceptedWidth ) - xPos;
    } else if ( ( canceledWidth + plannedWidth + inworkWidth + preacceptedWidth ) < xPos && xPos < ( canceledWidth + plannedWidth + inworkWidth + preacceptedWidth + acceptedWidth ) ) {
        //на приёмке
        console.log('accepted');
        rightCardOffset = ( canceledWidth + plannedWidth + inworkWidth + preacceptedWidth + acceptedWidth ) - xPos;
    }
    console.log(rightCardOffset);
    //var topOffset = yPage
    return {'rightcardoffset':rightCardOffset};
}


/*
var xMousePos = 0;
var lastScrolledLeft = 0;
var oldScrollLeft = 0;

$('.kanban__main-block').scroll(function(event) {
    if(lastScrolledLeft != $('.kanban__main-block').scrollLeft()){
        xMousePos -= lastScrolledLeft;
        oldScrollLeft = lastScrolledLeft;
        lastScrolledLeft = $('.kanban__main-block').scrollLeft();
        xMousePos += lastScrolledLeft

    }
    status = "x = " + xMousePos;

    if (oldScrollLeft > xMousePos){
        console.log('left!');
        $('.tilt').offset({left: 0});
    } else if (oldScrollLeft < xMousePos){
        console.log('right!');
        kanban = $('.kanban').width() - 425;
        if ($('.kanban__main-block').scrollLeft() >= '425'){
            $('.kanban__main-block').stop();
            $('.kanban__column-kan-block').stop();
        }
        $('.tilt').offset({left: kanban});
    }
    console.log(status);
    $( ".column" ).sortable( "refreshPositions" );
});
*/

//Если во время скролла курсор слева экрана в 200 пикселей, карточка прилипает к левой стороне экрана, также для правой тороны.

var MouseposX;
var MouseposY;
var kanbanWidth = $('.kanban').width() - 425;

$('.kanban__main-block').bind("mousemove", function (event) {
    MouseposX = event.pageX;
    MouseposY = event.pageY;
});

$('.kanban__main-block').scroll(function (event) {

    console.log('xxx: ' + MouseposX);

    if (MouseposX <= 200) {
        //console.log('left');
        $('.tilt').offset({left: 0});
    }
    else if ( MouseposX >= kanbanWidth - 200 ) {
        //console.log('right');
        if ($('.kanban__main-block').scrollLeft() >= '425'){
            $('.kanban__main-block').stop();
            $('.kanban__column-kan-block').stop();
        }
        $('.tilt').offset({left: kanbanWidth});
    }
    $( ".column" ).sortable( "refreshPositions" );
});

//Фикс бага sortable: после скролла сортировка иногда была недоступна
$('.column').scroll(function () {
    $( ".column" ).sortable( "refreshPositions" );
});

$(document).mouseup(function (){
    $('.kanban__column-kan-block').stop();
});
// $(".kanban__title-planned").mouseover(function(){
//     $('.kanban__column-kan-block').animate({ scrollTop: 0 }, "slow");
// });
// $(".kanban__title-planned").mouseout(function(){
//     $('.kanban__column-kan-block').stop();
// });
//
// $( ".portlet" )
//     .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
//     .find( ".portlet-header" )
//     .addClass( "ui-widget-header ui-corner-all" )
//     .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
// $( ".portlet-toggle" ).click(function() {
//     var icon = $( this );
//     icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
//     icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
// });

//запрет на перетаскивание карточки при нахождении мыши над чекбоксом
$(".kan-card__kan-check-block").mouseover(function(){
    $('.kan-card__kan-inside-card ').removeClass("portlet-header");
});
$(".kan-card__kan-check-block").mouseout(function(){
    $('.kan-card__kan-inside-card ').addClass("portlet-header");
});

//открытие главной модалки по плюсу
$(".kanban__plus-icon").click(function() {
    $('.edit-modal-input__total-summ').html(''); //очищаем цену

    if ($(".orange-kan-input").val() == '') {
        $(".orange-kan-input").css('border', '2px solid #f9a825');
    }
    else {
    }

    $('#overlay').show();
    //чистка полей перед открытием
    $('.cleared-modal').val("");
    $('#modal-id').text("");
    $('.edit-modal-input__link-stat').removeClass().addClass("edit-modal-input__link-stat").addClass("planned-state");
    $('.edit-modal-input__link-stat').text("запланированно");
    // $('.edit-modal__create').html("СОЗДАТЬ");
    $('.edit-modal-input').show();
});

//закрытие главной модалки c div
$(document).on("click", ".edit-modal__close-modal, .edit-modal__cancel", function() {
    modalClose();
});

function modalClose () {
    $('.edit-modal').hide();
    /*  $('main').css('opacity', '1');
      $('header').css('opacity', '1');
      $('.mini-header').css('opacity', '1');*/
    $("#overlay").hide();
    $('.cleared-modal').val("");
    $('#modal-id').text("");
    $(this).css('border', '2px solid #f9a825');
}

//закрытие главной модалки c input
$(document).on("click", ".edit-modal-input__close-modal, .edit-modal-input__cancel", function() {
    modalCloseInput();
});

function modalCloseInput () {
    $('.edit-modal-input').hide();
    /*  $('main').css('opacity', '1');
      $('header').css('opacity', '1');
      $('.mini-header').css('opacity', '1');*/
    $("#overlay").hide();
    $('.cleared-modal').val("");
    $('#modal-id-input').text("");
    $(this).css('border', '2px solid #f9a825');
}

//ОТКРЫТИЕ МИНИ МОДАЛОК
$('#val-area, #extra-area, #name-area, #price-area, #sale-area, .edit-modal__val-days').css('cursor','pointer');
$('#val-area-update, #extra-area-update, #name-area-update, #price-area-update, #sale-area-update, .edit-modal-input__val-days').css('cursor','pointer');

//наименование открытие
$('#name-area-update').click(function () {
    openHistoryModal("name");
});
//наименование подтверждение
$('#history-name').submit(function (e) {
    e.preventDefault();
    submitHistoryModal("name");
});
//наименование закрытие
$('.mini-modal-name__close-modal, .mini-modal-name__link-canceled').click(function () {
    $('#overlay-mini').hide();
    $('#mini-modal-name').hide();
});

//дополнительно открытие
$('#extra-area-update').click(function () {
    openHistoryModal("extra");
});
//дополнительно подтверждение
$('#history-extra').submit(function (e) {
    e.preventDefault();
    submitHistoryModal("extra");
});
//дополнительно закрытие
$('.mini-modal-extra__close-modal, .mini-modal-extra__link-canceled').click(function () {
    $('#overlay-mini').hide();
    $('#mini-modal-extra').hide();
});

//количество открытие
$('#val-area-update').click(function () {
    openHistoryModal("amount");
});
//количество подтверждение
$('#history-amount').submit(function (e) {
    e.preventDefault();
    submitHistoryModal("amount");
});

//количество закрытие
$('.mini-modal-amount__close-modal, .mini-modal-amount__link-canceled').click(function () {
    $('#overlay-mini').hide();
    $('#mini-modal-amount').hide();
});

//стоимость открытие
$('#price-area-update').click(function () {
    openHistoryModal("price");
});
//стоимость подтверждение
$('#history-price').submit(function (e) {
    e.preventDefault();
    submitHistoryModal("price");
});
//стоимость закрытие
$('.mini-modal-price__close-modal, .mini-modal-price__link-canceled').click(function () {
    $('#overlay-mini').hide();
    $('#mini-modal-price').hide();
});

//скидон открытие
$('#sale-area-update').click(function () {
    openHistoryModal("sale");
});
//скидон подтверждение
$('#history-sale').submit(function (e) {
    e.preventDefault();
    submitHistoryModal("sale");
});
//скидон закрытие
$('.mini-modal-sale__close-modal, .mini-modal-sale__link-canceled').click(function () {
    $('#overlay-mini').hide();
    $('#mini-modal-sale').hide();
});

//Плановая длительность и плановое завершение открытие
$('.edit-modal__val-days').click(function () {
    openHistoryModal("work");
    $('.mini-modal-work__modal-desc-right, .mini-modal-work__modal-desc-left').val('');
});
//Плановая длительность и плановое завершение подтверждение
$('#history-work').submit(function (e) {
    e.preventDefault();
    submitHistoryModal("work");
});
//Плановая длительность и плановое завершение закрытие
$('.mini-modal-work__close-modal, .mini-modal-work__link-canceled').click(function () {
    $('#overlay-mini').hide();
    $('#mini-modal-work').hide();
});

$('.search__input').on('input', function () {
    searchWorksList($(this).val());
});

function searchWorksList(query) {

    var projectId = parseInt($('#hidden-id-project').text());

    $.ajax({
        type: "POST",
        url: "/search-works-list/" + projectId,
        data:  {
            "_token" : $('meta[name="csrf-token"]').attr('content'),
            "query" : query
        },
        success: function (data) {
            $('.kan-card').hide();
            data.forEach(function (item) {
                $('[data-work-id="' + item + '"]').show();
            })
        },
    });
}

function getMonthFromNumber(monthNumber) {
    var monthsArr = [
        'янв',
        'фев',
        'мар',
        'апр',
        'май',
        'июн',
        'июл',
        'авг',
        'сен',
        'окт',
        'ноя',
        'дек',
    ];
    return monthsArr[monthNumber-1];
}

function getEndDate(startDate, durability) {
    var start_date = new Date(startDate);
    var end_date = new Date();
    end_date.setTime(start_date.getTime() +  (durability * 24 * 60 * 60 * 1000));
    end_date = end_date.getDate() + " " + getMonthFromNumber(end_date.getMonth() + 1);
    return end_date;
}

function getDaysFromNowToDate(myDate) {
    var date1 = new Date();
    var date2 = new Date(myDate); //текущая дата
    var daysLag = Math.ceil(Math.abs((date2.getTime() - date1.getTime())) / (1000 * 3600 * 24));
    return daysLag - 1;
}

function openHistoryModal(fieldName){
    var workId = parseInt($("#modal-id").text());
    var projectId = parseInt($('#hidden-id-project').text());
    var lastText = $("#" + fieldName + "-area-update").text().trim();

    if(fieldName == 'price'){
        lastText = numberFormatWithoutSpaces(lastText);
    }

    if (fieldName == "amount"){
        lastText = numberFormatWithoutSpaces($('#val-area-update').text().trim());
        lastAmountUnitValue = $('#amount-unit-area-update').attr('data-amount-unit');
        $('.mini-modal-amount__select-desc').val(lastAmountUnitValue);
    }

    $('.mini-modal-' + fieldName + '__input-desc').val(lastText);
    historyList = historyAjax(projectId, workId, "get-field-history", fieldName);
    $('#overlay-mini').show();
    $('.preloader-block').show();
    $.ajax().done(function(){

        historyListParsed = JSON.parse(historyList.responseText);

        var block = [];
        for (var i = 0; i < historyListParsed.length; i++) {
            end_date = getEndDate(historyListParsed[i].updated_at, historyListParsed[i].field_value);
            block[i] = getHistoryModalListHtml(fieldName, historyListParsed[i].updated_at_in_words, historyListParsed[i].field_value, historyListParsed[i].fullname, end_date);
        }

        $('.mini-modal-' + fieldName + '__history').html('');
        $('.mini-modal-' + fieldName + '__history').append(block);

        if (fieldName == "work"){
            lastText = $('.edit-modal-input__mini-begin-planned').find('.edit-modal__val-days').text();
            if (lastText == '-'){
                lastText = '';
            }
            console.log('lastText: ' + lastText);
            $('input.mini-modal-work__modal-desc-left').val(lastText);
            if (lastText){
                $('input.mini-modal-work__modal-desc-left').trigger('input');
            }
        }



        var workId = parseInt($("#modal-id").text());

        if ($('[data-work-id="'+workId+'"]')) {
            $('.card-id').closest('.kanban__column').attr('id');
            // console.log($('.card-id').closest('.kanban__column').attr('id'));
            if (column.is("#planned-block")) {
                $('.mini-modal-work__modal-desc-right').hide();
                $('.mini-modal-work__middle-block-end').hide();
                // $('.mini-modal-work__modal-desc-right').css('background-color','red');
                $('.mini-modal-work__modal-title-par').html('Длительность');
            }
            if (column.is("#inwork-block")) {
                $('.mini-modal-work__modal-title-par').html('Длительность и завершение');

            }
        }



        $('.mini-modal-work__modal-desc-left').prop('required',true);
        $('#mini-modal-' + fieldName).show();
        $('.preloader-block').hide();

    });
};

//Аякс-запросы для создания, изменения и получения истории

function historyAjax(projectId, workId, action, fieldName = false, fieldValue = false, amountUnit = false) {
    /* console.log(fieldName);
     console.log(fieldValue);*/
    // console.log(fieldName);
    // console.log(fieldValue);
    return $.ajax({
        type: "POST",
        url: "/history-actions/" + projectId + "/" + workId,
        data:  {
            "_token" : $('meta[name="csrf-token"]').attr('content'),
            "action" : action,
            "field-name": fieldName,
            "field-value": fieldValue,
            "amount-unit": amountUnit,
        },
        success: function (data) {
            if (action == 'save-to-history'){
                $('[data-work-id="' + workId + '"]').find('.kan-card__kan-day-limit').html(data);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function submitHistoryModal(fieldName){
    var workId = parseInt($("#modal-id").text());

    var projectId = parseInt($('#hidden-id-project').text());
    //newFieldValue = $('.mini-modal-' + fieldName + '__input-desc').text();
    var values = {};
    $.each($("#history-" + fieldName).serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });
    newFieldValue = values[fieldName];
    if (fieldName == 'amount'){
        var amountUnit = values['amount-unit'];
    }
    historyAjaxSuccess = historyAjax(projectId, workId, "save-to-history", fieldName, newFieldValue, amountUnit);
    historyAjaxSuccess.done(function () {
        switch (fieldName){
            case ("name"):
                fieldClass = '.kan-card__kan-project-desc';
                break;
            case ("extra"):
                fieldClass = '.kan-card__kan-main-description';
                break;
            case ("amount"):
                fieldClass = '.kan-card__amount-desc-val';
                break;
            case ("amount-unit"):
                fieldClass = '.kan-card__amount-desc-desc';
                break;
            case ("price"):
                fieldClass = '.kan-card__price-desc-val';
                break;
            case ("sale"):
                fieldClass = '.kan-card__price-percent-val';
                break;
            case ("durability"):
                fieldClass = '.edit-modal__val-days';
                break;
            default:
                fieldClass = '';
                break;
        }


        if (fieldName == "price" || fieldName == "amount"){
            newFieldValue = numberFormatWithSpaces(newFieldValue);
        }

        $('[data-work-id="' + workId + '"]').find(fieldClass).text(newFieldValue);




        if (fieldName == "amount"){
            $('#kan-card__amount-desc-val').text(newFieldValue);
            $('#val-area-update').text(newFieldValue);
            $('#amount-unit-area-update').attr("data-amount-unit", amountUnit);
            $('#amount-unit-area-update').html(getAmountUnit(amountUnit));
            $('[data-work-id="' + workId + '"]').find('.kan-card__amount-desc-desc').html(getAmountUnit(amountUnit));
        } else if( fieldName == "work" ){


            if (!newFieldValue || newFieldValue ==''){
                newFieldValue = '-';
            }

            $('.edit-modal-input__mini-begin-planned').find('.edit-modal__val-days').text(newFieldValue);

            //var end_date = getEndDate(parseData.start_state_date, parseData.durability);
            endDateVal = $('.mini-modal-work__modal-desc-right').val();
            if (endDateVal == ''){
                endDateVal = '-';
            }
            $('.edit-modal-input__mini-begin-ended').find('.edit-modal__val-days').text(endDateVal);

        } else {
            $('#' + fieldName + '-area-update').text(newFieldValue);
        }
        $('#overlay-mini').hide();
        $('#mini-modal-' + fieldName).hide();
    });

    calculatedPriceSuccess = calculatePrice(projectId, workId);

    //START Расчёт суммы

    if (fieldName == 'amount'){
        var amount = $('.mini-modal-amount__input-desc').val();
    } else {
        var amount = $("#val-area-update").text();
    }

    if (fieldName == 'price'){
        var price = $(".mini-modal-price__input-desc").val();
    } else {
        var price = $("#price-area-update").text();
    }

    if (fieldName == 'sale'){
        var sale = $(".mini-modal-sale__input-desc").val();
    } else {
        var sale = $("#sale-area-update").text();
    }

    calculatedPriceSuccess.done(function(){
        var ceiled = livePriceCalculation( amount, price, sale );
        $('[data-work-id="' + workId + '"]').find('.kan-card__total-price-amount').html(ceiled);
        $('.edit-modal__total-summ').html(ceiled);
    });

    //END Расчёт суммы


    /*calculatedPriceSuccess.done(function(){
        calculatedPrice = JSON.parse(calculatedPriceSuccess.responseText);
        //console.log('calc: ' + calculatedPrice);
        $('[data-work-id="' + workId + '"]').find('.kan-card__total-price-amount').html(calculatedPrice);
        $('.edit-modal__total-summ').html(calculatedPrice);
    });*/
}

function getHistoryModalListHtml(fieldName, updated_at_in_words, field_value, fullname, end_date){



    if (fieldName == 'work'){
        if (field_value <= 0 || field_value == 'false'){
            field_value = ' - ';
            end_date = ' - ';
        } else {
            field_value = field_value + ' дней';
        }
    } else if (fieldName == 'extra' && field_value == '0'){
        field_value = '-';
    }


    switch (fieldName){
        case "name":
            return '<div class="mini-modal-name__modal-row">\n' +
                '                            <div class="mini-modal-name__modal-days">\n' +
                '                                <p class="mini-modal-name__modal-days-par">' + updated_at_in_words + '</p>\n' +
                '                            </div>\n' +
                '                            <div class="mini-modal-name__modal-desc">\n' +
                '                                <p class="mini-modal-name__modal-desc-par">' + field_value + '</p>\n' +
                '                            </div>\n' +
                '                            <div class="mini-modal-name__modal-user">\n' +
                '                                <div class="mini-modal-name__modal-user-title">\n' +
                '                                    <p class="mini-modal-name__user-title-par">' + fullname + '</p>\n' +
                '                                </div>\n' +
                '                                <div class="mini-modal-name__modal-role-title">\n' +
                '                                    <p class="mini-modal-name__role-title-par">заказчик</p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
            break;
        case "amount":
            return '<div class="mini-modal-amount__modal-row">\n' +
                '                        <div class="mini-modal-amount__modal-days"><p class="mini-modal-amount__modal-days-par">' + updated_at_in_words + '</p>\n' +
                '                        </div>\n' +
                '                        <div class="mini-modal-amount__modal-desc">\n' +
                '                            <p class="mini-modal-amount__modal-desc-par">' + numberFormatWithSpaces( field_value ) + '</p>\n' +
                '                        </div>\n' +
                '                        <div class="mini-modal-amount__modal-user">\n' +
                '                            <div class="mini-modal-amount__modal-user-title">\n' +
                '                                <p class="mini-modal-amount__user-title-par">' + fullname + '</p>\n' +
                '                            </div>\n' +
                '                            <div class="mini-modal-amount__modal-role-title">\n' +
                '                                <p class="mini-modal-amount__role-title-par">заказчик</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
            break;
        case "extra":
            return '<div class="mini-modal-extra__modal-row-block">\n' +
                '<div class="mini-modal-extra__history"></div>\n' +
                '<div class="mini-modal-extra__modal-row">\n' +
                '<div class="mini-modal-extra__modal-days">\n' +
                '<p class="mini-modal-extra__modal-days-par">' + updated_at_in_words + '</p>\n' +
                '</div>\n' +
                '<div class="mini-modal-extra__modal-desc">\n' +
                '<p class="mini-modal-extra__modal-desc-par">' + field_value + '\n' +
                '<span class="mini-modal-persent"></span>\n' +
                '</p>\n' +
                '</div>\n' +
                '<div class="mini-modal-extra__modal-user">\n' +
                '<div class="mini-modal-extra__modal-user-title">\n' +
                '<p class="mini-modal-extra__user-title-par">' + fullname + '</p>\n' +
                '</div>\n' +
                '<div class="mini-modal-extra__modal-role-title">\n' +
                '<p class="mini-modal-extra__role-title-par">заказчик</p>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>';
            break;
        case "price":
            return '<div class="mini-modal-price__modal-row">\n' +
                '                        <div class="mini-modal-price__modal-days">\n' +
                '                            <p class="mini-modal-price__modal-days-par">' + updated_at_in_words + '</p>\n' +
                '                        </div>\n' +
                '                        <div class="mini-modal-price__modal-desc">\n' +
                '                            <p class="mini-modal-price__modal-desc-par">' + numberFormatWithSpaces( field_value ) + '</p>\n' +
                '                        </div>\n' +
                '                        <div class="mini-modal-price__modal-user">\n' +
                '                            <div class="mini-modal-price__modal-user-title">\n' +
                '                                <p class="mini-modal-price__user-title-par">' + fullname + '</p>\n' +
                '                            </div>\n' +
                '                            <div class="mini-modal-price__modal-role-title">\n' +
                '                                <p class="mini-modal-price__role-title-par">заказчик</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
            break;
        case "sale":
            return '<div class="mini-modal-sale__modal-row">\n' +
                '                        <div class="mini-modal-sale__modal-days">\n' +
                '                            <p class="mini-modal-sale__modal-days-par">' + updated_at_in_words + '</p>\n' +
                '                        </div>\n' +
                '                        <div class="mini-modal-sale__modal-desc">\n' +
                '                            <p class="mini-modal-sale__modal-desc-par">' + field_value + '\n' +
                '                                <span class="mini-modal-persent">%</span>\n' +
                '                            </p>\n' +
                '                        </div>\n' +
                '                        <div class="mini-modal-sale__modal-user">\n' +
                '                            <div class="mini-modal-sale__modal-user-title">\n' +
                '                                <p class="mini-modal-sale__user-title-par">' + fullname + '</p>\n' +
                '                            </div>\n' +
                '                            <div class="mini-modal-sale__modal-role-title">\n' +
                '                                <p class="mini-modal-sale__role-title-par">заказчик</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
            break;
        /*case "work":
            return '<div class="mini-modal-work__modal-row">\n' +
                '                        <div class="mini-modal-work__modal-days">\n' +
                '                            <p class="mini-modal-work__modal-days-par">' + updated_at_in_words + '</p>\n' +
                '                        </div>\n' +
                '                        <div class="mini-modal-work__modal-desc">\n' +
                '                            <div class="mini-modal-work__modal-desc-left">\n' +
                '                                <p class="mini-modal-work__modal-days-par">' + field_value + ' дней</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="mini-modal-work__modal-user">\n' +
                '                            <div class="mini-modal-work__modal-user-title">\n' +
                '                                <p class="mini-modal-work__user-title-par">' + fullname + '</p>\n' +
                '                            </div>\n' +
                '                            <div class="mini-modal-work__modal-role-title">\n' +
                '                                <p class="mini-modal-work__role-title-par">заказчик</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
            break;*/
        case "work":
            return '<div class="mini-modal-work__modal-row">\n' +
                '                        <div class="mini-modal-work__modal-days">\n' +
                '                            <p class="mini-modal-work__modal-days-par">' + updated_at_in_words + '</p>\n' +
                '                        </div>\n' +
                '                        <div class="mini-modal-work__modal-desc">\n' +
                '                            <div class="mini-modal-work__modal-desc-left">\n' +
                '                                <p class="mini-modal-work__modal-days-par">' + field_value + '</p>\n' +
                '                            </div>\n' +
                '                            <div class="mini-modal-work__modal-desc-right">\n' +
                '                                <p class="mini-modal-work__modal-days-par"> ' + end_date + ' </p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="mini-modal-work__modal-user">\n' +
                '                            <div class="mini-modal-work__modal-user-title">\n' +
                '                                <p class="mini-modal-work__user-title-par">' + fullname + '</p>\n' +
                '                            </div>\n' +
                '                            <div class="mini-modal-work__modal-role-title">\n' +
                '                                <p class="mini-modal-work__role-title-par">заказчик</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
            break;

        default:
            return '<div class="mini-modal-name__modal-row">\n' +
                '                            <div class="mini-modal-name__modal-days">\n' +
                '                                <p class="mini-modal-name__modal-days-par">' + updated_at_in_words + '</p>\n' +
                '                            </div>\n' +
                '                            <div class="mini-modal-name__modal-desc">\n' +
                '                                <p class="mini-modal-name__modal-desc-par">' + field_value + '</p>\n' +
                '                            </div>\n' +
                '                            <div class="mini-modal-name__modal-user">\n' +
                '                                <div class="mini-modal-name__modal-user-title">\n' +
                '                                    <p class="mini-modal-name__user-title-par">' + fullname + '</p>\n' +
                '                                </div>\n' +
                '                                <div class="mini-modal-name__modal-role-title">\n' +
                '                                    <p class="mini-modal-name__role-title-par">заказчик</p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
            break;

    }

    return html;
}

function calculatePrice(projectId, workId) {
    return $.ajax({
        type: "POST",
        url: "/calculate-price/" + projectId + '/' + workId,
        data:  {
            "_token" : $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {
            //console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

//Расчёт стоимости в главной модалке
$('.edit-modal-input__form-block').on('input', function () {
    var amount = $("#val-area").val();
    var price = $("#price-area").val();
    var sale = $("#sale-area").val();

    var ceiled = livePriceCalculation( amount, price, sale );

    if(!isNaN(parseFloat(ceiled))){
        $('.edit-modal-input__total-summ').html(ceiled);
    } else  {
        $('.edit-modal-input__total-summ').html('');
    }
});

//ф-ия расчёта стоимостиы
function livePriceCalculation( amount, price, sale ){

    var fullPrice = numberFormatWithoutSpaces(amount) * numberFormatWithoutSpaces(price);
    var fullSale = fullPrice / 100 * sale;
    var calculated = fullPrice - fullSale;
    var ceiled = Math.ceil( calculated / 100 ) * 100;

    if ( ceiled == 0 ){
        ceiled = '';
    }

    return numberFormatWithSpaces(ceiled);
}

$('.search__input').on('input', function () {
    searchWorksList($(this).val());
});

/*function calculatePriceLight(amount, price, sale) {
    return $.ajax({
        type: "POST",
        url: "/calculate-price",
        data:  {
            "_token" : $('meta[name="csrf-token"]').attr('content'),
            "amount": amount,
            "price" : price,
            "sale" : sale
        },
        success: function (data) {
            //console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

//var worksArray = ['3', '4', '5']; //тестовый массив
function getWorksSumm(worksArray) {
    var projectId = parseInt($('#hidden-id-project').text());
    return $.ajax({
        type: "POST",
        url: "/get-works-summ/" + projectId,
        data:  {
            "_token" : $('meta[name="csrf-token"]').attr('content'),
            "works-array": worksArray,
        },
        success: function (data) {
            //console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}*/

$('.temp-check').change(function () {
    //считаем чекнутые чекбоксы
    checked_checkbox_count = $(this).closest('.kanban__column').find('.temp-check:checked').length;
    //считаем дочерние чекбоксы
    checkbox_count = $(this).closest('.kanban__column').find('.temp-check').length;
    //отключаем главный чекбокс если не все дочерние выделены
    if(checked_checkbox_count  != checkbox_count) {
        $(this).closest('.kanban__column').find('.control-checked').prop('checked', false);
    }
    //включаем главный чекбокс если все дочерние выделены
    if (checkbox_count == checked_checkbox_count) {
        $(this).closest('.kanban__column').find('.control-checked').prop('checked', true);
    }
});

$('.temp-check').change(function () {
    checkbox_count = $('.temp-check:checked').length;
    //если нет дочерних чекнутых чекбоксов - убираем футер
    if(checkbox_count == 0) {
        $('.footer__block').hide();
    }
    //если есть дочерние чекнутые чекбоксы - ставим футер
    else {
        $('.footer__block').css('display','flex');
    }
});

$('.control-checked').change(function () {
    checkbox_count = $('.control-checked:checked').length;
    //выделяем дочерние чекбоксы по главному чекбоксу
    if ($(this).prop('checked') ==  true) {
        $(this).closest('.kanban__column').find('.temp-check').prop('checked', true);
    }
    //снимаем дочерние чекбоксы по главному чекбоксу
    else {
        $(this).closest('.kanban__column').find('.temp-check').prop('checked', false);
    }

    minisumm = 0;
    $(".kan-card__total-price-amount").each(function(){
        if ($($(this).closest('.kan-card__kan-inside-card').find('.temp-check')).prop('checked') ==  true) {
            price = numberFormatWithoutSpaces($(this).html());
            minisumm += price;
        }
    });
    $("#footer-price").html(numberFormatWithSpaces(minisumm));

    //если нет главного чекнутого чекбокса - убираем футер
    if(checkbox_count == 0) {
        $('.footer__block').hide();
    }
    //если есть главный чекнутый чекбокса - ставим футер
    else {
        $('.footer__block').css('display','flex');
    }
});

$(document).on("click", ".temp-check", function(e){
    minisumm = 0;
    // var minisumm = $(this).parent().parent().parent().parent().find(".kan-card__price-desc-val").html();
    $(".kan-card__total-price-amount").each(function(){
        if ($($(this).closest('.kan-card__kan-inside-card').find('.temp-check')).prop('checked') ==  true) {
            price = numberFormatWithoutSpaces($(this).html());
            console.log('price: ' + price);
            minisumm += price;
        }
    });
    $("#footer-price").html(numberFormatWithSpaces(minisumm));
});

function numberFormatWithoutSpaces(priceStr){
    return parseFloat(priceStr.replace(",",".").replace(/[^0-9.]/gim, ""));
}

function numberFormatWithSpaces(price){
    return String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

//Пока оставить
// $('.control-checked').click(function () {
//     checkbox_count = $(this).closest('.kanban__column').find('.temp-check').length;
//     checked_checkbox_count = $(this).closest('.kanban__column').find('.temp-check:checked').length;
//     $('.footer__block').css('display','flex');
// });

//реестр проектов
$('.control-checked-project').on('change',function(){
    if($(this).prop('checked')){
        $(this).closest("table").find('.control-checked-project-single').prop('checked',true);
        $('.footer__block').css('display', 'flex');
    }
    else {
        $(this).closest("table").find('.control-checked-project-single').prop('checked',false);
        $('.footer__block').css('display', 'none');
    }
});

//включаем футер по любому чекбоксу
$('.control-checked-project-single').on('change',function(){
    if ($(this).prop('checked')){
        $('.footer__block').css('display', 'flex');
    }
    else if (jQuery('.control-checked-project-single').is(":checked")) {
        $('.footer__block').css('display', 'flex');
    }
    else {
        $('.footer__block').css('display', 'none');
    }

    //считаем чекнутые чекбоксы
    checked_checkbox_count = $(this).closest('table').find('.control-checked-project-single:checked').length;
    //считаем дочерние чекбоксы
    checkbox_count = $(this).closest('table').find('.control-checked-project-single').length;
    //отключаем главный чекбокс если не все дочерние выделены
    if(checked_checkbox_count  != checkbox_count) {
        $(this).closest('table').find('.control-checked-project').prop('checked', false);
    }
    //включаем главный чекбокс если все дочерние выделены
    if (checkbox_count == checked_checkbox_count) {
        $(this).closest('.table').find('.control-checked-project').prop('checked', true);
    }

});

//Inwork modal

$('.kanban__plus-icon').click(function() {
    column = $(this).closest('.kanban__column');
    //console.log(column.attr());
    if (column.is("#planned-block")) {
        $('.edit-modal-input__mini-begin').hide();
        $('.edit-modal-input__mini-begin-ended').hide();
    }
});

//скрытие полей в истотрии и гланой модалке при клике на карточку
$('.kan-card__kan-inside-card').click(function() {
    column = $(this).closest('.kanban__column');
    // console.log(column.attr('id')); посмотеть id колонки
    if (column.is("#planned-block")) {
        $('.edit-modal-input__mini-begin').hide();
        $('.edit-modal-input__mini-begin-ended').hide();
    }
    if (column.is("#napriemke-block")) {
        $('.accepted-block-hide').hide();
        $('.edit-modal__show').show();
        $('.edit-modal__show.na-priemke').hide();
    }
    if (column.is("#cancel-block")) {
        // $('.accepted-block-hide').hide();
        $('.edit-modal-input__mini-begin').hide();
        $('.edit-modal-input__mini-begin-ended').hide();
    }
    if (column.is("#confirm-block")) {
        $('.accepted-block-hide').hide();
        $('.edit-modal__show').hide();
        $('.edit-modal__show.na-priemke').show();
    }
    if (column.is("#inwork-block")) {
        $('.mini-modal-work__middle-block-end').show();
        $('.mini-modal-work__modal-desc-right').show();
        console.log(123);
    }
});

$('.edit-modal-input__close-modal, .edit-modal__close-modal, .edit-modal__cancel').click(function() {
    $('.edit-modal-input__mini-begin').show();
    $('.edit-modal-input__mini-begin-ended').show();
    $('.dit-modal-input__mini-begin-planne').show();
    $('.accepted-block-hide').show();
    $('.edit-modal__show').hide();
    //проверить если буде лагать - то убираем
    $('.mini-modal-work__middle-block-end').show();
    $('.mini-modal-work__modal-desc-right').show();
});

// //in work history modal
//
// $('.kan-card__kan-inside-card').click(function() {
//     column = $(this).closest('.kanban__column');
//     if (column.is("#planned-block")) {
//         // $('.mini-modal-work__middle-block-end-par').hide();
//         // $('.mini-modal-work__modal-desc-right').hide();
//
//     }
// });
//
$('.mini-modal-work__close-modal').click(function() {
    $('.mini-modal-work__middle-block-end').show();
    $('.mini-modal-work__modal-desc-right').show();

});

//check witout date
$('.checkbox-label__checxbox-input-one').on('change',function() {
    if ($(this).prop('checked')) {
        $('.mini-modal-work__modal-desc-left, .mini-modal-work__modal-desc-right').attr('disabled','disabled');
        $('.mini-modal-work__modal-desc-left, .mini-modal-work__modal-desc-right').removeAttr("required");
        $('.mini-modal-work__modal-desc-left, .mini-modal-work__modal-desc-right').val('');
        datesumm = 0;
        $('.mini-modal-work__modal-desc-left, .mini-modal-work__modal-desc-right').css('color','transparent')
    }
    else {
        $('.mini-modal-work__modal-desc-left, .mini-modal-work__modal-desc-right').removeAttr("disabled");
        $('.mini-modal-work__modal-desc-left, .mini-modal-work__modal-desc-right').prop('required',true);
        datesumm = 0;
        $('.mini-modal-work__modal-desc-left, .mini-modal-work__modal-desc-right').val('');
        $('.mini-modal-work__modal-desc-left, .mini-modal-work__modal-desc-right').css('color','black')
    }
});

//datepicker

//читска правого датепикера
$('.mini-modal-work__modal-desc-right').click( function() {
    $('.mini-modal-work__modal-desc-right').val('');
    $('.mini-modal-work__modal-desc-left').val('');
});

$('.mini-modal-work__modal-desc-left').on('input', function() {
    valueOfDate = $(this).val();
    var b = Number(valueOfDate);
    var today = new Date(),
        inWeek = new Date();
    inWeek.setDate(today.getDate()+b);
    inWeek=getEndDate(today, valueOfDate);
    $('.mini-modal-work__modal-desc-right').val(inWeek);
});


$('.mini-modal-work__triangle-up').click(function() {
    datesumm = $('input.mini-modal-work__modal-desc-left').val();
    console.log(datesumm);
    if (datesumm != '') {
        datesumm = $('input.mini-modal-work__modal-desc-left').val();
        // datesumm++;
        // $('.mini-modal-work__modal-desc-left').val(datesumm);
    }
    datesumm++;

    $('input.mini-modal-work__modal-desc-left').val(datesumm);
    $('input.mini-modal-work__modal-desc-left').trigger('input');
});
$('.mini-modal-work__triangle-down').click(function() {
    var tempDate = $('input.mini-modal-work__modal-desc-left').val();
    if (tempDate != '' && tempDate>=2) {
        tempDate--;
        $('input.mini-modal-work__modal-desc-left').val(tempDate);
    }
    $('input.mini-modal-work__modal-desc-left').trigger('input');
});

//call of datepicker
$('.mini-modal-work__modal-desc-right').datepicker({dateFormat:'dd M'});

$('.mini-modal-work__modal-desc-right.hasDatepicker').on( "change input", function() {
    var myDate = $('.mini-modal-work__modal-desc-right.hasDatepicker').datepicker('getDate');
    var current = new Date();
    var difference = myDate - current;
    var weeks = difference / 1000 / 60 / 60 / 24;
    var c = parseInt(weeks);
    var example = Math.ceil(c);
    // console.log(weeks);
    var date1 = new Date();
    var date2 = new Date(myDate);
    var daysLag = Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    console.log(1);

    if (daysLag >=0) {
        $(".mini-modal-work__modal-desc-left").val(daysLag);
        console.log(2);
    }
    else {
        // $( closestleft ).val('');
        // console.log(3);
    }
    $('input.mini-modal-work__modal-desc-left').trigger('input');
});
// $('.kanban__column-kan-block').css('overflow-y', 'none!important');
//  $(function()
//  {
//     $('.kanban__main-block').jScrollPane();
//     console.log(123);
// });

// function move(id,spd) {
//     var obj=document.getElementById(id);
//     var max=-obj.offsetHeight+obj.parentNode.offsetHeight;
//     var top=parseInt(obj.style.top);
//
//     if ((spd>0&&top<=0)||(spd<0&&top>=max)){
//         obj.style.top=top+spd+"px";
//         move.to=setTimeout(function(){ move(id,spd); },20);
//     }
//     else obj.style.top=(spd>0?0:max)+"px";
// }

// $(".kanban__column-kan-block").simplyScroll({
//     speed: 1,
//     orientation: 'vertical',
//     auto:    false
// });

//select option
$( "#amount-unit-area" ).mouseover(function () {
    $('#optionMinusOne').hide();
    console.log(123);
});



function fromStateToState(fromStateId, toStateId){
    //1 - canceled
    //3 - planned
    //4 - in_work
    //5 - preaccepted
    //6 - accepted
    /*console.log('fromstate: ' + fromStateId);
    console.log('tostate: ' + toStateId);*/

    if ((fromStateId == '1' || fromStateId == '6') && (toStateId != 3 && toStateId != 4)){ return false; }  // из Принятые только в Запланированные или в Работе; из Отменённые только в Запланированные или В Работе.
    else if (fromStateId == '3' && (toStateId != '1' && toStateId != '4')){ return false; }       // из Запланированные работа может попасть только в В работе и в Отменённые.
    else if (fromStateId == '4' && (toStateId != '3' && toStateId != '5')){ return false; }  // из В работе только в На приёмке или в Запланированные
    else if (fromStateId == '5' && (toStateId != '4' && toStateId != '6')){ return false; }  // из На приёмке только в В работе или Принятые
    else { return true; }
}

//смена селект цветов
$('.textarea-input').focus(function () {
    $(this).css('background-color', '#fff');
});
$('.textarea-input').blur(function () {
    $(this).css('background-color', '#f5f5f5');
});