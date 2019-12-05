import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';

export function onPreRouteUpdate({location}) {
    if (location.origin === 'http://www.wramtas.org' || location.origin === 'http://wramtas-staging.herokuapp.com') {
        window.location.replace(location.href.replace('http', 'https'));
    }
}