import { useGetBranding } from "@/hooks/integration/branding/queries";
import s from "../styles.module.scss";

export default function BrandingSection({
  barbershopId,
}: {
  barbershopId: number;
}) {
  const { data: branding } = useGetBranding();

  return (
    <div className={s.section}>
      <h3>Branding</h3>
      {branding && branding.length > 0 ? (
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <strong>Nome do Tema</strong>
            <span>{branding[0].name}</span>
          </div>
        </div>
      ) : (
        <div className={s.emptyMessage}>
          <p>Nenhum branding configurado</p>
        </div>
      )}
      <p
        style={{
          marginTop: "20px",
          fontSize: "14px",
          color: "var(--color-text-secondary)",
          fontStyle: "italic",
        }}
      >
        Edição de branding será implementada na próxima versão
      </p>
    </div>
  );
}
