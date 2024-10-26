import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;

    @ApiProperty({
        default: "Juan"
    })
    @Column('text')
    managerFullName: string;

    @ApiProperty({
        default: "2000"
    })
    @Column('float')
    managerSalary: number;

    @ApiProperty({
        default: "manager@gmail.com"
    })
    @Column('text', {
        unique: true,
    })
    managerEmail: string;

    @ApiProperty({
        default: "4426544372"
    })
    @Column('text')
    managerPhoneNumber: string;

    @OneToOne(() => Location)
    @JoinColumn({
        name: "locationId"
    })
    location: Location;
    
    @OneToOne(() => User)
    @JoinColumn({
        name: "userId"
    })
    user:User;
}
