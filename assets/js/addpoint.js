window.addEventListener('load', function() {

    adPoint.loadRaspisanie();

    jQuery(".canlink").click(function( e ){
        adPoint.loadData("/index.php?option=com_ttfsp&idspec="+adPoint.getId()+"&office=0&view=getrasp");
    });

    jQuery(document).keydown(function(eventObject){
        if( eventObject.which == 27 ){
           if(jQuery("body>.uk-modal").is(".modalAdpoint")){
               if(jQuery('.retpm_butt>a').is(".paymentCancel")){
                   jQuery(".paymentCancel").click();
               }
               jQuery("body>.uk-modal.modalAdpoint").remove();
           }
        }
        });
});

adPoint = {
    loadRaspisanie: function () {
        jQuery(".myModal").click(function( e ){
            idDoc = jQuery(this).attr('data-id');
            nameDoc = jQuery(this).attr('data-name');
            adPoint.getModal(idDoc,nameDoc);
            adPoint.loadData("/index.php?option=com_ttfsp&idspec="+idDoc+"&office=0&view=getrasp");
                jQuery('.adpointWrapper').queue(function () {            // добавим новую функцию в очередь
                    jQuery(".adpointWrapper").fadeIn(1000);
                    jQuery(this).dequeue();                    // ! продолжим очередь !
                });
            UIkit.modal('#modal'+idDoc,{bgclose:false}).show();
        });

    },
    stopDefAction: function () {
        jQuery(".adpointContainer .nav_week>a").click(function( e ){
            e.preventDefault();
            e.stopPropagation();
            adPoint.loadData(jQuery(this).attr('href'));
        });
    },
    /*Загрузка AJAX post запросом заданного урла*/
    loadData: function (url) {
        jQuery(".adpointContainer").html('<img src="https://www.w3schools.com/jquery/demo_wait.gif" class="ploader">');
        jQuery.post( url, function( data ) {
            jQuery(".adpointContainer").html(data);
            adPoint.stopDefAction(); //Старт огтслеживания понедельной навигации
            adPoint.writeRaspAction(); //Старт отслеживания почасовой записи на прием
        });
    },

    loadNav: function () {
            var container = document.querySelector(".adpointContainer");
            var linkNav = container.querySelectorAll(".adpointContainer .nav_week a"),
                index, button;
            for (index = 0; index < linkNav.length; index++) {
                button = linkNav[index];
                console.log(this);
            }
    },

    writeRaspAction: function () {
        jQuery(".adpointContainer .receptAjax>a").click(function( e ){
            e.preventDefault();
            e.stopPropagation();
            adPoint.loadData(jQuery(this).attr('href'));
        });
    },

    getId: function () {
        return jQuery('.adpointWrapper').attr('data-id');
    },

    getOrderId: function () {
        return jQuery('.payAction').attr('data-orderId');
    },

    getsession: function () {
        return jQuery('.payAction').attr('data-psws_sess');
    },
    getModal:function (idDoc,nameDoc) {
        var text = '<div id="modal'+idDoc+'" class="uk-modal modalAdpoint" aria-hidden="true" style="overflow-y: scroll;">\n' +
			'    <div class="uk-modal-dialog uk-modal-apd">\n' +
            '        <a class="adpoint-close uk-icon-close"></a>\n' +
            '        <div class="uk-modal-header">\n' +
            '            <h2>Запись на прием к доктору <span class="docName">'+nameDoc+'</span></h2>\n' +
            '        </div>\n' +
            '        <div class="adpointWrapper" data-id="'+idDoc+'" style="">\n' +
            '            <div class="adpointContainer">\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n'
        jQuery("body").append(text);
        adPoint.createCloseAction(idDoc);

    },
    createCloseAction: function(idDoc){
        jQuery(".adpoint-close").click(function( e ){
            if(jQuery("a").hasClass("paymentCancel")){
                url = jQuery("a.paymentCancel").attr("href");
                jQuery.post( url, function( data ) {
                    jQuery(".adpointContainer").html(data);
                }).done(function() {
                }).fail(function() {
                    alert( "Ошибка удаление записи, " +
                        "будет автоматически очищена через минуту" );
                });
            }
            jQuery(".adpointWrapper").fadeOut(1000);
            var  modal = UIkit.modal('#modal'+idDoc)

            if ( modal.isActive() ) {
                modal.hide();
                jQuery('#modal'+idDoc).remove();
                jQuery('html').removeClass('uk-modal-page');
            }
        });
    }
};

/*функция добавления ведущего нуля*/
function zeroAdd(data){
    var str = String(data);
    if(str.length<2){
        return('0'+str)
    }else{return str}
}

/*Функция таймера*/
function timer(elem, min, sec) {
    (--sec < 0) && (sec = min-- ? 59 : 0);
    min = Math.max(min, 0);
    elem.innerHTML = zeroAdd(min) + ":" + zeroAdd(sec);
    if (sec || min)
    {setTimeout(timer.bind(0, elem, min, sec), 1000);}
    else{elem.parentElement.remove();
        document.querySelector('.paymentCancel').click();
    }
}

function agrement(){
    var checkBox = document.querySelector('.agreement input');
    var inputPayAction = document.querySelector(".payAction");
    if (checkBox.checked == true){
        inputPayAction.removeAttribute("disabled");
    } else {
        inputPayAction.setAttribute("disabled", "true");
    }
}
