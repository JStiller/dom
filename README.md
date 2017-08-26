# dom
A little library to manipulate the dom

## parse

```js
jstiller.components.dom.parse('<div><p>text</p></div><button>button</button>');
```

## insert

### element
```js
var existingNode = jstiller.components.dom.find('body').firstChild,
    newNode = jstiller.components.dom.create.element('div');

jstiller.components.dom.insert.element(newNode).before(existingNode);
```

```js
var existingNode = jstiller.components.dom.find('body').firstChild,
    newNode = jstiller.components.dom.create.element('div');

jstiller.components.dom.insert.element(newNode).after(existingNode);
```

```js
var existingNode = jstiller.components.dom.find('body').firstChild,
    newNode = jstiller.components.dom.create.element('div');

jstiller.components.dom.insert.element(newNode).into(existingNode);
```

### className

```js
var existingNode = jstiller.components.dom.create.element('div');

jstiller.components.dom.insert.className('class').to(existingNode);
```

### text

```js
var existingNode = jstiller.components.dom.create.element('div');

jstiller.components.dom.insert.text('text ...').before(existingNode);
```

```js
var existingNode = jstiller.components.dom.create.element('div');

jstiller.components.dom.insert.text('text ...').after(existingNode);
```

```js
var existingNode = jstiller.components.dom.create.element('div');

jstiller.components.dom.insert.text('text ...').into(existingNode);
```

## replace

### element

```js
var mainNode = jstiller.components.dom.find('main'),
  newMainNode = jstiller.components.dom.find('main');

jstiller.components.dom.replace.element(mainNode).by(newMainNode);
```

### text

```js
var mainNode = jstiller.components.dom.find('main');

jstiller.components.dom.replace.text('text ...').of(mainNode);
```

## remove

### element

```js
var mainNode = jstiller.components.dom.find('main');
jstiller.components.dom.remove.element(mainNode);
```

### className

```js
var mainNode = jstiller.components.dom.find('main');
jstiller.components.dom.remove.className('class').from(mainNode);
```

## create

### element
```js
var mainNode = jstiller.components.dom.create.element('div', {
  align: 'left'
});
```

## find

```js
var mainNode = jstiller.components.dom.find('main');
```

```js
var mainNode = jstiller.components.dom.find('main', {
  quantity: 'all'
});
```

```js
var mainNode = jstiller.components.dom.find('main', {
  context: document,
});
```

```js
var mainNode = jstiller.components.dom.find('main', {
  quantity: 'one',
  context: document,
});
```