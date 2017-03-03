# Favourite Movies

### Task

Направете HTML интерфейс за показване на лист от филми, със следната функционалност:

  - Филмите се разделят на две категории: **всички** и **любими**.
  - Когато филм **стане любим**, той се добавя **най-отдолу** в списъка с любими и се **премахва** от списъка с всички.
  - Когато филм бъде **махнат от любими**, той се добавя в списъка с всички, така че филмите там да останат подредени по **азбучен ред**.
  - Списъкът с любими филми трябва да **може да се пренарежда**.
  - При клик върху загавие на филм трябва да се показва **допълнителна информация**, а при още един клик - тя да се скрива.
  - Списъците трябва да запазват вида си при **презареждане на страницата**, с изключение на допълнителната информация, която трябва да бъде скрита след презареждането.
  - Опитайте да реализирате функционалността максимално **ефективно**.


### Tech stack:
1. React;
2. Redux;
3. redux-persist with redux-persist-transform-immutable
4. Immutable JS;
5. CSS next;
### All compiled with Babel.

### Setup & Build
1. Yarn;
2. Webpack;
3. Express;

### Installation
Optional: install yarn: https://yarnpkg.com/
Run this in your favourite terminal:

##Note! Global project dependencies:
```sh
$ npm install -g webpack webpack-dev-server jest eslint
```

```sh
$ git clone project
$ cd to project folder
$ yarn/npm install
$ npm run dev
$ open http://localhost:3210
```

### Testing with jest
```sh
$ npm run jest or jest
```

### Linting
```sh
$ npm run lint
```