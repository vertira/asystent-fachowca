export type Materials = {
  userId: string;
  id?: string;
  quantity: number;
  workId?: string;
  work?: {
    name: string;
  };
  name: string;
  unit: string;
  materialId?: string;
};
