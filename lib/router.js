Router.configure({
    layoutTemplate: '_layout'
});

Router.map(function() {
    this.route('home', {
        path: '/',
        template: 'home'
    });
    this.route('form', {
        template: 'myForm'
    });
});
