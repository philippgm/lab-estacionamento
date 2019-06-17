$(document).ready(function(){
    // Preview image when a file is selected
    $('#select-plate-img').change(function() {
        previewImage(this);
    });
});

function previewImage(input){
    if(input.files && input.files[0]){
        var reader = new FileReader();

        reader.onload = function(e){
            $('#plate-img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}