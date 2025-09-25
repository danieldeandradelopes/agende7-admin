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
      <span className={s.statusText}>{status}</span>
    </div>
  );
}

export default StatusTag;
