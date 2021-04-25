export interface NoticeCardData {
  noticaCardListData: NoticeCardListData[];
  department: string;
}

export interface NoticeCardListData {
  id: number;
  title: string;
  author: string;
  createdDateTime: string;
}
