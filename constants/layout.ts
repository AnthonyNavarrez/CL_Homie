// Logical canvas size the whole app is designed against. On web,
// app/_layout.tsx renders everything inside a transformed View fixed at
// these dimensions, then scales the whole thing down to fit the browser
// window — simulating a phone screen. Anything that sizes itself off the
// real window (Dimensions.get('window'), useWindowDimensions) on web will
// be sized for the browser window, not the simulated phone screen.
export const PHONE_W = 412;
export const PHONE_H = 915;
