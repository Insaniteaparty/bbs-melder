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

export const clip = {
  standard: "polygon(0 10px, 10px 0, 100% 0, 100% 100%, 0 100%)",
  big: "polygon(0 30px, 30px 0, 100% 0, 100% 0, 100% 100%, 0 100%)",
  card: "polygon(0 30px, 30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
  menuItem:
    "polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
};
