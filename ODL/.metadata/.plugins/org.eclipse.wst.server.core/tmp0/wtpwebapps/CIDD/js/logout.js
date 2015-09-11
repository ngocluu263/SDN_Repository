$(document).ready(function() {		
$('#logout').on('click', function(){
						
						window.location.href = "../index.html";
						var loginUser = sessionStorage.getItem('login_user');
						sessionStorage.setItem("login_validate", 0);
						sessionStorage.clear();
						localStorage.clear();
						var url="../CIDD/rest/user/logout/"+loginUser;
						console.log(url)
						
						$.ajax(
								{
									type : "GET",
									dataType : "html",
									contentType : "application/json",
									url : url,
									crossDomain : true,
									statusCode : {
										200 : function(data) {
											console.log(data);
												
										}
									}
								})
						.error(
								function(xhr, errorText) {

								});
						
					});	})