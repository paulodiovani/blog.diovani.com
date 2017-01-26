document.body.style.backgroundColor = localStorage.getItem('bg');
document.body.style.color = localStorage.getItem('cc');

if (localStorage.getItem('syntax')) {
    document.getElementById('syntax').setAttribute('href', localStorage.getItem('syntax'));
}

function theme() {
    var syntax = document.getElementById('syntax').href;

    if ( localStorage.getItem('bg') === 'rgb(255, 255, 255)' || !localStorage.getItem('bg')) {
        localStorage.setItem('bg', 'rgb(6, 23, 37)');
        localStorage.setItem('cc', '#777');
        localStorage.setItem('syntax', syntax.replace('default', 'monokai'));
    }
    else if( localStorage.getItem('bg') === 'rgb(6, 23, 37)') {
        localStorage.setItem('bg', 'rgb(255, 255, 255)');
        localStorage.setItem('cc', '#333');
        localStorage.setItem('syntax', syntax.replace('monokai', 'default'));
    }

    document.body.style.backgroundColor = localStorage.getItem('bg');
    document.body.style.color = localStorage.getItem('cc');
    document.getElementById('syntax').setAttribute('href', localStorage.getItem('syntax'));
}
