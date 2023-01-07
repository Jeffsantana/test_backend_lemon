import {
  Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: '' })
export default class SolverGroups {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
