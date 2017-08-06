# dom
A little library to manipulate the dom

## parse

```js
dom.parse('<div><p>text</p></div><button>button</button>');
```

## insert

### element
```js
var existingNode = document.querySelector('body').firstChild,
    newNode = document.createElement('div');

dom.insert.element(newNode).before(existingNode);
```

```js
var existingNode = document.querySelector('body').firstChild,
    newNode = document.createElement('div');

dom.insert.element(newNode).after(existingNode);
```

```js
var existingNode = document.querySelector('body').firstChild,
    newNode = document.createElement('div');

dom.insert.element(newNode).into(existingNode);
```

### className

```js
var existingNode = document.createElement('div');

dom.insert.className('class').to(existingNode);
```

### text

```js
var existingNode = document.createElement('div');

dom.insert.text('text ...').before(existingNode);
```

```js
var existingNode = document.createElement('div');

dom.insert.text('text ...').after(existingNode);
```

```js
var existingNode = document.createElement('div');

dom.insert.text('text ...').into(existingNode);
```

## replace

### element

```js
var mainNode = dom.find('main'),
  newMainNode = dom.find('main');

dom.replace.element(mainNode).by(newMainNode);
```

### text

```js
var mainNode = dom.find('main');

dom.replace.text('text ...').of(mainNode);
```

## remove

### element

```js
var mainNode = dom.find('main');
dom.remove.element(mainNode);
```

### className

```js
var mainNode = dom.find('main');
dom.remove.className('class').from(mainNode);
```

## find

```js
var mainNode = dom.find('main');
```

```js
var mainNode = dom.find('main', {
  quantity: 'all'
});
```

```js
var mainNode = dom.find('main', {
  context: document,
});
```

```js
var mainNode = dom.find('main', {
  quantity: 'one',
  context: document,
});
```