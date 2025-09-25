import HeaderPage from "@/components/HeaderPage";
import s from "./styles.module.scss";
import { Card, Statistic } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Divisor from "@/components/design/Divisor";
import { useGetReportsDashboard } from "@/hooks/integration/reports/queries";

function Dashboard() {
  const { data: reportsDashboard } = useGetReportsDashboard();

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

  return (
    <div className={s.container}>
      <HeaderPage title="Dashboard" />

      <div className={s.content}>
        <h3>Agendamentos</h3>
        <div className={s.line}>
          <Card>
            <Statistic
              title="Hoje"
              value={reportsDashboard?.schedules.today}
              valueStyle={{
                color: getColor(
                  reportsDashboard?.schedules.today_vs_yesterday?.trend ?? ""
                ),
              }}
              prefix={getIcon(
                reportsDashboard?.schedules.today_vs_yesterday?.trend ?? ""
              )}
            />
          </Card>
          <Card>
            <Statistic
              title="Mês"
              value={reportsDashboard?.schedules.this_month}
              valueStyle={{
                color: getColor(
                  reportsDashboard?.schedules.this_month_vs_last_month?.trend ??
                    ""
                ),
              }}
              prefix={getIcon(
                reportsDashboard?.schedules.this_month_vs_last_month?.trend ??
                  ""
              )}
            />
          </Card>

          <Card>
            <Statistic
              title="Ano"
              value={reportsDashboard?.schedules.this_year}
              valueStyle={{
                color: getColor(
                  reportsDashboard?.schedules.this_year_vs_last_year?.trend ??
                    ""
                ),
              }}
              prefix={getIcon(
                reportsDashboard?.schedules.this_year_vs_last_year?.trend ?? ""
              )}
            />
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
              value={reportsDashboard?.new_users.today}
              valueStyle={{
                color: getColor(
                  reportsDashboard?.new_users.today_vs_yesterday?.trend ?? ""
                ),
              }}
              prefix={getIcon(
                reportsDashboard?.new_users.today_vs_yesterday?.trend ?? ""
              )}
            />
          </Card>

          <Card>
            <Statistic
              title="Mês"
              value={reportsDashboard?.new_users.this_month}
              valueStyle={{
                color: getColor(
                  reportsDashboard?.new_users.this_month_vs_last_month?.trend ??
                    ""
                ),
              }}
              prefix={getIcon(
                reportsDashboard?.new_users.this_month_vs_last_month?.trend ??
                  ""
              )}
            />
          </Card>

          <Card>
            <Statistic
              title="Ano"
              value={reportsDashboard?.new_users.this_year}
              valueStyle={{
                color: getColor(
                  reportsDashboard?.new_users.this_year_vs_last_year?.trend ??
                    ""
                ),
              }}
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

export default Dashboard;
