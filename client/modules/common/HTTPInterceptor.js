appModule.factory("httpInterceptor", ["$log", function($log){
	return {
		
		request : function(config){
			$log.debug("intercepting request...");
			return config;
		},
		response : function(response){
			$log.debug("intercepting response...");
			return response;
		}
		
	}
}])