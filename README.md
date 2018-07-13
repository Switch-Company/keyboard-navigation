# Switch - keyboard-navigation

Detect and add a class when the keyboard is used, removes it on click or mouse move.

---

This plugin is written in ES2015 and available either in uncompiled form in the `/lib` folder or compiled for ES5 in the `/dist` folder. If your project uses babel with Webpack or Rollup, you should change the exclusion so this plugin gets compiled or force Webpack or Rollup to fetch the compiled version by using the `main` entry of the `package.json` file instead of the `module` entry.

```js
// .babelrc file or configuration within webpack or rollup
{
  "plugins": [...],
  "exclude": "node_modules/!(@switch-company)/**",
}
```

## Installation

```bash
$ npm install @switch-company/keyboard-navigation
```

## Usage

```js
import KB from '@switch-company/keyboard-navigation';

const kb = new KB({
  classElement,
  className,
  moveThreshold,
  rules
});
```

## Parameters

All parameters are optional and have defaults values except `rules`.

| Name            | Type                | Description |
|-----------------|---------------      |-------------|
| `classElement`  | `HTMLElement`       | The element which will receive the class when keyboard is in use (defaults to `document.documentElement`) |
| `className`     | `String`            | The class to apply to the element defined with `classElement` (defaults to `keyboard`) |
| `moveThreshold` | `Number` or `false` | Distance in pixels that the mouse has to move before the class is removed. Can be disabled by passing `false` (defaults to `10`) |
| `rules`         | `Function`          | Custom function that receives the tab event. Allows custom checks to decide if the class can be added. Must return `true` to add the class |

## Example using the `rule` parameter

```js
import KB from '@switch-company/keyboard-navigation';

const kb = new KB({
  // don't add the class if the tab comes from an input element
  rules: event => {
    return event.target.nodeName !== 'INPUT';
  }
});
```
