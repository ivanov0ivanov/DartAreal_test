import $ from 'jquery';
import 'popper.js';
import 'bootstrap';

$ (() => {
    $ ('.registration_active').addClass ('show_panel');
});

$ ('.bg-panel input[type="radio"]').on ('change', function () {
    if ($ ('#sign-up').is (':checked')) {
        $ ('.container_form-block').removeClass ('switch_block');

        $ ('.login_active').removeClass ('show_panel');
        $ ('.registration_active').addClass ('show_panel');

    } else if ($ ('#log-in').is (':checked')) {
        $ ('.container_form-block').addClass ('switch_block');

        $ ('.login_active').addClass ('show_panel');
        $ ('.registration_active').removeClass ('show_panel');
    }
});