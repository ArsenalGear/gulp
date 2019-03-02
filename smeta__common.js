jQuery(function ($) {
    new WOW().init();
    // Убираем плейсхолдер у поля формы при фокусе на нем
    $('input,textarea').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'))
            .attr('placeholder', '');
    }).blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });

    //Все инпуты с типом tel имеют маску +7 ( 999 ) 999 - 99 - 99
    jQuery('input[type=tel]').mask('+7 ( 999 ) 999 - 99 - 99');

    //Кнопка вниз на приветственном экране
    $('#greetings-button').click(function () {
        $('html').animate({
            scrollTop: $('#greetings').height()
        },1000);
    })

    //Логика открытия и закрытия окна поиска в шапке
    $('#header-search-open, #header-search-close').click(function () {
        if ($('#header-search').is(':visible')) {
            $($('#header-search')).hide();
        } else {
            $($('#header-search')).show();
        }
    });
    $(document).mouseup(function (e){
        if (!$('#header-search').is(e.target) && $('#header-search').has(e.target).length === 0) {
            $('#header-search').hide();
        }
    });

    //Логика фиксированной шапки
    /*    $(document).scroll(function (){
            if ($('html').scrollTop() > $('#greetings').height()) {
                $('#header').css('position', 'fixed');
            } else {
                $('#header').css('position', 'static');
            }
        });*/
    //Animated css (добавляем .animated.mov в pug a wobble меняем на свою анимацию 200-края от экрана)
    $(window).scroll(function() {
        $('.mov').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+800) {
                $(this).addClass('slideInUp');
            }
        });
    });

    //Поиск
    $(".fa.fa-search").click(function(){
        $(".search").slideDown('fast');
        $(".search").css('display','flex');

    });
    $(".search span").click(function(){
        $(".search").slideUp('fast');
    });
    $("main").click(function(){
        $(".search").slideUp('fast');
    });

    //Корзина
    $('.fa.fa-shopping-cart').click(function () {
        if ($('.bucket').is(':visible')) {
            $($('.bucket')).hide();
        } else {
            $($('.bucket')).show();
        }
    });
    $(document).mouseup(function (e){
        if (!$('.bucket').is(e.target) && $('.bucket').has(e.target).length === 0) {
            $('.bucket').hide();
        }
    });

    // $(".fa.fa-shopping-cart").mouseover(function(){
    //     $(".bucket").slideDown('fast');
    // });
    // $(document).on("mouseout","bucket p",function(){
    //     $(".bucket").slideUp('fast');
    //     $(".bucket").css('display','flex');
    // });

    //карточка товара
    $(document).on('mouseover', '.cardik', function(e) {
        // console.log('xxx');
        var element = $(this);
        element.find('.cardik__more').css("display","block");
        $(".cardik__more").css('box-shadow','0 8px 16px 0 rgba(0,0,0,0.2)');
    });
    $(document).on('mouseout', '.cardik', function(e) {
        $(".cardik__more").css('display','none');
    });


    //Мобильное меню
    // $(".fa.fa-bars").click(function(){
    //     $(".header__mobile-menu-container").toggle( "slide" );
    //     $(".header__mobile-menu-container").css('display','flex');
    // });
    // $(".close-mobile").click(function(){
    //     $(".header__mobile-menu-container").slideUp('fast');
    // });

    $(".fa.fa-bars").click(function(){
        $(".body-menu__mobile-menu-container").slideToggle("slide");
    });

    $(".fa.fa-bars").click(function(){
        $(".main-menu__bucket-mobile").fadeToggle("fast");
    });


    // $(".close-mobile").click(function(){
    //     $(".body-menu__mobile-menu-container").slideUp('fast');
    //     $(".main-menu__bucket-mobile").css('display','flex');
    // });


    //Мастер зум
    jQuery('.master-zoom').zoom();

    //счетчик товаров
    $(".incr-btn").on("click", function (e) {
        var $button = $(this);
        var oldValue = $button.parent().find('.quantity').val();
        $button.parent().find('.incr-btn[data-action="decrease"]').removeClass('inactive');
        if ($button.data('action') == "increase") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below 1
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
                $button.addClass('inactive');
            }
        }
        $button.parent().find('.quantity').val(newVal);
        $button.parent().parent().find('.quantity-block__link').attr('data-quantity', newVal);
        $('.quantity-block__link').attr('data-quantity', newVal);
        e.preventDefault();
    });

    //карточка конструктора
    // $(".complects-card__card").mouseover(function(){
    //     var element = $(this);
    //     element.find('.card-hover').css("display","block");
    // });
    // $(".complects-card__card").mouseout(function() {
    //     $(".card-hover").css('display','none');
    //     $(".card-hover").css('opacity','1');
    // })


    //Управление выбранными элементами комплекта
    
    $('.main-card-hover.unselected-element').on('click', function () {
        var elementid = $(this).data('elementid');
        $(this).parent().hide();
        $('.selected-element[data-elementid="' + elementid + '"]').closest('.complects-card__selected-elements-form').show();
    });

    $('.main-card-hover.selected-element').on('click', function () {
        var elementid = $(this).data('elementid');
        $('.selected-element[data-elementid="' + elementid + '"]').closest('.complects-card__selected-elements-form').hide();
        $('.unselected-element[data-elementid="' + elementid + '"]').parent().show();
    });

    $('.create-complects').on('click', function (e) {
        $(this).hide();
        $('.goods-line.second').hide();
        $('.unselected-elements-title, .unselected-elements-row').show();
        e.preventDefault();
    });


    //Проверяет, не пустой ли блок выбранных товаров (по свойству display, скрыты ли они все или нет)

  /*  $('.total-block__link').on('click', function (e) {
        console.log(checkSelectedBlock());
        e.preventDefault();
    })*/


    $('.main-card-hover').on('click', function (e){
        // console.log('haveElements: ' + checkSelectedBlock());
        e.preventDefault();
        if(checkSelectedBlock()){//Если есть выбранные элементы
            //собираем все данные с селектов каждого элемента и общую цену
            unselectedBlockHeadingShowOrHide(); //Управляем надписью "Еще не в комплекте"
            $('.total-block__link').addClass('blue');
            getAllElementsData();//получаем данные о выбранных элементах комплекта и расчитываем общую цену

        } else {
            //блокируем кнопку добавления в корзину, общую цену сбрасываем до нуля
            $('.uncomplect').hide();
            $('.total-block__link').removeClass('blue');
            $('.total-block__title.main-price').html('Выбрано всего <span>0 p</span>');
            $('.total-block__title.orange').hide();
            $('.total-block__title.sale-price').hide();
        }
    });

    $('.complects-card__selected-elements-form').on('change', function () {
        getAllElementsData();
    });
    $('.incr-btn').on('click', function () {
        getAllElementsData();
    });


    var checkSelectedBlock = function () {
        var haveElements = false;
        $( ".complects-card__selected-elements-form" ).each(function( index ) {
            if($(this).is(":visible")){ haveElements = true}
        });
        return haveElements;
    }

    var unselectedBlockHeadingShowOrHide = function () {
        var haveElements = false;
        $( ".unselected-element" ).each(function( index ) {
            if($(this).parent().is(":visible")){ haveElements = true}
        })
        if(haveElements){
            $('.uncomplect').show(); //тут еще нужно проверить, если все элементы уже в комплекте, тоже нужно скрыть
        } else {
            $('.uncomplect').hide();
        }
    }

    var getAllElementsData = function(ordering = false){ //Получает данные обо всех выбранных элементах

        var formdata = {};
        $( ".complects-card__selected-elements-form:visible" ).each(function( index ) {
            formdata[index] = $(this).serialize(); //Все выбранные элементы комплекта
        });
        // console.log(formdata);


        $('.total-block__link').removeClass('blue');
        $.ajax({
            type: "POST",
            url: window.wp_data.ajax_url,
            data: {
                action : 'get_selected_elements_data', //Здесь указываем нашу функцию без _callback
                formdata: formdata,
                ordering: ordering,
            },
            success: function (response) {
                // console.log('AJAX response data :' + response);
                var decoded = JSON.parse(response)
                var elements_prices = decoded.elements_prices;
                var full_price = decoded.full_price;
                var sale = decoded.sale;
                var full_price_with_sale = decoded.full_price_with_sale;

                forEach(elements_prices, function(key, value){//Это не стандартная forEach функция
                    $('#' + key).find('.construct-amount__summ span').html(value + ' Р');
                });
                $('.main-price').html('Выбрано собрано  <span>' + full_price + ' p<span>');
                $('.total-block__title.orange span').html(sale + ' p').parent().show();
                $('.sale-price span').html(full_price_with_sale + ' p').parent().show();

                $('.total-block__link').addClass('blue');

            }
        });

    }

    $(document).on('click', '.total-block__link.blue', function () {
        getAllElementsData(ordering=true);
    });

    function forEach(data, callback){
        for(var key in data){
            if(data.hasOwnProperty(key)){
                callback(key, data[key]);
            }
        }
    }
});

$(document).on('click', '.loadmore-trigger', function(e){
    e.preventDefault();
    var category = $('.more-goods__link').data('options').category;
    var offset = $('.more-goods__link').data('options').offset;

    $(this).html('<a class="more-goods__link">Загрузка...</a>');
    $(this).removeClass('loadmore-trigger');

    // console.log(category);
    // console.log(offset);
    $.ajax({
        type: "POST",
        url: window.wp_data.ajax_url,
        data: {
            action : 'load_more', //Здесь указываем нашу функцию без _callback
            category: category,
            offset: offset,
        },
        success: function (response) {
            // console.log('AJAX response :' + response);
            var response = JSON.parse(response);
            $('.more-goods').offset = response.new_offset;
            $('.more-goods').addClass('loadmore-trigger');
            $('.more-goods').html('<a class="more-goods__link" href="#" data-options="{"offset":"' + response.new_offset + '", "category":"total_sales"}">ЕЩЕ 20 ТОВАРОВ</a>');
            $('.row.card-row').append(response.productsHtml);
            if (response.end){
                $('.load-more').hide();
            }
        }
    });
});
