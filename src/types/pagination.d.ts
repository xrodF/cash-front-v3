interface IPage {
  title?: string;
  path: string;
  component: React.ReactNode;
  noList?: boolean;
  subMenu?: boolean;
  icon?: React.ReactNode;
}

interface PaginationState {
  page: number;
  limit: number;
  filter?: ScheduleStatus;
}
