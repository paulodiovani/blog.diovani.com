document.body.style.backgroundColor = sessionStorage.getItem('bg');
document.body.style.color = sessionStorage.getItem('cc');

if (sessionStorage.getItem('syntax')) {
    document.getElementById('syntax').setAttribute('href', sessionStorage.getItem('syntax'));
}

function theme() {
    var syntax = document.getElementById('syntax').href;

    if ( sessionStorage.getItem('bg') === 'rgb(255, 255, 255)' || !sessionStorage.getItem('bg')) {
        sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
        sessionStorage.setItem('cc', '#777');
        sessionStorage.setItem('syntax', syntax.replace('default', 'monokai'));
    }
    else if( sessionStorage.getItem('bg') === 'rgb(6, 23, 37)') {
        sessionStorage.setItem('bg', 'rgb(255, 255, 255)');
        sessionStorage.setItem('cc', '#333');
        sessionStorage.setItem('syntax', syntax.replace('monokai', 'default'));
    }

    document.body.style.backgroundColor = sessionStorage.getItem('bg');
    document.body.style.color = sessionStorage.getItem('cc');
    document.getElementById('syntax').setAttribute('href', sessionStorage.getItem('syntax'));
}
