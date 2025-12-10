
[x] make folder called "cerevialabs-icon"
[x] initialize the project with `npm init -y`
[x] define base tech stack and import the dependencies needed for the icon library
  [x] react
  [x] typescript
  [x] tsup
  [x] svgr: convert svg to react tsx components
[x] only add 2 dummy icons to svg folder - 1 outline and 1 filled
[x] define base props for outline and filled icons
  - `outline-icon-props.ts`
  - `filled-icon-props.ts`
[] create a base icon files that accepts base props depending on type of icon and renders out with its proper props and code
  [] `outline-icon.tsx`
  [] `filled-icon.tsx`
[] define scripts and create files for scripts
  [] `npm convert icons`: when a new svg is added to the codebase to the svg folder run this to convert it into react tsx component and update all files
[] make sure config files and package.json is also setup for everything
[] run `npm link` to link the package locally to the "test" folder to see if it works
[] icons must be used like this: `<Heart />` for outline and filled as `<HeartFilled />`
[] if everything works as expected, then commit the library to github and then publish the package to npm
