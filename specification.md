# Запуск проекта
* Установить зависимости: 
1. `cd ./project`
2. `npm install`
* Создать файлы `.env` на основе `.env.example` в папках `apps/api , apps/blogs , apps/files , apps/notifications , apps/users`
* Запустить docker-контейнеры с БД: `npm run db:start`
* Применить миграции к БД Postgres сервиса Blogs: `npx nx run blogs:db:migrate`
* Сгенерировать Prisma Client: `npx nx run blogs:db:generate`
* Запустить сервисы в отдельных терминалах командами:

```cmd
npx nx run api:serve
npx nx run blogs:serve
npx nx run files:serve
npx nx run notifications:serve
npx nx run users:serve
```
## Доступ к API можно получить через Swagger по адресу: `http://localhost:3000/spec`

# Переменные окружения
## Blogs
* POSTGRES_USER - имя пользователя БД 
* POSTGRES_PASSWORD - пароль БД
* POSTGRES_DB - имя БД
* POSTGRES_PORT - порт БД
* PGADMIN_DEFAULT_EMAIL - имя пользователя PGADMIN
* PGADMIN_DEFAULT_PASSWORD - пароль PGADMIN
* PGADMIN_PORT - порт PGADMIN
* PORT - номер порта на котором будет запущено приложение

## Files
* UPLOAD_DIRECTORY - путь для хранения загруженных файлов
* MONGO_DB - имя БД
* MONGO_HOST - хост БД
* MONGO_PORT - порт БД
* MONGO_USER - имя пользователя БД
* MONGO_PASSWORD - пароль БД
* MONGO_AUTH_BASE - имя пользователя интерфейса БД
* MONGO_UI_PORT - порт интерфейса БД
* SERVE_ROOT - путь доступа к файлам
* PORT - номер порта на котором будет запущено приложение

## Notifications
* RABBITMQ_DEFAULT_USER - имя пользователя по умолчанию Rabbit
* RABBITMQ_DEFAULT_PASS - пароль  по умолчанию Rabbit
* RABBIT_HOST - хост Rabbit
* RABBIT_PASSWORD - пароль Rabbit
* RABBIT_PORT - порт Rabbit
* RABBIT_USER - имя пользователя Rabbit
* RABBIT_QUEUE - очередь Rabbit
* RABBIT_EXCHANGE - exchange Rabbit
* MONGO_DB - имя БД
* MONGO_HOST - хост БД
* MONGO_PORT - порт БД
* MONGO_USER - имя пользователя БД
* MONGO_PASSWORD - пароль БД
* MONGO_AUTH_BASE - имя пользователя интерфейса БД
* MONGO_UI_PORT - порт интерфейса БД
* MAIL_SMTP_HOST - хост SMTP-сервера
* MAIL_SMTP_PORT - порт SMTP-сервера
* MAIL_USER_NAME - имя пользователя SMTP-сервера
* MAIL_USER_PASSWORD - пароль SMTP-сервера
* MAIL_FROM - адрес с которого будет производиться отправка почты
* PORT - номер порта на котором будет запущено приложение

## Users
* MONGO_DB - имя БД
* MONGO_HOST - хост БД
* MONGO_PORT - порт БД
* MONGO_USER - имя пользователя БД
* MONGO_PASSWORD - пароль БД
* MONGO_AUTH_BASE - имя пользователя интерфейса БД
* MONGO_UI_PORT - порт интерфейса БД
* JWT_ACCESS_TOKEN_SECRET - секретный ключ ACCESS_TOKEN
* JWT_ACCESS_TOKEN_EXPIRES_IN - время жизни ACCESS_TOKEN
* JWT_REFRESH_TOKEN_SECRET - секретный ключ REFRESH_TOKEN
* JWT_REFRESH_TOKEN_EXPIRES_IN - время жизни REFRESH_TOKEN
* RABBIT_HOST - хост Rabbit
* RABBIT_PASSWORD - пароль Rabbit
* RABBIT_PORT - порт Rabbit
* RABBIT_USER - имя пользователя Rabbit
* RABBIT_QUEUE - очередь Rabbit
* RABBIT_EXCHANGE - exchange Rabbit
* PORT - номер порта на котором будет запущено приложение

