import { useGetBarbershops } from "@/hooks/integration/barbershops/queries";
import { useDashboardFilters } from "@/hooks/integration/reports/useDashboardFilters";
import { Button, Card, DatePicker, Select } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import s from "../styles.module.scss";

const { RangePicker } = DatePicker;
const { Option } = Select;

const PERIOD_OPTIONS = [
  { value: "7days", label: "Últimos 7 dias" },
  { value: "30days", label: "Últimos 30 dias" },
  { value: "3months", label: "Últimos 3 meses" },
  { value: "6months", label: "Últimos 6 meses" },
  { value: "1year", label: "Último ano" },
  { value: "all", label: "Todo o período" },
  { value: "custom", label: "Período customizado" },
];

const STATUS_OPTIONS = [
  { value: "pending", label: "Pendentes" },
  { value: "approved", label: "Aprovados" },
  { value: "done", label: "Concluídos" },
  { value: "canceled", label: "Cancelados" },
];

export default function DashboardFilters() {
  const { filters, updateFilters, resetFilters } = useDashboardFilters();
  const { data: barbershops } = useGetBarbershops();

  const handlePeriodChange = (value: string) => {
    if (value === "custom") {
      updateFilters({ periodType: "custom" });
    } else {
      updateFilters({
        periodType: value as
          | "7days"
          | "30days"
          | "3months"
          | "6months"
          | "1year"
          | "all",
        startDate: undefined,
        endDate: undefined,
      });
    }
  };

  const handleDateRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (dates && dates[0] && dates[1]) {
      updateFilters({
        startDate: dates[0].format("YYYY-MM-DD"),
        endDate: dates[1].format("YYYY-MM-DD"),
        periodType: "custom",
      });
    }
  };

  const handleBarbershopChange = (value: number | undefined) => {
    updateFilters({ barbershopId: value });
  };

  const handleStatusChange = (values: string[]) => {
    updateFilters({ scheduleStatus: values });
  };

  const handleReset = () => {
    resetFilters();
  };

  // Converter strings para Dayjs quando necessário
  const dateRangeValue =
    filters.periodType === "custom" && filters.startDate && filters.endDate
      ? [dayjs(filters.startDate), dayjs(filters.endDate)]
      : null;

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <Card
      className={s.filtersCard}
      title={
        <div className={s.filtersCardTitle}>
          <FilterOutlined />
          <span>Filtros</span>
        </div>
      }
      extra={
        <Button
          icon={<ReloadOutlined />}
          onClick={handleReset}
          type="default"
          className={s.resetButton}
        >
          Resetar
        </Button>
      }
    >
      <div className={s.filtersGrid}>
        <div className={s.filterItem}>
          <label className={s.filterLabel}>Período</label>
          <Select
            value={filters.periodType}
            onChange={handlePeriodChange}
            className={s.filterSelect}
            size="large"
          >
            {PERIOD_OPTIONS.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>

        {filters.periodType === "custom" && (
          <div className={`${s.filterItem} ${s.filterItemFull}`}>
            <label className={s.filterLabel}>Data inicial - Data final</label>
            <RangePicker
              value={dateRangeValue as [Dayjs, Dayjs] | null}
              onChange={handleDateRangeChange}
              format="DD/MM/YYYY"
              disabledDate={disabledDate}
              className={s.filterDateRange}
              size="large"
            />
          </div>
        )}

        <div className={s.filterItem}>
          <label className={s.filterLabel}>Barbearia</label>
          <Select
            value={filters.barbershopId}
            onChange={handleBarbershopChange}
            allowClear
            placeholder="Todas"
            className={s.filterSelect}
            size="large"
            showSearch
            filterOption={(input, option) => {
              const label = option?.label || option?.children;
              return String(label || "")
                .toLowerCase()
                .includes(input.toLowerCase());
            }}
          >
            {barbershops?.map((shop) => (
              <Option key={shop.id} value={shop.id}>
                {shop.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className={s.filterItem}>
          <label className={s.filterLabel}>Status de Agendamentos</label>
          <Select
            mode="multiple"
            value={filters.scheduleStatus}
            onChange={handleStatusChange}
            allowClear
            placeholder="Todos"
            className={s.filterSelect}
            size="large"
            maxTagCount="responsive"
          >
            {STATUS_OPTIONS.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </Card>
  );
}
