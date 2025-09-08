import { StatusEnum } from "@/pages/Store/BarberSchedule/components/ScheduleService/type";
import classNames from "classnames";
import s from "./status-tag.module.scss";
import { StatusType } from "@/@backend-types/StatusType";

interface StatusTagProps {
  status: StatusType;
}

function StatusTag({ status }: StatusTagProps) {
  const isDone = status === "done";
  const isPending = status === "pending";
  const isApproved = status === "approved";

  return (
    <div
      className={classNames(s.status, {
        [s.pendingStatus]: isPending,
        [s.approvedStatus]: isApproved,
        [s.doneStatus]: isDone,
      })}
    >
      <span className={s.statusText}>
        {StatusEnum[status as keyof typeof StatusEnum]}
      </span>
    </div>
  );
}

export default StatusTag;
