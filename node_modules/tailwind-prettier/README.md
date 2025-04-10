# tailwind-prettier

Automatically formats Tailwind CSS classes in your HTML, JSX, or TSX files.
- ✅ Sorted in recommended Tailwind order
- ✅ Automatically wraps long class lists
- ✅ Supports `class` and `className`

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

## 📦 Installation

```bash
npm install --save-dev prettier tailwind-prettier
```

## 🔧 Usage

```js
// prettier.config.js
module.exports = {
  plugins: ["tailwind-prettier"]
};
```

## 🧪 Test it locally

```bash
npm link
cd your-project
npm link tailwind-prettier
```

Run prettier:
```bash
npx prettier --write src/**/*.jsx
```

## 📜 License

