ЗАДАНИЕ:
Напишите форму авторизации пользователя.
Первым шагом вам необходимо клонировать проект по ссылке на ваш локальный компьютер.
Ссылка на репозиторий: https://github.com/ArtemMakarchenko/home-work-14. В терминале перейдите в папку клонированного проекта. 
В этой папке находятся 3 файла (index.html, script.js, style.css) и папка server. 
Чтобы отправлять запросы в локальную базу данных вам нужно в консоле перейти в папку server и запустить 2 команды: ‘npm install’ и ‘json-server --watch db.json’. 
После запуска сервера вы можете отправлять запросы на эндпоинт ‘http://localhost:3000/users’. Сервер готов к работе.
В разметке создайте форму авторизации с двумя вкладками со следующим содержанием (стили добавьте на своё усмотрение).
Первая вкладка должна содержать следующие элементы:
-input для ввода логина
-input для ввода пароля
-кнопка ‘Sign In’

Вторая вкладка должна содержать следующие элементы:
-input для ввода логина
-input для ввода пароля
-input для повторного ввода пароля
-кнопка ‘Sign Up’

В файле script реализуйте следующий функционал работы формы:
-Переключение между вкладками формы авторизации
-Добавить обработчик клика на кнопу ‘Sign In’
-Добавить обработчик клика на кнопу ‘Sign Up’

Функция-обработчик кнопки ‘Sign In’ должна реализовывать следующую логику:
-Отправлять GET-запрос используя fetch и async/await на эндпоинт ‘http://localhost:3000/users’ для получения списка всех пользователей.
-Производить проверку на наличие пользователей с таким логином. Если пользователя с таким логином нет, внизу страницы вывести сообщение об ошибке.
-Если пользователь с таким логином существует, произвести сравнение введённого пароля и пароля пользователя из ответа сервера. Если пароли не совпадают, внизу страницы вывести сообщение об ошибке с текстом ‘Wrong password. Try again!’.
-Если проверки пройдены, то скрыть табы и вывести на страницу сообщение ‘Congratulations! You have successfully logged in as user {login пользователя}’

Функция-обработчик кнопки ‘Sign Up’ должна реализовывать следующую логику:
-Отправлять GET-запрос используя fetch и async/await на эндпоинт ‘http://localhost:3000/users’ для получения списка всех пользователей.
-Производить проверку на наличие пользователей с таким логином. Если пользователь с таким логином уже есть, внизу страницы вывести сообщение об ошибке с текстом ‘User with this login exists’.
-Производить проверку на пустоту первого инпута. Если он пуст, внизу страницы вывести сообщение об ошибке с текстом ‘Please enter your password’.
-Производить проверку на пустоту второго инпута. Если он пуст, внизу страницы вывести сообщение об ошибке с текстом ‘Please enter your password again’.
-Производить проверку на одинаковость паролей. Если пароли на одинаковы, вывести сообщение об ошибке с текстом ‘You entered different passwords. Please edit them and try again.’.
-Если все проверки пройдены успешно, отправить POST-запрос используя fetch и async/await на эндпоинт ‘http://localhost:3000/users’ для добавления нового пользователя в базу данных. В теле запроса укажите объект завёрнутый в JSON.stringify. Отправляемый объект должен содержать следующие поля:
login – со значением инпута login формы регистрации
password - со значением инпута password формы регистрации
Написанные функции назначить обработчиками события клик для кнопок ‘Sign In’ и ‘Sign Up’.
 
 


