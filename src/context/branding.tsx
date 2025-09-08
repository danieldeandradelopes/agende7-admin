import Branding from "@/@backend-types/Branding";
import { useCustomLocalStorage } from "@/hooks/utils/use-custom-local-storage";
import constate from "constate";
import { useEffect } from "react";
import { BrandingUI } from "./types";

function brandingToUI(branding: Branding): BrandingUI {
  return {
    id: branding.id,
    name: branding.name,
    primaryColor: branding.primary_color,
    secondaryColor: branding.secondary_color,
    tertiaryColor: branding.tertiary_color,
    quaternaryColor: branding.quaternary_color,
    backgroundColor: branding.background_color,
    surfaceColor: branding.surface_color,
    textPrimaryColor: branding.text_primary_color,
    textSecondaryColor: branding.text_secondary_color,
    borderColor: branding.border_color,
    errorColor: branding.error_color,
    successColor: branding.success_color,
    btnPrimaryBg: branding.btn_primary_bg,
    btnPrimaryText: branding.btn_primary_text,
    btnSecondaryBg: branding.btn_secondary_bg,
    btnSecondaryText: branding.btn_secondary_text,
    btnTertiaryBg: branding.btn_tertiary_bg,
    btnTertiaryText: branding.btn_tertiary_text,
    btnQuaternaryBg: branding.btn_quaternary_bg,
    btnQuaternaryText: branding.btn_quaternary_text,
    headingColor: branding.heading_color,
    subheadingColor: branding.subheading_color,
    textDefault: branding.text_default,
    textMuted: branding.text_muted,
    linkColor: branding.link_color,
    linkHoverColor: branding.link_hover_color,
    inputBg: branding.input_bg,
    inputText: branding.input_text,
    inputBorder: branding.input_border,
    inputPlaceholder: branding.input_placeholder,
    inputFocusBorder: branding.input_focus_border,
    appBackground: branding.app_background,
    cardBackground: branding.card_background,
    cardBorder: branding.card_border,
    cardShadow: branding.card_shadow,
    drawerBg: branding.drawer_bg,
    drawerText: branding.drawer_text,
    drawerBorder: branding.drawer_border,
    drawerHoverBg: branding.drawer_hover_bg,
    drawerActiveBg: branding.drawer_active_bg,
    logo: branding.logo,
    favicon: branding.favicon,
    barberShopId: branding.barber_shop_id,
    theme: branding.theme,
    updated_at: branding.updated_at,
    created_at: branding.created_at,
  };
}

// Crie um defaultBranding no formato BrandingUI
const defaultBranding: BrandingUI = brandingToUI(
  new Branding({
    id: 0,
    name: "Agende7",
    primary_color: "#7359f8",
    secondary_color: "#6f65b1",
    tertiary_color: "#302a4f",
    quaternary_color: "#28243b",
    background_color: "#0e0d11",
    surface_color: "#242229",
    text_primary_color: "#ffffff",
    text_secondary_color: "#979494",
    border_color: "#4b4a4e",
    error_color: "#f15a63",
    success_color: "#3a8636",
    btn_primary_bg: "#7359f8",
    btn_primary_text: "#ffffff",
    btn_secondary_bg: "#6f65b1",
    btn_secondary_text: "#ffffff",
    btn_tertiary_bg: "#302a4f",
    btn_tertiary_text: "#ffffff",
    btn_quaternary_bg: "#28243b",
    btn_quaternary_text: "#ffffff",
    heading_color: "#ffffff",
    subheading_color: "#979494",
    text_default: "#ffffff",
    text_muted: "#666666",
    link_color: "#7359f8",
    link_hover_color: "#6f65b1",
    input_bg: "#242229",
    input_text: "#ffffff",
    input_border: "#4b4a4e",
    input_placeholder: "#666666",
    input_focus_border: "#7359f8",
    app_background: "#0e0d11",
    card_background: "#242229",
    card_border: "#4b4a4e",
    card_shadow: "rgba(0, 0, 0, 0.1)",
    drawer_bg: "#242229",
    drawer_text: "#ffffff",
    drawer_border: "#4b4a4e",
    drawer_hover_bg: "#302a4f",
    drawer_active_bg: "#7359f8",
    logo: "",
    favicon: "",
    barber_shop_id: 0,
    theme: "dark",
    barber_shop: {
      address: "",
      auto_approve: "true",
      cover: "",
      description: "",
      id: 0,
      name: "",
      subdomain: "",
    },
  })
);

function useBranding() {
  const [theme, setTheme] = useCustomLocalStorage<"light" | "dark" | "custom">(
    "theme",
    "dark"
  );

  const [brandings, setBrandings] = useCustomLocalStorage<BrandingUI[]>(
    "branding",
    []
  );

  const [currentBranding, setCurrentBranding] =
    useCustomLocalStorage<BrandingUI>("current-branding", defaultBranding);

  function handleSetBranding(branding: BrandingUI[]) {
    setBrandings(branding);
  }

  useEffect(() => {
    if (!brandings.length) return;

    const selected = brandings.find((b) => b.theme === theme) ?? brandings[0];
    setCurrentBranding(selected);
  }, [theme, brandings]);

  function handleThemeDetailsApply() {
    const root = document.documentElement;
    const b = currentBranding;

    const setCSS = (key: string, value?: string) => {
      if (value) root.style.setProperty(key, value);
    };

    setCSS("--color-primary", b.primaryColor);
    setCSS("--color-secondary", b.secondaryColor);
    setCSS("--color-tertiary", b.tertiaryColor);
    setCSS("--color-quaternary", b.quaternaryColor);
    setCSS("--color-background", b.backgroundColor);
    setCSS("--color-surface", b.surfaceColor);
    setCSS("--color-text-primary", b.textPrimaryColor);
    setCSS("--color-text-secondary", b.textSecondaryColor);
    setCSS("--color-border", b.borderColor);
    setCSS("--color-error", b.errorColor);
    setCSS("--color-success", b.successColor);

    setCSS("--btn-primary-bg", b.btnPrimaryBg);
    setCSS("--btn-primary-text", b.btnPrimaryText);
    setCSS("--btn-secondary-bg", b.btnSecondaryBg);
    setCSS("--btn-secondary-text", b.btnSecondaryText);
    setCSS("--btn-tertiary-bg", b.btnTertiaryBg);
    setCSS("--btn-tertiary-text", b.btnTertiaryText);
    setCSS("--btn-quaternary-bg", b.btnQuaternaryBg);
    setCSS("--btn-quaternary-text", b.btnQuaternaryText);

    setCSS("--heading-color", b.headingColor);
    setCSS("--subheading-color", b.subheadingColor);
    setCSS("--text-default", b.textDefault);
    setCSS("--text-muted", b.textMuted);
    setCSS("--link-color", b.linkColor);
    setCSS("--link-hover-color", b.linkHoverColor);

    setCSS("--input-bg", b.inputBg);
    setCSS("--input-text", b.inputText);
    setCSS("--input-border", b.inputBorder);
    setCSS("--input-placeholder", b.inputPlaceholder);
    setCSS("--input-focus-border", b.inputFocusBorder);

    setCSS("--app-background", b.appBackground);
    setCSS("--card-background", b.cardBackground);
    setCSS("--card-border", b.cardBorder);
    setCSS("--card-shadow", b.cardShadow);

    setCSS("--drawer-bg", b.drawerBg);
    setCSS("--drawer-text", b.drawerText);
    setCSS("--drawer-border", b.drawerBorder);
    setCSS("--drawer-hover-bg", b.drawerHoverBg);
    setCSS("--drawer-active-bg", b.drawerActiveBg);

    if (b.logo) setCSS("--logo-url", `url(${b.logo})`);

    if (b.favicon) {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        (favicon as HTMLLinkElement).href = b.favicon;
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = b.favicon;
        document.head.appendChild(link);
      }
    }

    if (theme) {
      root.setAttribute("data-theme", theme);
      document.body.setAttribute("data-theme", theme);
    }
  }

  useEffect(() => {
    if (currentBranding) handleThemeDetailsApply();
  }, [currentBranding]);

  return {
    brandings,
    handleSetBranding,
    theme,
    setTheme,
    currentBranding,
  };
}

export const [BrandingProvider, useBrandingContext] = constate(useBranding);
