$(document).ready(function(){
	$('body').on('keydown', '#upload-detail-input-tag', function(e){
		if(e.which == 13){
			$('<span class="upload-detail-tag">'+$(this).val()+'</span>').insertBefore($(this));
			$(this).val('');
		}
	});

	$('body').on('click', '.upload-detail-thumbnail', function(){
		$('.upload-detail-thumbnail').removeClass('selected');
		$(this).addClass('selected');
	})

	$('body').on('change', '#upload-file', function(){
		$('.upload-before').hide();
		$('.upload-detail').show();
	});
});