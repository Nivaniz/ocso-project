import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column('text', {
        unique: true,
    })
    userEmail: string;
    @Column('text')
    userPassword:string;
    @Column('simple-array', {
        default: "Employee"
    })
    userRoles: string[];

    @OneToOne(() => Manager)
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager | string;

    @OneToOne(() => Employee)
    @JoinColumn({
        name: "employeeId"
    })
    employee: Employee | string;
}