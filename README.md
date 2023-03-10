# StockExchange
NestJS and React stock exchange administration application. [DEMO](https://stockexchange-6a9t.onrender.com)

Web-приложение, обеспечивающее настройку биржи брокера, в которой есть возможность задать перечень участников, перечень акций, правила изменения акций во времени.
1. Информация о брокерах (участниках) и параметрах акций сохраняется в файле в формате JSON.
2. В качестве сервера используется NestJS с использованием языка TypeScript.
3. Брокеров можно добавлять и удалять, можно изменить начальный объем денежных средств.
4. Есть возможность просмотреть перечень доступных акций (обозначение, название компании) и исторические данные по изменению курса не менее чем за текущий и предыдущий год. Есть возможность выбрать какие акции будут участвовать в торгах.
(Реальные исторические данные по изменению курса взяты по адресу: https://www.nasdaq.com/market-activity/quotes/historical).
5. Настройки биржи: дата начала торгов, скорость смены дат в секундах при имитации торгов. На этой же странице доступна кнопка «Начало торгов», которая запускает процесс имитации торгов и предоставление информации об изменении курсов акций всем брокерам по web-сокетам с учётом заданных настроек биржи.
6. Все элементы в клиентском приложении реализованы с использованием компонентов React. Маршрутизация реализована с использованием «reactrouter-dom».
7. Для хранения общих данных используется Redux.
8. На сервере спроектированы компоненты и сервисы NestJS для имитации торгов и обработки запросов клиентского приложения.
9. Исторические данные по котировкам представляются как в виде таблиц, так и в виде графиков (с использованием Chart.js).
10. Приложение реализует responsive-интерфейс и корректно работает в том числе при просмотре с мобильного телефона.

## Preview

|![image](https://user-images.githubusercontent.com/71726365/221547187-672cf873-5c31-4221-9b16-4e55c16c725d.png)|
|:--:| 
| *Exchange settings* |

|![image](https://user-images.githubusercontent.com/71726365/221547292-fd5c8624-8a09-4f1a-9a6c-81507d6ae499.png)|
|:--:| 
| *Charts* |

|![image](https://user-images.githubusercontent.com/71726365/221547415-5dd6e122-da17-48f4-a8d7-99a349c1c8f9.png)|
|:--:| 
| *Info* |
