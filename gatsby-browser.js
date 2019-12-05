import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';

export function onPreRouteUpdate({location}) {
    console.log("Routing to location: ", location);

    if (location.origin === 'http://www.wramtas.org') {
        window.location.replace(location.href.replace('http', 'https'));
    }
}