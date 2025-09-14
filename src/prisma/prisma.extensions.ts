import { Prisma } from 'generated/prisma';

// Verified if exists
export const existsExtension = Prisma.defineExtension({
  name: 'exists-extension',
  model: {
    $allModels: {
      async exists<T>(
        this: T,
        where: Prisma.Args<T, 'findFirst'>['where'],
      ): Promise<boolean> {
        const context = Prisma.getExtensionContext(this);
        const row = await context['findFirst']({
          where,
          select: { id: true },
        } as Prisma.Args<T, 'findFirst'>);

        return !!row;
      },
    },
  },
});

// Soft deleted
export const softDeleteExtension = Prisma.defineExtension({
  name: 'soft-delete-extension',
  model: {
    $allModels: {
      async softDeleteMany<T>(
        this: T,
        where: Prisma.Args<T, 'updateMany'>['where'],
      ): Promise<Prisma.Result<T, Prisma.Args<T, 'updateMany'>, 'updateMany'>> {
        const context = Prisma.getExtensionContext(this);
        return context['updateMany']({
          where,
          data: { deletedAt: new Date() },
        } as Prisma.Args<T, 'updateMany'>);
      },

      async softDelete<T>(
        this: T,
        where: Prisma.Args<T, 'update'>['where'],
      ): Promise<Prisma.Result<T, unknown, 'update'>> {
        const context = Prisma.getExtensionContext(this);
        return context['update']({
          where,
          data: {
            deletedAt: new Date(),
          },
        } as Prisma.Args<T, 'update'>);
      },
    },
  },
});

export const restoreExtension = Prisma.defineExtension({
  name: 'restore-extension',
  model: {
    $allModels: {
      async restore<T>(
        this: T,
        where: Prisma.Args<T, 'update'>['where'],
      ): Promise<Prisma.Result<T, unknown, 'update'>> {
        const context = Prisma.getExtensionContext(this);
        return context['update']({
          where,
          data: { deletedAt: null },
        } as Prisma.Args<T, 'update'>);
      },

      async restoreMany<T>(
        this: T,
        where: Prisma.Args<T, 'updateMany'>['where'],
      ): Promise<Prisma.Result<T, Prisma.Args<T, 'updateMany'>, 'updateMany'>> {
        const context = Prisma.getExtensionContext(this);
        return context['updateMany']({
          where,
          data: { deletedAt: null },
        } as Prisma.Args<T, 'updateMany'>);
      },
    },
  },
});
