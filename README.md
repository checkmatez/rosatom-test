# rosatom-test
После распаковки, из директории можно запустить скрипты
1. npm run insertTasksIntoMongo - парсит имеющийся в корне файл "График CMP.xer" и сохраняет в удаленную базу Монго на mlab.
2. npm run start - запускает сервер, после можно открыть http://localhost:7777/tasks в браузере будет JSON из Монго.

ВАЖНО - insertTasksIntoMongo не бросает коллекцию, а добавляет к имеющимся.
Функция парсер - в utils/utils.js parseFile