;(function ($, window, document, undefined) {
	
	var pluginName = 'defaultPluginName',
		defaults = {

			ajaxOptions: {
				url: '/send',
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json'
			}
		},
		options = {};

	function Plugin( element, options) {
		this.element = element;

		this.options = $.extend(true, {}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;
		

		this.init();


	} 

	Plugin.prototype.init = function() {
			
			
			
			var amount = this.options.amount;
			var ajaxSetting = this.options.ajaxOptions;
			var labelList = [];

			

			$(this.element).bind("submit", function(e) {
					e.preventDefault();

					var data =  $(this).serialize() + "&total=" + $("#total").text();
					JSON.stringify(data);
					alert(data)

					$.ajax({
						url: ajaxSetting.url,
						type: ajaxSetting.type,	
						dataType: ajaxSetting.dataType,										
						data: data
					}).done(function(data) {				
						console.log(data)
						$('form').trigger('reset');
						$('form').trigger('change');

					}).fail(function(error){
						console.log(error)
						$('form').trigger('reset');
						$('form').trigger('change');

						
					});
				
				});

			$(this.element).change(function() {
				
				
				var total = 0;
				children_active =  $(this).find('input:checked, option:selected');

				$(".result > ul").remove();
				$(".result").append('<ul>' +'</ul>');

				if (Number($(amount).val()) <= 0) {
					$(amount).val(1)
				}

				for (var i = 0; i < children_active.length; i++) {		

					var price = Number($(children_active[i]).attr('data-price'));
					var label = $(children_active[i]).attr('data-label');
					labelList.push({price: price, label: label});	
								
					total += price * Number($(amount).val()); 
					
				}
				
				
				if (amount) {
					labelList.push({price:$(amount).val(), label: $(amount).attr('data-label')});
				}

				for  (var i = 0; i < labelList.length; i++) {
					$(".result > ul").append('<li>' + labelList[i].label + ': ' + labelList[i].price  + '</li>');
				}
				
				$("#total").text(total);
				labelList = [];

				 
			});		 

	};	

	

			

	$.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})(jQuery, window, document, undefined);