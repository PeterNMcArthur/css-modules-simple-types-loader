# css-modules-simple-types-loader

Webpack loader to generate simple types for css modules classes

### Install

```
npm i -D css-modules-simple-types-loader
```

### Usage

Only valid typescript variable names will be generated in the types file, as such it is recommended that you use css-loader modules true  option to convert kebab case css class names to camelCase.

```
{
  test: /\.module\.s?css$/,
  use: [
    {
			loader: 'style-loader',
		},
    {
			loader: 'css-modules-simple-types-loader',
		},
    {
      loader: 'css-loader',
      options: {
        modules: true,
        camelCase: true,
      }
    },
  ],
}
```


### Example

#### With css-loader option camelCase true
```
/* style.css */

.title {
	font-size: 18px;
}
.title--bold {
	font-weight: bold;
}
```

Result:
```
/* style.css.d.ts */
export const title: string;
export const titleBold: string;
```

#### Without css-loader option camelCase true
```
/* style.css */

.title {
	font-size: 18px;
}
.title--bold {
	font-weight: bold;
}
```

Result:
```
/* style.css.d.ts */
export const title: string;
```
