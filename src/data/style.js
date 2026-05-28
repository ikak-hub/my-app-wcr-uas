export const colors = {
  primary: "#1976D2",
  primaryDark: "#1565C0",
  primaryLight: "#42A5F5",
  white: "#ffffff",
  light: "#f5f7fa",
  gray: "#6b7280",
  grayLight: "#e5e7eb",
  text: "#1f2937",
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
};

export const css = {
  btn: {
    padding: "8px 18px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: 14,
  },
  btnPrimary: { background: colors.primary, color: "#fff" },
  btnOutline: {
    background: "transparent",
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
  },
  btnDanger: { background: colors.danger, color: "#fff" },
  btnSuccess: { background: colors.success, color: "#fff" },
  input: {
    width: "100%",
    padding: "8px 12px",
    border: `1px solid ${colors.grayLight}`,
    borderRadius: 6,
    fontSize: 14,
    boxSizing: "border-box",
  },
  card: {
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    border: `1px solid ${colors.grayLight}`,
  },
  badge: (color) => ({
    background: color + "22",
    color: color,
    padding: "2px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  }),
};