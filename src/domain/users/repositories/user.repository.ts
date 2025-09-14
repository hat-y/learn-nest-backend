export interface UserRepository {
  findById(
    id: number,
  ): Promise<{ id: number; email: string; deletedAt: Date | null } | null>;

  findByEmail(email: string): Promise<{ id: number; email: string } | null>;

  listActive(): Promise<Array<{ id: number; email: string }>>;

  createUser(data: {
    email: string;
    firstName?: string;
    lastName?: string;
    roleId: string;
  }): Promise<{ id: number; email: string }>;

  softDeleteById(id: number): Promise<void>;

  restoreById(id: number): Promise<void>;
}
