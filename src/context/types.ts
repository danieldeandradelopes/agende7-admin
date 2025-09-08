import BarberShop from "@/@backend-types/BarberShop";
import Branding from "@/@backend-types/Branding";

export interface BrandingUI {
  id: number;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  quaternaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  borderColor: string;
  errorColor: string;
  successColor: string;

  btnPrimaryBg: string;
  btnPrimaryText: string;
  btnSecondaryBg: string;
  btnSecondaryText: string;
  btnTertiaryBg: string;
  btnTertiaryText: string;
  btnQuaternaryBg: string;
  btnQuaternaryText: string;

  headingColor: string;
  subheadingColor: string;
  textDefault: string;
  textMuted: string;
  linkColor: string;
  linkHoverColor: string;

  inputBg: string;
  inputText: string;
  inputBorder: string;
  inputPlaceholder: string;
  inputFocusBorder: string;

  appBackground: string;
  cardBackground: string;
  cardBorder: string;
  cardShadow: string;

  drawerBg: string;
  drawerText: string;
  drawerBorder: string;
  drawerHoverBg: string;
  drawerActiveBg: string;

  logo: string;
  favicon: string;
  barberShopId: number;
  theme: "light" | "dark" | "custom";
  updated_at?: string;
  created_at?: string;

  barber_shop?: BarberShop;
}

export function brandingToUI(branding: Branding): BrandingUI {
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
    barber_shop: branding.barber_shop,
  };
}
