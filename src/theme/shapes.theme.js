export const underline = (color) => ({
  content: '""',
  position: "absolute",
  bottom: 6,
  left: 16,
  right: 16,
  height: 2,
  background: `linear-gradient(to right, transparent, ${color} 5%, ${color} 80%, transparent)`,
  borderRadius: 10,
});
