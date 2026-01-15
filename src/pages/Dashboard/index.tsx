import HeaderPage from "@/components/HeaderPage";
import s from "./styles.module.scss";
import { Card, Statistic } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Divisor from "@/components/design/Divisor";
import { useGetReportsDashboard } from "@/hooks/integration/reports/queries";
import {
  DashboardFiltersProvider,
  useDashboardFiltersContext,
} from "@/context/dashboardFilters";
import DashboardFilters from "./components/DashboardFilters";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { useEffect, useMemo } from "react";

function DashboardContent() {
  const { filters, getApiFilters } = useDashboardFiltersContext();
  const apiFilters = useMemo(
    () => getApiFilters(),
    [
      JSON.stringify({
        periodType: filters.periodType,
        barbershopId: filters.barbershopId,
        scheduleStatus: filters.scheduleStatus,
        startDate: filters.startDate,
        endDate: filters.endDate,
      }),
    ]
  );

  const { data: reportsDashboard } = useGetReportsDashboard(apiFilters);

  const getColor = (trend: string) => {
    if (trend === "same") return "#db9020";
    if (trend === "up") return "#3f8600";
    if (trend === "down") return "#cf1322";
    return "#db9020";
  };

  const getIcon = (trend: string) => {
    if (trend === "same") return <ClockCircleOutlined />;
    if (trend === "up") return <ArrowUpOutlined />;
    if (trend === "down") return <ArrowDownOutlined />;
    return <ArrowUpOutlined />;
  };

  const formatVariation = (
    comparison: { value: number; trend: "up" | "down" | "same" } | undefined,
    previous: number
  ) => {
    if (!comparison || previous === 0) {
      return null;
    }

    const percent = ((comparison.value / previous) * 100).toFixed(1);
    const sign =
      comparison.trend === "up" ? "+" : comparison.trend === "down" ? "-" : "";
    const color = getColor(comparison.trend);

    return (
      <span style={{ color, fontSize: "14px", fontWeight: 500 }}>
        {sign}
        {comparison.value} ({percent}%)
      </span>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "dd/MM");
    } catch {
      return dateStr;
    }
  };

  const formatMonth = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "MMM/yyyy");
    } catch {
      return dateStr;
    }
  };

  const COLORS = ["#3f8600", "#db9020", "#cf1322", "#1890ff"];

  const subscriptionData = reportsDashboard?.subscriptions
    ? [
        {
          name: "Ativas",
          value: reportsDashboard.subscriptions.active,
        },
        {
          name: "Atrasadas",
          value: reportsDashboard.subscriptions.past_due,
        },
        {
          name: "Canceladas",
          value: reportsDashboard.subscriptions.canceled,
        },
      ].filter((item) => item.value > 0)
    : [];

  useEffect(() => {
    console.log(filters, "meus filtros");
  }, [
    filters.barbershopId,
    filters.scheduleStatus,
    filters.startDate,
    filters.endDate,
  ]);

  return (
    <div className={s.container}>
      <HeaderPage title="Dashboard" />

      <DashboardFilters />

      <div className={s.content}>
        <h3>Agendamentos</h3>
        <div className={s.line}>
          <Card>
            <Statistic
              title="Hoje"
              value={reportsDashboard?.schedules.today ?? 0}
              valueStyle={{
                color: "#1890ff",
              }}
              suffix={formatVariation(
                reportsDashboard?.schedules.today_vs_yesterday,
                reportsDashboard?.schedules.yesterday ?? 0
              )}
              prefix={getIcon(
                reportsDashboard?.schedules.today_vs_yesterday?.trend ?? ""
              )}
            />
          </Card>
          <Card>
            <Statistic
              title="Este Mês"
              value={reportsDashboard?.schedules.this_month ?? 0}
              valueStyle={{
                color: "#1890ff",
              }}
              suffix={formatVariation(
                reportsDashboard?.schedules.this_month_vs_last_month,
                reportsDashboard?.schedules.last_month ?? 0
              )}
              prefix={getIcon(
                reportsDashboard?.schedules.this_month_vs_last_month?.trend ??
                  ""
              )}
            />
          </Card>

          <Card>
            <Statistic
              title="Este Ano"
              value={reportsDashboard?.schedules.this_year ?? 0}
              valueStyle={{
                color: "#1890ff",
              }}
              suffix={formatVariation(
                reportsDashboard?.schedules.this_year_vs_last_year,
                reportsDashboard?.schedules.last_year ?? 0
              )}
              prefix={getIcon(
                reportsDashboard?.schedules.this_year_vs_last_year?.trend ?? ""
              )}
            />
          </Card>
        </div>
      </div>

      <Divisor />

      <div className={s.content}>
        <h3>Métricas Financeiras</h3>
        <div className={s.line}>
          <Card>
            <Statistic
              title="MRR (Receita Recorrente Mensal)"
              value={formatCurrency(reportsDashboard?.revenue.mrr ?? 0)}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Receita Total (Mês)"
              value={formatCurrency(
                reportsDashboard?.revenue.total_revenue_month ?? 0
              )}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Receita Total (Ano)"
              value={formatCurrency(
                reportsDashboard?.revenue.total_revenue_year ?? 0
              )}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </div>
      </div>

      <Divisor />

      <div className={s.content}>
        <h3>Métricas de Negócio</h3>
        <div className={s.line}>
          <Card>
            <Statistic
              title="Barbershops Ativas"
              value={reportsDashboard?.barbershops.active ?? 0}
              suffix={`/ ${reportsDashboard?.barbershops.total ?? 0}`}
              prefix={<ShopOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Assinaturas Ativas"
              value={reportsDashboard?.subscriptions.active ?? 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Taxa de Conversão"
              value={reportsDashboard?.subscriptions.conversion_rate ?? 0}
              suffix="%"
              prefix={<UserOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </div>
      </div>

      <Divisor />

      <div className={s.content}>
        <h3>Agendamentos por Status</h3>
        <div className={s.line}>
          <Card>
            <Statistic
              title="Pendentes"
              value={reportsDashboard?.schedule_status.pending ?? 0}
              valueStyle={{ color: "#db9020" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Aprovados"
              value={reportsDashboard?.schedule_status.approved ?? 0}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Concluídos"
              value={reportsDashboard?.schedule_status.done ?? 0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
          <Card>
            <Statistic
              title="Cancelados"
              value={reportsDashboard?.schedule_status.canceled ?? 0}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </div>
      </div>

      <Divisor />

      <div className={s.content}>
        <h3>Crescimento - Últimos 30 Dias</h3>
        <div className={s.chartsGrid}>
          <Card title="Novos Usuários" className={s.chartCard}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={
                  reportsDashboard?.time_series?.users_last_30_days?.map(
                    (d: { date: string; value: number }) => ({
                      date: formatDate(d.date),
                      value: d.value,
                    })
                  ) || []
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1890ff"
                  strokeWidth={2}
                  name="Usuários"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Agendamentos" className={s.chartCard}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={
                  reportsDashboard?.time_series?.schedules_last_30_days?.map(
                    (d: { date: string; value: number }) => ({
                      date: formatDate(d.date),
                      value: d.value,
                    })
                  ) || []
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3f8600"
                  strokeWidth={2}
                  name="Agendamentos"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      <Divisor />

      <div className={s.content}>
        <h3>Financeiro</h3>
        <div className={s.chartsGrid}>
          <Card title="MRR Mensal - Últimos 12 Meses" className={s.chartCard}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={
                  reportsDashboard?.time_series?.mrr_last_12_months?.map(
                    (d: { date: string; value: number }) => ({
                      month: formatMonth(d.date),
                      value: d.value / 100,
                    })
                  ) || []
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value) * 100)}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#722ed1"
                  fill="#722ed1"
                  fillOpacity={0.6}
                  name="MRR"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card
            title="Receita Diária - Últimos 30 Dias"
            className={s.chartCard}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={
                  reportsDashboard?.time_series?.revenue_last_30_days?.map(
                    (d: { date: string; value: number }) => ({
                      date: formatDate(d.date),
                      value: d.value / 100,
                    })
                  ) || []
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value) * 100)}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3f8600"
                  strokeWidth={2}
                  name="Receita"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      <Divisor />

      <div className={s.content}>
        <h3>Assinaturas</h3>
        <div className={s.chartsGrid}>
          <Card title="Distribuição de Assinaturas" className={s.chartCard}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: { name?: string; percent?: number }) =>
                    `${entry.name || ""} ${((entry.percent || 0) * 100).toFixed(
                      0
                    )}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Agendamentos por Status" className={s.chartCard}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    status: "Pendentes",
                    value: reportsDashboard?.schedule_status.pending ?? 0,
                  },
                  {
                    status: "Aprovados",
                    value: reportsDashboard?.schedule_status.approved ?? 0,
                  },
                  {
                    status: "Concluídos",
                    value: reportsDashboard?.schedule_status.done ?? 0,
                  },
                  {
                    status: "Cancelados",
                    value: reportsDashboard?.schedule_status.canceled ?? 0,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1890ff" name="Agendamentos" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      <Divisor />

      <div className={s.content}>
        <h3>Usuários</h3>
        <div className={s.line}>
          <Card>
            <Statistic
              title="Hoje"
              value={reportsDashboard?.new_users.today ?? 0}
              valueStyle={{
                color: "#1890ff",
              }}
              suffix={formatVariation(
                reportsDashboard?.new_users.today_vs_yesterday,
                reportsDashboard?.new_users.yesterday ?? 0
              )}
              prefix={getIcon(
                reportsDashboard?.new_users.today_vs_yesterday?.trend ?? ""
              )}
            />
          </Card>

          <Card>
            <Statistic
              title="Este Mês"
              value={reportsDashboard?.new_users.this_month ?? 0}
              valueStyle={{
                color: "#1890ff",
              }}
              suffix={formatVariation(
                reportsDashboard?.new_users.this_month_vs_last_month,
                reportsDashboard?.new_users.last_month ?? 0
              )}
              prefix={getIcon(
                reportsDashboard?.new_users.this_month_vs_last_month?.trend ??
                  ""
              )}
            />
          </Card>

          <Card>
            <Statistic
              title="Este Ano"
              value={reportsDashboard?.new_users.this_year ?? 0}
              valueStyle={{
                color: "#1890ff",
              }}
              suffix={formatVariation(
                reportsDashboard?.new_users.this_year_vs_last_year,
                reportsDashboard?.new_users.last_year ?? 0
              )}
              prefix={getIcon(
                reportsDashboard?.new_users.this_year_vs_last_year?.trend ?? ""
              )}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <DashboardFiltersProvider>
      <DashboardContent />
    </DashboardFiltersProvider>
  );
}

export default Dashboard;
