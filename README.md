# Cerevia labs Icons library

A modern, lightweight React icon library with TypeScript support. This library provides a collection of beautifully designed SVG icons available in both outline and filled variants.

## Features

- 🎨 **Two Icon Variants**: Outline and filled versions of each icon
- 📦 **Tree-shakeable**: Import only the icons you need
- 🔷 **TypeScript Support**: Full TypeScript definitions included
- ⚡ **Lightweight**: Minimal dependencies, optimized bundle size
- 🎯 **Flexible Styling**: Customize size, colors, and stroke properties
- ♿ **Accessible**: Built with accessibility in mind
- 📱 **React 19 Compatible**: Works with the latest React version

## Installation

```bash
npm install cerevialabs-icons
```

or

```bash
yarn add cerevialabs-icons
```

or

```bash
pnpm add cerevialabs-icons
```

## Quick Start

```tsx
import { Heart, HeartFilled } from "cerevialabs-icons";

function App() {
  return (
    <div>
      <Heart size={48} stroke="blue" />
      <HeartFilled size={48} fill="red" />
    </div>
  );
}
```

## Usage

### Basic Usage

Import the icons you need and use them as React components:

```tsx
import { Heart, HeartFilled } from "cerevialabs-icons";

function MyComponent() {
  return (
    <>
      <Heart />
      <HeartFilled />
    </>
  );
}
```

### Outline Icons

Outline icons are perfect for minimalist designs. They support stroke-based styling:

```tsx
import { Heart } from "cerevialabs-icons";

function Example() {
  return (
    <>
      {/* Default size (24px) with current text color */}
      <Heart />
      
      {/* Custom size */}
      <Heart size={48} />
      
      {/* Custom stroke color */}
      <Heart stroke="blue" />
      
      {/* Custom stroke width */}
      <Heart strokeWidth={3} />
      
      {/* Custom stroke linecap and linejoin */}
      <Heart 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* With accessibility title */}
      <Heart title="Favorite" />
      
      {/* All props combined */}
      <Heart 
        size={32}
        stroke="#FF6B6B"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        title="Add to favorites"
      />
    </>
  );
}
```

### Filled Icons

Filled icons provide a solid, bold appearance:

```tsx
import { HeartFilled } from "cerevialabs-icons";

function Example() {
  return (
    <>
      {/* Default size (24px) with current text color */}
      <HeartFilled />
      
      {/* Custom size */}
      <HeartFilled size={48} />
      
      {/* Custom fill color */}
      <HeartFilled fill="red" />
      
      {/* With accessibility title */}
      <HeartFilled title="Favorited" />
      
      {/* All props combined */}
      <HeartFilled 
        size={32}
        fill="#FF6B6B"
        title="Remove from favorites"
      />
    </>
  );
}
```

### Using with CSS

Icons inherit the current text color by default, making them easy to style with CSS:

```tsx
import { Heart } from "cerevialabs-icons";

function StyledIcon() {
  return (
    <div style={{ color: "blue" }}>
      <Heart size={32} /> {/* Will be blue */}
    </div>
  );
}
```

### Using with Tailwind CSS

```tsx
import { Heart } from "cerevialabs-icons";

function TailwindExample() {
  return (
    <div className="text-blue-500">
      <Heart size={32} /> {/* Will be blue-500 */}
    </div>
  );
}
```

### Custom Dimensions

You can set custom width and height independently:

```tsx
import { Heart } from "cerevialabs-icons";

function CustomDimensions() {
  return (
    <Heart 
      width={50} 
      height={30} 
      stroke="purple" 
    />
  );
}
```

### Forwarding Refs

All icons support ref forwarding for advanced use cases:

```tsx
import { useRef } from "react";
import { Heart } from "cerevialabs-icons";

function RefExample() {
  const iconRef = useRef<SVGSVGElement>(null);
  
  return <Heart ref={iconRef} size={32} />;
}
```

## Props

### OutlineIconProps

All outline icons accept the following props:

| Prop             | Type                                         | Default          | Description                                         |
| ---------------- | -------------------------------------------- | ---------------- | --------------------------------------------------- |
| `size`           | `number \| string`                           | `24`             | Size of the icon (applies to both width and height) |
| `width`          | `number \| string`                           | `size`           | Custom width (overrides size)                       |
| `height`         | `number \| string`                           | `size`           | Custom height (overrides size)                      |
| `stroke`         | `string`                                     | `"currentColor"` | Stroke color of the icon                            |
| `strokeWidth`    | `number`                                     | `2`              | Width of the stroke                                 |
| `strokeLinecap`  | `"inherit" \| "butt" \| "round" \| "square"` | `"round"`        | Style of stroke line caps                           |
| `strokeLinejoin` | `"inherit" \| "round" \| "bevel" \| "miter"` | `"round"`        | Style of stroke line joins                          |
| `title`          | `string`                                     | `undefined`      | Accessibility title for the icon                    |
| `viewBox`        | `string`                                     | `"0 0 24 24"`    | SVG viewBox attribute                               |
| `...props`       | `React.SVGProps<SVGSVGElement>`              | -                | All standard SVG element props                      |

### FilledIconProps

All filled icons accept the following props:

| Prop       | Type                            | Default          | Description                                         |
| ---------- | ------------------------------- | ---------------- | --------------------------------------------------- |
| `size`     | `number \| string`              | `24`             | Size of the icon (applies to both width and height) |
| `width`    | `number \| string`              | `size`           | Custom width (overrides size)                       |
| `height`   | `number \| string`              | `size`           | Custom height (overrides size)                      |
| `fill`     | `string`                        | `"currentColor"` | Fill color of the icon                              |
| `title`    | `string`                        | `undefined`      | Accessibility title for the icon                    |
| `viewBox`  | `string`                        | `"0 0 24 24"`    | SVG viewBox attribute                               |
| `...props` | `React.SVGProps<SVGSVGElement>` | -                | All standard SVG element props                      |

## Available Icons

Currently available icons:

- `Heart` - Outline heart icon
- `HeartFilled` - Filled heart icon

*More icons coming soon!*

## TypeScript

The library is written in TypeScript and includes full type definitions. All icons are properly typed:

```tsx
import { Heart, HeartFilled } from "cerevialabs-icons";
import type { OutlineIconProps, FilledIconProps } from "cerevialabs-icons";

// Types are automatically inferred
const outlineProps: OutlineIconProps = {
  size: 32,
  stroke: "blue",
};

const filledProps: FilledIconProps = {
  size: 32,
  fill: "red",
};
```

## Development

### Building the Library

```bash
npm run build
```

This will compile the TypeScript source and generate both CommonJS and ES Module builds in the `dist` directory.

### Adding New Icons

1. Add your SVG files to the `src/svg/` directory:
   - For outline icons: `icon-name.svg`
   - For filled icons: `icon-name-filled.svg`

2. Run the conversion script:

```bash
npm run convert-icons
```

This script will:
- Convert SVG files to React TypeScript components
- Generate both outline and filled variants
- Update the main export file

3. Build the library:

```bash
npm run build
```

### Project Structure

```
package/
├── src/
│   ├── components/
│   │   ├── base/
│   │   │   ├── outline-icon.tsx
│   │   │   └── filled-icon.tsx
│   │   ├── icons/
│   │   │   ├── Heart.tsx
│   │   │   └── HeartFilled.tsx
│   │   └── props/
│   │       ├── outline-icon-props.ts
│   │       └── filled-icon-props.ts
│   ├── svg/
│   │   ├── heart.svg
│   │   └── heart-filled.svg
│   └── index.ts
├── dist/          # Built files (generated)
├── scripts/
│   └── convert-icons.ts
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## Requirements

- React 19.2.1 or higher
- TypeScript 5.9.3 or higher (for development)

## Browser Support

All modern browsers that support:
- ES6+
- SVG
- React 19

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-icon`)
3. Add your icons to the `src/svg/` directory
4. Run `npm run convert-icons` to generate components
5. Commit your changes (`git commit -m 'Add some amazing icons'`)
6. Push to the branch (`git push origin feature/amazing-icon`)
7. Open a Pull Request

## License

ISC

## Author

Brahmjot Singh

## Links

- [GitHub Repository](https://github.com/brahmjotdev/cerevialabs-icons)
- [Issue Tracker](https://github.com/brahmjotdev/cerevialabs-icons/issues)

---

Made with ❤️ by Cerevia Labs
