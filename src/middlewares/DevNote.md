To protect a route from an unsigned user kindly import the authorization middleware

Example: to protect users/myaccount, we call authorization pass Your own middlewares if you have any before your controller.
router.get('/users/myaccount', authorization, indexController.Welcome);