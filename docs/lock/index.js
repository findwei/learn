window.addEventListener('hashchange', function (event) {
    islock();
});
$("#input").on('input propertychange', (e) => {
    if (e.target.value === 'webber') {
        localStorage.setItem('--', window.btoa(e.target.value));
        $('#lock').hide();
    }
});
let islock = function () {
    if (window.atob(localStorage.getItem('--') || '') === 'webber') {
        $('#lock').hide();
    } else {
        $('#lock').css({
            'display': 'flex'
        });
    }
}
$(document).ready(function () {
    islock();
})X