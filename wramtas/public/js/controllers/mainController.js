
app.controller('mainController', function ($scope, $location) {
    $scope.tabs = [
        {
            href: '/',
            title: 'News'
        },
        {
            href: '/about',
            title: 'About'
        },
        {
            href: '/affiliates',
            title: 'Affiliates'
        },
        {
            href: '/conference',
            title: 'WRAMTA Conference'
        },
        {
            href: '/spotlight',
            title: 'Spotlight'
        },
        {
            href: '/profile',
            title: 'My WRAMTAS Profile'
        },
        {
            href: '/elections',
            title: 'Elections'
        },];

    $scope.isActive = function(currentPage) {
        return currentPage === $location.path();
    };
});
