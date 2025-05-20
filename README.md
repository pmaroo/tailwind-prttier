# tailwind-prettier

Automatically formats Tailwind CSS classes in your HTML, JSX, or TSX files.

- ✅ Sorted in recommended Tailwind order  
- ✅ Automatically wraps long class lists  
- ✅ Supports both `class` and `className`  
- ✅ Compatible with `className={""}` and `className={``}`  
- ✅ Works in `.js`, `.jsx`, `.ts`, `.tsx`

---

## ✨ Example

### Before

```jsx
<div className="bg-white text-center py-4 px-6 shadow-md rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
```

### After

```jsx
<div
  className="
    bg-white
    hover:bg-gray-100
    px-6
    py-4
    rounded-lg
    shadow-md
    text-center
    transition
    duration-300
    ease-in-out
  "
>
```

Also works with template literals:

```tsx
<div
  className={`
    flex
    flex-col
    items-center
    justify-center
    absolute
    w-[calc(100%-16px)]
    text-[36px]
    font-[700]
    ${current === index ? "text-[--main]" : "text-[--grey2]"}
  `}
/>
```

---

## 📦 Installation

```bash
npm install --save-dev prettier tailwind-prettier
```

---

## 🔧 Usage

1. Create a `.prettierrc.cjs` file in your project root:

```js
module.exports = {
  plugins: [require.resolve("tailwind-prettier")],
  // Other Prettier settings...
};
```

2. Add this to your VSCode `settings.json`:

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true
}
```

3. ⚠️ **Important**: After configuring `.prettierrc.cjs`, fully restart VSCode for changes to take effect.

---

## 🧪 Test it locally

```bash
npm link
cd your-project
npm link tailwind-prettier
```

Run Prettier manually:

```bash
npx prettier --write src/**/*.tsx
```

---

## 🐞 Known Issues

- VSCode may scroll unexpectedly after formatting  
- Indentation inside `className={``}` blocks is not fully accurate yet

---

## 🚧 Upcoming Improvements

- Prevent scroll jump after formatting  
- Improve indentation for template literal class blocks

---

## 📜 License

MIT
