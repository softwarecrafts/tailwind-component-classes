# Tailwind CSS Component Classes

This plugin is designed to use your tailwind.config.js and it's associated architecture to build up custom classes without the need to extend a custom css file.

## Features

- Simple declarative format for more complex classes
- Use all of tailwind's existing prefixes
- Make use of presets and the extend funcationality to share classes across projects
- Define an optional base class that can be extended to avoid repetion (see example below)
- Use existing declared classes to create new classes
- Hooks into Tailwind's 3 layers: base, components & utilities

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
    theme: {...},
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

## A more complex example

This config:

```
components: {
    btn: {
        _: "border-blue-400"
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

would be the equivalent to declaring this in a css file using the `@apply` rule:

```
.btn {
    @apply border-blue-400;
}
.btn-primary {
    @apply border-blue-400 bg-blue-400;
}
.btn-secondary {
    @apply border-blue-400 bg-green-400;
}
.btn-error {
    @apply border-blue-400 bg-red-400;
}
.heading-1 {
    @apply text-4xl;
}
.heading-2 {
    @apply text-3xl;
}
```

## What's with the underscore in the above example?

This plugin adds an `_` option when declaring an object in the components object (see the btn object in the above example). The `_` key creates a base class as well as
merging these base CSS classes with every other classes declared at that level. The primary reason for this is to help reduce duplication when declaring components in the config file.

## Using a preset

Additionally you can use the tailwind preset functionality to share and extend components. See the `examples/advanced` directory for a working example.

When using presets ensure that the plugin is only defined once otherwise classes will be generated multiple times increasing the size of the generated css file.
