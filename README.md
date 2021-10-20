# Tailwind Component Classes - Work in Progress

This is currently a proof of concept to use your tailwind.config.js and it's associated architecture to build up custom classes without jumping into a css file

## Usage

First:

```
npm install tailwind-component-classes
```

Second:

```
    ...
    plugins: [
        require("tailwind-component-classes")
    ]
    ...
```

Third:

configure your classes in the theme section:

```
    ...
    components: {
        btn: "text-blue-400 bg-gray-900 border shadow border-blue-500 hover:bg-red-900",
    }
    ...
```

You can then do the following in your code:

```
<div>
    <a class="btn">This is a button</a>
</div>
```

Which would be the equivalent to doing:

```
<div>
    <a class="text-blue-400 bg-gray-900 border shadow border-blue-500 hover:bg-red-900">This is a button</a>
</div>
```

## Todo

- [ ] publish to npm
- [ ] Market to other places (TW discord)
- [ ] build out examples of presets, extend
- [ ] tests
- [ ] Support nested classes (basically how colours work). for example:

This config:

```
{
    btn: {
        primary: "bg-blue-400",
        secondary: "bg-green-400"
        error: "bg-red-400"
    },
    heading: {
        1: "text-4xl"
        2: "text-3xl"
    }
}
```

would generate these class names:

```
.btn-primary
.btn-secondary
.btn-error
.heading-1
.heading-2
```
