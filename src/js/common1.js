//Именные функции
function formatState (state) {
	if(!state.id) {
		return state.text;
	}
	var baseUrl = './img/theme/langs';
	var $state = $(
		'<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
	);
	return $state;
};

$.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
};

//Функции инициализирующиеся или срабатывающие по document.ready
$(function () {

	//Глобальные переменные

	//Скрытие мобильного меню при загрузке страницы
	if($(window).width() < 576 && $('.header__mobile-button').length > 0 && $('.header__menu').length > 0 && $('.header__selects-container').length > 0) {
		if($('.header__menu').is(':visible') || $('.header__selects-container').is(':visible')) {
			$('.header__menu, .header__selects-container').fadeOut();
		}
	}

	//Body padding-top = header height
	if($('#header').length > 0){
		$('body').css('padding-top', $('#header').outerHeight());
	}

	//Функции срабатывающие по ресайзу
	$(window).on('resize', function(){
	    //Отступ от верха страницы для фиксированного header-а
		if($('#header').length > 0){
			$('body').css('padding-top', $('#header').outerHeight());
		}

        //Скрытие мобильного меню при загрузке страницы
        if($(window).width() < 576 && $('.header__mobile-button').length > 0 && $('.header__menu').length > 0 && $('.header__selects-container').length > 0) {
            if($('.header__menu').is(':visible') || $('.header__selects-container').is(':visible')) {
                $('.header__menu, .header__selects-container').fadeOut();
            }
        }

		//Selects
        if($('.select-default__select_main-page').length > 0){
            $('.select-default__select_main-page').each(function () {
                var thisPlaceholder = $(this).data('placeholder');
                var thisDropdownParent = $(this).closest($('.select-default'));
                $(this).select2({
                    dropdownParent: thisDropdownParent,
                    minimumResultsForSearch: Infinity,
                    placeholder: thisPlaceholder
                });
            })
        }
        if($('.select-multiple__select_multiple').length > 0){
            $('.select-multiple__select_multiple').each(function () {
                var thisPlaceholder = $(this).data('placeholder');
                var thisDropdownParent = $(this).closest($('.select-multiple'));
                $(this).select2({
                    closeOnSelect: false,
                    dropdownParent: thisDropdownParent,
                    placeholder: thisPlaceholder
                });
            });
        }
        if($('.select-default__select_usual').length > 0){
            $('.select-default__select_usual').select2({
                minimumResultsForSearch: Infinity
            });
        }
        if($('#currency-select').length > 0 && $('#currency-select-parent')){
            $('#currency-select').select2({
                dropdownParent: $('#currency-select-parent'),
                minimumResultsForSearch: Infinity
            });
        }
        if($('#lang-select').length > 0 && $('#lang-select-parent')){
            $('#lang-select').select2({
                dropdownParent: $('#lang-select-parent'),
                minimumResultsForSearch: Infinity,
                templateResult: formatState,
                templateSelection: formatState
            });
        }
        if($('#city-of-arrival-select').length > 0 && $('#city-of-arrival-select-parent')){
            $('#city-of-arrival-select').select2({
                dropdownParent: $('#city-of-arrival-select-parent'),
                minimumResultsForSearch: Infinity
            });
            $('#city-of-arrival-select').on('select2:select', function (e) {
                var thisCity = e.params.data.text;
                var thisSelectId = e.params.data.id;
                $('#city-of-arrival-chosen-cities').append('<div class="main-form__chosen-city">' +
                    '<p class="main-form__chosen-city-name">' + thisCity + '</p>' +
                    '<button class="main-form__chosen-city-button" type="button" data-id="' + thisSelectId + '">Удалить из&nbsp;списка</button>' +
                    '</div>');
            });
        }
        if($('#airport-name-select').length > 0 && $('#airport-name-select-parent')){
            $('#airport-name-select').select2({
                dropdownParent: $('#airport-name-select-parent'),
                placeholder: {
                    id: '-1',
                    text: 'Например: Внуково'
                }
            });
        }
        if($('#airport-time-select').length > 0 && $('#airport-time-select-parent')){
            $('#airport-time-select').select2({
                dropdownParent: $('#airport-time-select-parent'),
                minimumResultsForSearch: Infinity,
                placeholder: {
                    id: '-1',
                    text: '2 часа'
                }
            });
        }
        if($('#airport-choose-cities-button').length > 0 && $('#airport-chosen-cities')){
            $('body').on('click', '#airport-choose-cities-button', function (e) {
                e.preventDefault();
                var thisInputVal = $('#airport-name-select').select2('data')[0].text + ', ' + $('#airport-time-select').select2('data')[0].text,
                    thisAirportNameSelectedOption = '#airport-name-select option[value="' + $('#airport-name-select').select2('data')[0].id + '"]';
                if($('#airport-name-select').val() != '-1' && $('#airport-time-select').val() != '-1'){
                    $('#airport-chosen-cities').append('<div class="main-form__chosen-city">' +
                        '<input name="airport[]" value="' + thisInputVal + '">' +
                        '<p class="main-form__chosen-city-name">' + thisInputVal + '</p>' +
                        '<button class="main-form__chosen-city-button" type="button">Удалить из&nbsp;списка</button>' +
                        '</div>');
                    $('#airport-name-select').val(null).trigger('change');
                    $('#airport-time-select').val(null).trigger('change');
                    // $(thisAirportNameSelectedOption).hide();
                }
            });
        }
        if($('#intensity-of-the-course-select').length > 0 && $('#intensity-of-the-course-select-parent')){
            $('#intensity-of-the-course-select').select2({
                dropdownParent: $('#intensity-of-the-course-select-parent'),
                minimumResultsForSearch: Infinity,
                placeholder: {
                    id: '-1',
                    text: '60 часов (1 час = 60 минут)'
                }
            });
        }
        if($('#excursions-on-weekdays-select').length > 0 && $('#excursions-on-weekdays-select-parent')){
            $('#excursions-on-weekdays-select').select2({
                dropdownParent: $('#excursions-on-weekdays-select-parent'),
                minimumResultsForSearch: Infinity
            });
        }
        if($('#excursions-on-weekdays-count-select').length > 0 && $('#excursions-on-weekdays-count-select-parent')) {
            $('#excursions-on-weekdays-count-select').select2({
                dropdownParent: $('#excursions-on-weekdays-count-select-parent'),
                minimumResultsForSearch: Infinity,
                placeholder: {
                    id: '-1',
                    text: '3 экскурсии'
                }
            });
        }
        if($('#weekend-trips-select').length > 0 && $('#weekend-trips-select-parent')){
            $('#weekend-trips-select').select2({
                dropdownParent: $('#weekend-trips-select-parent'),
                minimumResultsForSearch: Infinity
            });
        }
        if($('#weekend-trips-count-select').length > 0 && $('#weekend-trips-count-select-parent')){
            $('#weekend-trips-count-select').select2({
                dropdownParent: $('#weekend-trips-count-select-parent'),
                minimumResultsForSearch: Infinity,
                placeholder: {
                    id: '-1',
                    text: '4 экскурсии'
                }
            });
        }
        if($('#transfer-select').length > 0 && $('#transfer-select-parent')){
            $('#transfer-select').select2({
                dropdownParent: $('#transfer-select-parent'),
                minimumResultsForSearch: Infinity,
                placeholder: {
                    id: '-1',
                    text: 'Трансфер входит в стоимость'
                }
            });
        }
        if($('#schedule-period-select').length > 0 && $('#schedule-period-select-parent')){
            $('#schedule-period-select').select2({
                dropdownParent: $('#schedule-period-select-parent'),
                minimumResultsForSearch: Infinity,
                placeholder: {
                    id: '-1',
                    text: 'На 1 неделю'
                }
            });
        }
        if($('#program-type-select').length > 0 && $('#program-type-select-parent')){
            $('#program-type-select').select2({
                dropdownParent: $('#program-type-select-parent'),
                minimumResultsForSearch: Infinity,
                placeholder: 'Любой вариант программы'
            });
        }
        if($('#trip-duration-select').length > 0 && $('#trip-duration-select-parent')){
            $('#trip-duration-select').select2({
                dropdownParent: $('#trip-duration-select-parent'),
                minimumResultsForSearch: Infinity,
                placeholder: '2 недели'
            });
        }
        if($('#children-number-select').length > 0 && $('#children-number-select-parent')){
            $('#children-number-select').select2({
                dropdownParent: $('#children-number-select-parent'),
                minimumResultsForSearch: Infinity,
                placeholder: '12 детей'
            });
        }
        if($('#adult-number-select').length > 0 && $('#adult-number-select-parent')){
            $('#adult-number-select').select2({
                dropdownParent: $('#adult-number-select-parent'),
                minimumResultsForSearch: Infinity,
                placeholder: '2 взрослых'
            });
        }

        //inline datepicker dayNamesMin
        if($('#inline-datepicker').length > 0){
            if($(window).width() < 576) {
                $('#inline-datepicker').datepicker( 'option', 'dayNamesMin', [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ] );
            } else {
                $('#inline-datepicker').datepicker( 'option', 'dayNamesMin', ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'] );
            }
        }
	});

	// Убираем плейсхолдер у поля формы при фокусе на нем
	if($('input,textarea').length > 0){
		$('input,textarea').focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'))
				.attr('placeholder', '');
		}).blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	}

	//Все инпуты с типом tel имеют маску +7 (999) 999 99 99
	if($('input[type=tel]').length > 0){
		$('input[type=tel]').mask('+7 (999) 999 99 99');
	}

	//Selects
    if($('.select-default__select_main-page').length > 0){
        $('.select-default__select_main-page').each(function () {
            var thisPlaceholder = $(this).data('placeholder');
            var thisDropdownParent = $(this).closest($('.select-default'));
            $(this).select2({
                dropdownParent: thisDropdownParent,
                minimumResultsForSearch: Infinity,
                placeholder: thisPlaceholder
            });
        })
    }
	if($('.select-multiple__select_multiple').length > 0){
        $('.select-multiple__select_multiple').each(function () {
            var thisPlaceholder = $(this).data('placeholder');
            var thisDropdownParent = $(this).closest($('.select-multiple'));
            $(this).select2({
                closeOnSelect: false,
                dropdownParent: thisDropdownParent,
                placeholder: thisPlaceholder
            });
        });
	}
	if($('.select-default__select_usual').length > 0){
		$('.select-default__select_usual').select2({
			minimumResultsForSearch: Infinity
		});
	}
	if($('#currency-select').length > 0 && $('#currency-select-parent')){
		$('#currency-select').select2({
			dropdownParent: $('#currency-select-parent'),
			minimumResultsForSearch: Infinity
		});
	}
	if($('#lang-select').length > 0 && $('#lang-select-parent')){
		$('#lang-select').select2({
			dropdownParent: $('#lang-select-parent'),
			minimumResultsForSearch: Infinity,
			templateResult: formatState,
			templateSelection: formatState
		});
	}
	if($('#city-of-arrival-select').length > 0 && $('#city-of-arrival-select-parent')){
		$('#city-of-arrival-select').select2({
			dropdownParent: $('#city-of-arrival-select-parent'),
            minimumResultsForSearch: Infinity
        });
        $('#city-of-arrival-select').on('select2:select', function (e) {
            var thisCity = e.params.data.text;
            var thisSelectId = e.params.data.id;
            $('#city-of-arrival-chosen-cities').append('<div class="main-form__chosen-city">' +
                '<p class="main-form__chosen-city-name">' + thisCity + '</p>' +
                '<button class="main-form__chosen-city-button" type="button" data-id="' + thisSelectId + '">Удалить из&nbsp;списка</button>' +
                '</div>');
        });
	}
	if($('#airport-name-select').length > 0 && $('#airport-name-select-parent')){
		$('#airport-name-select').select2({
			dropdownParent: $('#airport-name-select-parent'),
            placeholder: {
                id: '-1',
                text: 'Например: Внуково'
            }
        });
	}
	if($('#airport-time-select').length > 0 && $('#airport-time-select-parent')){
		$('#airport-time-select').select2({
			dropdownParent: $('#airport-time-select-parent'),
            minimumResultsForSearch: Infinity,
            placeholder: {
                id: '-1',
                text: '2 часа'
            }
        });
	}
	if($('#airport-choose-cities-button').length > 0 && $('#airport-chosen-cities')){
        $('body').on('click', '#airport-choose-cities-button', function (e) {
            e.preventDefault();
            var thisInputVal = $('#airport-name-select').select2('data')[0].text + ', ' + $('#airport-time-select').select2('data')[0].text,
                thisAirportNameSelectedOption = '#airport-name-select option[value="' + $('#airport-name-select').select2('data')[0].id + '"]';
            if($('#airport-name-select').val() != '-1' && $('#airport-time-select').val() != '-1'){
                $('#airport-chosen-cities').append('<div class="main-form__chosen-city">' +
                    '<input name="airport[]" value="' + thisInputVal + '">' +
                    '<p class="main-form__chosen-city-name">' + thisInputVal + '</p>' +
                    '<button class="main-form__chosen-city-button" type="button">Удалить из&nbsp;списка</button>' +
                    '</div>');
                $('#airport-name-select').val(null).trigger('change');
                $('#airport-time-select').val(null).trigger('change');
                // $(thisAirportNameSelectedOption).hide();
			}
        });
	}
	if($('#intensity-of-the-course-select').length > 0 && $('#intensity-of-the-course-select-parent')){
		$('#intensity-of-the-course-select').select2({
			dropdownParent: $('#intensity-of-the-course-select-parent'),
			minimumResultsForSearch: Infinity,
			placeholder: {
				id: '-1',
				text: '60 часов (1 час = 60 минут)'
			}
		});
	}
	if($('#excursions-on-weekdays-select').length > 0 && $('#excursions-on-weekdays-select-parent')){
		$('#excursions-on-weekdays-select').select2({
			dropdownParent: $('#excursions-on-weekdays-select-parent'),
            minimumResultsForSearch: Infinity
        });
	}
	if($('#excursions-on-weekdays-count-select').length > 0 && $('#excursions-on-weekdays-count-select-parent')) {
		$('#excursions-on-weekdays-count-select').select2({
			dropdownParent: $('#excursions-on-weekdays-count-select-parent'),
			minimumResultsForSearch: Infinity,
			placeholder: {
				id: '-1',
				text: '3 экскурсии'
			}
		});
	}
	if($('#weekend-trips-select').length > 0 && $('#weekend-trips-select-parent')){
		$('#weekend-trips-select').select2({
			dropdownParent: $('#weekend-trips-select-parent'),
            minimumResultsForSearch: Infinity
        });
	}
	if($('#weekend-trips-count-select').length > 0 && $('#weekend-trips-count-select-parent')){
		$('#weekend-trips-count-select').select2({
			dropdownParent: $('#weekend-trips-count-select-parent'),
            minimumResultsForSearch: Infinity,
			placeholder: {
				id: '-1',
				text: '4 экскурсии'
			}
        });
	}
	if($('#transfer-select').length > 0 && $('#transfer-select-parent')){
		$('#transfer-select').select2({
			dropdownParent: $('#transfer-select-parent'),
            minimumResultsForSearch: Infinity,
			placeholder: {
				id: '-1',
				text: 'Трансфер входит в стоимость'
			}
        });
	}
    if($('#schedule-period-select').length > 0 && $('#schedule-period-select-parent')){
        $('#schedule-period-select').select2({
            dropdownParent: $('#schedule-period-select-parent'),
            minimumResultsForSearch: Infinity,
            placeholder: {
                id: '-1',
                text: 'На 1 неделю'
            }
        });
    }
	if($('#program-type-select').length > 0 && $('#program-type-select-parent')){
		$('#program-type-select').select2({
			dropdownParent: $('#program-type-select-parent'),
			minimumResultsForSearch: Infinity,
			placeholder: 'Любой вариант программы'
		});
	}
	if($('#trip-duration-select').length > 0 && $('#trip-duration-select-parent')){
		$('#trip-duration-select').select2({
			dropdownParent: $('#trip-duration-select-parent'),
			minimumResultsForSearch: Infinity,
			placeholder: '2 недели'
		});
	}
	if($('#children-number-select').length > 0 && $('#children-number-select-parent')){
		$('#children-number-select').select2({
			dropdownParent: $('#children-number-select-parent'),
			minimumResultsForSearch: Infinity,
			placeholder: '12 детей'
		});
	}
	if($('#adult-number-select').length > 0 && $('#adult-number-select-parent')){
		$('#adult-number-select').select2({
			dropdownParent: $('#adult-number-select-parent'),
			minimumResultsForSearch: Infinity,
			placeholder: '2 взрослых'
		});
	}

	//Profile dropdown
	if($('#profile-dropdown-button').length > 0 && $('#profile-dropdown').length > 0){
		$('body').on('click', '#profile-dropdown-button', function (){
			var thisDropdown = $('#profile-dropdown');
			if(thisDropdown.is(':visible')) {
				thisDropdown.hide();
			} else {
				thisDropdown.show();
			}
		});
	}

	//form sidebar buttons
	if($('.form-sidebar__link').length > 0 && $('#header').length > 0){
		$('body').on('click', '.form-sidebar__link', function (e) {
			e.preventDefault();
			var thisId = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(thisId).offset().top - $('#header').outerHeight()
			}, 1000);
		});
	}

	//header mobile button and menu
	if($('.header__mobile-button').length > 0 && $('.header__menu').length > 0 && $('.header__selects-container').length > 0){
		$('body').on('click', '.header__mobile-button', function () {
			if($('.header__menu').is(':visible') || $('.header__selects-container').is(':visible')) {
				$(this).removeClass('opened');
				$('.header__menu, .header__selects-container').fadeOut();
			} else {
				$(this).addClass('opened');
				$('.header__menu, .header__selects-container').fadeIn();
			}
		});
	}

	//additional-excursion-datetimepicker
    if($('.checkbox-default_datetimepicker').length > 0 && $('.checkbox-default__input').length > 0){
        $('.checkbox-default_datetimepicker').on('change', '.checkbox-default__input', function () {
            if($(this).is(':checked')){
                $(this).parent().next().show();
            } else {
                $(this).parent().next().hide();
                $(this).parent().next().find('input').val('');
            }
        });
    }

	//datepicker
	if($('.input-default_datepicker').length > 0){
        $('.input-default_datepicker').each(function () {
            if($(this).hasAttr('id')) {
                //nothing
            } else {
                $(this).datepicker();
            }
        });
	}
	if($('#datepicker-from').length > 0 && $('#datepicker-to').length > 0) {
		var dateFormat = 'dd.mm.yy',
			from = $('#datepicker-from').datepicker({
                minDate: 0
            }).on( 'change', function() {
                to.datepicker( 'option', 'minDate', getDate( this ) );
            }),
			to = $('#datepicker-to').datepicker().on( 'change', function() {
				from.datepicker( 'option', 'maxDate', getDate( this ) );
			});
	}
    function getDate( element ) {
        var date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }
        return date;
    }

    //timepicker
    if($('.input-default_timepicker').length > 0){
        $('.input-default_timepicker').timepicker({
            show2400: true,
            timeFormat: 'H:i'
        });
    }

    //inline datepicker
    // if($('#inline-datepicker').length > 0){
    //     var datepickerEvents = [
    //         { Title: 'Five K for charity', Date: new Date('08.03.2018') },
    //         { Title: 'Dinner', Date: new Date('08.06.2018') },
    //         { Title: 'Dinner', Date: new Date('08.08.2018') },
    //         { Title: 'Meeting with manager', Date: new Date('08.27.2018') }
    //     ];
    //     $('#inline-datepicker').datepicker({
    //         beforeShowDay: function(date) {
    //             var result = [true, '', null];
    //             var matching = $.grep(datepickerEvents, function(event) {
    //                 return event.Date.valueOf() === date.valueOf();
    //             });
    //
    //             if (matching.length) {
    //                 result = [true, 'active', null];
    //             }
    //             return result;
    //         },
    //         dayNamesMin: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    //         onSelect: function(dateText) {
    //             var date,
    //                 selectedDate = new Date(dateText),
    //                 i = 0,
    //                 event = null;
    //
    //             /* Determine if the user clicked an event: */
    //             while (i < datepickerEvents.length && !event) {
    //                 date = datepickerEvents[i].Date;
    //
    //                 if (selectedDate.valueOf() === date.valueOf()) {
    //                     event = datepickerEvents[i];
    //                 }
    //                 i++;
    //             }
    //             if (event) {
    //                 /* If the event is defined, perform some action here; show a tooltip, navigate to a URL, etc. */
    //                 alert(event.Title);
    //             }
    //         },
    //         selectOtherMonths: true,
    //         showOtherMonths: true
    //     });
    //     if($(window).width() < 576) {
    //         $('#inline-datepicker').datepicker( 'option', 'dayNamesMin', [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ] );
    //     }
    // }

	//sidebar-form-fieldset dropdown
	if($('.sidebar-form-fieldset__title').length > 0) {
		$('body').on('click', '.sidebar-form-fieldset__title', function () {
			if($(this).next().is(':visible')) {
				$(this).removeClass('opened')
			} else {
				$(this).addClass('opened')
			}
			$(this).next().slideToggle();
		});
	}

	//slick slider
	$('#single-slider').slick({
		asNavFor: '#single-slider-nav',
		draggable: false,
		fade: true,
		infinite: false,
		swipe: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		touchMove: false
	});
	$('#single-slider-nav').slick({
		arrows: false,
		asNavFor: '#single-slider',
		dots: false,
		draggable: false,
		focusOnSelect: true,
		infinite: false,
		swipe: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		touchMove: false
	});

	//Magnific popup
	if($('.popup-gallery').length > 0) {
		//Gallery popup
		$('.school-page__slider-container-counter').on('click', function(event) {
			event.preventDefault();

			var gallery = $(this).attr('href');

			$(gallery).magnificPopup({
				delegate: 'a',
				type: 'image',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1], // Will preload 0 - before current, and 1 after the current image
					tCounter: '%curr% из %total%'
				}
			}).magnificPopup('open');
		});
	}
    if($('.popup-iframe').length > 0) {
        //Video popup
        $('.popup-iframe').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }
    if($('.popup-with-form').length > 0) {
        //Popup with form
        $('.popup-with-form').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#name',

            // When elemened is focused, some mobile browsers in some cases zoom in
            // It looks not nice, so we disable it:
            callbacks: {
                beforeOpen: function() {
                    if($(window).width() < 700) {
                        this.st.focus = false;
                    } else {
                        this.st.focus = '#name';
                    }
                }
            }
        });
    }

    //Добавление видео и удаление добавленных видео
    if($('#add-video-modal').length > 0){
        $('#add-video-modal').on('submit', function (e) {
        	e.preventDefault();
        	var thisInput = $(this).find($('input[name=video]'));
        	var thisInputVal = thisInput.val();
        	if(thisInputVal != '') {
        		$('#add-video-modal-uploaded-files').append('<div class="main-form__uploaded-file">' +
					'<input name="video-material[]" value="' + thisInputVal + '">' +
                    '<p class="main-form__uploaded-file-name main-form__uploaded-file-name_video">' + thisInputVal + '</p>' +
					'<button class="main-form__uploaded-file-button" type="button">Удалить видеозапись</button>' +
					'</div>');
                thisInput.val('');
                $.magnificPopup.close();
			}
        });
    }
    if($('.main-form').length > 0) {
        $('body').on('click', '.main-form__uploaded-file-button', function () {
            $(this).parent().remove();
        });
        $('body').on('click', '.main-form__chosen-city-button', function () {
        	var arrayOfSelectedCities = [];
            $(this).parent().remove();
            $('.main-form__chosen-city-button').each(function () {
                arrayOfSelectedCities.push($(this).data('id'));
            });
            $('#city-of-arrival-select').select2().val(arrayOfSelectedCities).trigger('change');
        });
    }

	//read more school-page review button
	if($('.review-card__more').length > 0) {
		$('body').on('click', '.review-card__more', function (e) {
		    e.preventDefault();
            if($(this).prev().is(':visible')) {
                $(this).text('Читать далее');
            } else {
                $(this).text('Свернуть');
            }
			$(this).prev().slideToggle();
		});
	}

});

$( document ).ready(function() {
    //Ползунок
    $("#slider-ui").slider({
        range: true,
        min: 1000,
        max: 100000,
        values: [ 100, 66666 ],
        slide: function( event, ui ) {
            $( ".left-filter__ui-input-start" ).val(ui.values[0] );
            $( ".left-filter__ui-input-end" ).val(ui.values[1] );
        }
    });

    $(".left-filter__ui-input-start").change(function () {
        var value = $(this).val();
        $("#slider-ui").slider("values", 0, value);
    });

    $(".left-filter__ui-input-end").change(function () {
        var value = $(this).val();
        $("#slider-ui").slider("values", 1, value);
    });

    $('.checkbox-default__input').click(function() {
        console.log(123);
        if ($(this).prop('checked') == true) {
            console.log(777);
            $(this).next('.catalog-checkbox').addClass('active-catalog');
        }
        else {
            $(this).next('.catalog-checkbox').removeClass('active-catalog');
        }
    });

    $('.left-filter__title-block').click(function() {
        if ($(this).find('.left-filter__title-img').hasClass('reverted')) {
            $(this).closest('.left-filter__item').find('.left-filter__toggle-block').slideUp();
            $(this).find('.left-filter__title-img').removeClass('reverted');
        }
        else {
            $(this).closest('.left-filter__item').find('.left-filter__toggle-block').slideDown();
            $(this).find('.left-filter__title-img').addClass('reverted');
        }

    });
    $('.advert-block__close-img').click(function() {
        $('.advert-block').hide();
    });




});

