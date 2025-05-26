export class RouteMapEntity {
  readonly id: string;
  readonly description: string;
  readonly imgRoute1?: string;
  readonly imgRoute2?: string;
  readonly imgRoute3?: string;
  readonly imgRoute4?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(data: any) {
    Object.assign(this, data);
  }

  toResponse() {
    return {
      id: this.id,
      description: this.description,
      imgRoute1: this.imgRoute1,
      imgRoute2: this.imgRoute2,
      imgRoute3: this.imgRoute3,
      imgRoute4: this.imgRoute4,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
