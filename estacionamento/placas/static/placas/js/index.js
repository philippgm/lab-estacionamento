$(document).ready(function(){
    // Preview image when a file is selected
    $('#select-plate-img').change(function(){
        previewImage(this);
    });

    // Get CSRF Token
    $.ajaxSetup({ 
        beforeSend: function(xhr, settings){
            function getCookie(name){
                var cookieValue = null;
                if(document.cookie && document.cookie != ''){
                    var cookies = document.cookie.split(';');
                    for(var i = 0; i < cookies.length; i++){
                        var cookie = jQuery.trim(cookies[i]);
                        if(cookie.substring(0, name.length + 1) == (name + '=')){
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            if(!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))){
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        } 
    });

    // Identify plate from image
    $('.send-img-file').on('click', function(){
        var fileInput = document.getElementById('select-plate-img');
        if(fileInput.files && fileInput.files[0]){
            sendImage(fileInput);
        }
        else{
            alert('Selecione uma imagem antes!');
        }
    });
});

function populateVehicleInfo(data){
    var $infoContainer = $('.vehicle-info');
    $infoContainer.find('.client-content').text(data.client);
    $infoContainer.find('.plate-content').text(data.plate);
    $infoContainer.find('.manufacturer-content').text(data.manufacturer);
    $infoContainer.find('.model-content').text(data.model);
}

function sendImage(input){
    var formData = new FormData();
    formData.append('img_file', input.files[0]);

    var identifyRequest = $.ajax({
        type: 'POST',
        url: '/placas/identifyPlate',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 300000
    });
    
    identifyRequest.done(function(data){
        console.log(data);
        populateVehicleInfo(data);
    });

    identifyRequest.fail(function(errorMessage){
        console.log(errorMessage);
        alert('Ocorreu um erro ao tentar processar a imagem. Por favor, tente novamente.');
    });
}

function previewImage(input){
    if(input.files && input.files[0]){
        var reader = new FileReader();

        reader.onload = function(e){
            $('#plate-img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}