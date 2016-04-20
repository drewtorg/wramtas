
app.controller('mainController', function ($scope, $location) {
    $scope.tabs = [
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
            title: 'Conferences',
            subtabs: [
                {
                    href: '/conference',
                    title: 'Regional and National Info'
                },
                {
                    href: '/scholarships',
                    title: 'Conference Scholarships'
                }
            ]
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

    $scope.isDropdown = function(tab) {
        return tab.hasOwnProperty('subtabs');
    };
});
