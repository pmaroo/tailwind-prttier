// prettier-plugin-tailwind-autoline/tailwind-order.js

// 기본적인 Tailwind CSS 클래스 정렬 기준 (선택적 확장 가능)
const tailwindOrder = [
  // Layout
  "container",
  "box-border",
  "box-content",
  "block",
  "inline-block",
  "flex",
  "grid",
  "hidden",
  // Flexbox & Grid
  "flex-row",
  "flex-col",
  "items-start",
  "items-center",
  "justify-start",
  "justify-center",
  // Spacing
  "m-0",
  "m-1",
  "m-2",
  "m-3",
  "m-4",
  "mx-auto",
  "p-0",
  "p-1",
  "p-2",
  "p-3",
  "p-4",
  // Sizing
  "w-0",
  "w-full",
  "h-0",
  "h-full",
  "min-w-0",
  "min-h-0",
  "max-w-full",
  // Typography
  "text-left",
  "text-center",
  "text-right",
  "text-sm",
  "text-base",
  "text-lg",
  "font-thin",
  "font-bold",
  // Colors
  "text-black",
  "text-white",
  "text-gray-500",
  "bg-white",
  "bg-gray-100",
  "bg-red-500",
  // Effects
  "shadow",
  "shadow-md",
  "opacity-50",
  // Transitions
  "transition",
  "duration-150",
  "duration-300",
  "ease-in-out",
  // Misc
  "rounded",
  "rounded-md",
  "rounded-full",
];

module.exports = { tailwindOrder };
