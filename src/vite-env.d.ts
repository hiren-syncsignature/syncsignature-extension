/// <reference types="vite/client" />


declare module '*.jpg' {
  const value: string;
  export default value;
}

// Add similar lines for other image types:
declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.svg' {
  const value: string;
  export default value;
}
