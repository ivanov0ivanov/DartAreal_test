import ConnectyCube from 'connectycube';
import $ from "jquery";
import {CREDENTIALS, CONFIG} from '../../src/js/settings'

ConnectyCube.init(CREDENTIALS, CONFIG);

ConnectyCube.createSession(CREDENTIALS, function (error, session) {
    if (session) {
        $(document).on('click', '#signUp', function (e) {
            e.preventDefault();

            let $fullName = $('.fullName').val(),
                $login = $('.login').val(),
                $password = $('.password').val();

            let newUser = {
                'full_name': `${$fullName}`,
                'login': `${$login}`,
                'password': `${$password}` + "pwd"
            };

            ConnectyCube.users.signup(newUser, function (error, user) {
                if (user) {
                    $('.success').fadeIn();
                    $('.fullName').val('');
                    $('.login').val('');
                    $('.password').val('');
                    setTimeout(()=>{
                        $('.container_form-block').addClass('switch_block');
                        $('.registration_active').removeClass('show_panel');
                        $('.login_active').addClass('show_panel');
                        $('.success').fadeOut(1000);
                    },500);
                } else if (error) {
                    console.error('!signUp Error');
                    new inputError('.registration_active', user);
                }
            });
        });

        $(document).on('click', '#logIn', function (e) {
            e.preventDefault();

            let $login = $('.loginIn').val(),
                $password = $('.passwordPass').val();

            let logInUser = {
                'login': `${$login}`,
                'password': `${$password}` + "pwd"
            };

            ConnectyCube.login(logInUser, function (error, user) {
                if (user) {
                    $('.success-welcome').fadeIn();
                    $('.loginIn').val('');
                    $('.passwordPass').val('');
                    setTimeout(()=>{
                        $('.success-welcome').fadeOut(3000);
                    });
                } else if (error) {
                    console.error('!This user doesn'+ "'" + 't' + ' exist.');
                    if ($('.login_active input').val() === '') {
                        new inputError('.login_active', user);
                    } else {
                        $('.error').css('display', 'none');
                        $('.errorUser').css('display', 'block');
                    }
                }
            });
        });
    } else if (error) {
        console.error('!NonSession')
    }
});

class inputError {
    constructor(auth, user) {
        $(`${auth} input`).each(function () {
            if (user) {
                $(`${auth} .error`).css('display', 'none');
                $(this).removeClass('border-danger');

            } else if ($(this).val() === '') {
                $(this).addClass('border-danger');
                $('.errorUser').css('display', 'none');
                $(`${auth} .error`).css('display', 'block');

            } else {
                $(this).removeClass('border-danger');
                if (user) {
                    $(`${auth} .error`).css('display', 'none');
                }
            }
        });
    }
}
